import Crater from './crater';

export const batchActions = (...actions) => ({
  type: 'BATCH_ACTIONS',
  payload: actions,
});

export const subscribe = (name, params) => dispatch => new Promise((resolve, reject) => {
  let subId = Crater.subscribe(name, params, (error) => {
    error && reject(error);
    !error && resolve();
  });

  dispatch(batchActions({
    type: 'SET_STATUS',
    payload: 'Loading',
  }, 
  // By storing the subId, we can immediately
  // cancel it in case we navigate, for example
  {
    type: 'STORE_SUB_ID',
    payload: {
      subName: name,
      subId: subId,
    },
  }));
});

export const unsubscribe = (subName) => (dispatch, getState) => {
  const { subIdMap } = getState();
  subIdMap[subName] && Crater.unsubscribe(subIdMap[subName]);
};
