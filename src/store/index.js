import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import _ from 'underscore';
import Crater from './crater';
import { subscribe } from './actions';
import reducers, { batchReducers } from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  store => next => action => {
    action && action.type && console.log(action.type);
    return next(action);
  },
  thunk,
)(createStore);

const store = createStoreWithMiddleware(batchReducers(reducers));

const { dispatch } = store;

dispatch({
  type: 'SET_STATUS',
  payload: 'Connecting',
});

const getCollectionArray = (collectionName) => _.map(Crater.collections[collectionName], post => post);

const syncPosts = () => dispatch({
  type: 'SYNC_POSTS',
  payload: getCollectionArray('posts'),
});

const syncPostsThrottledly = _.throttle(syncPosts, 30, { leading: false });

const startObservingPosts = () => Crater.observe('posts', syncPostsThrottledly, syncPostsThrottledly, syncPostsThrottledly);
let startedObserving;

Crater.connect((error, wasReconnected) => {
  error && console.log('ddp error', error);
  !error && console.log('i connected to crater!!');

  if (!error) {
    // If we had started observing before, stop it
    startedObserving && startedObserving.stop();
    
    dispatch(
      subscribe('postsList', [{
        view: 'top',
        limit: 20,
        enableCache: true
      }])
    ).then(
      () => {
        dispatch({
          type: 'SET_STATUS',
          payload: 'Enjoy'
        });
        syncPosts();
        startedObserving = startObservingPosts();
      },
      error => dispatch({
        type: 'SET_STATUS',
        payload: 'Uh oh.. something went wrong'
      })
    );
  } else {
    dispatch({
      type: 'SET_STATUS',
      payload: 'Failed Connecting',
    });
  }
});

export default store;
