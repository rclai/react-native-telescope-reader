import Crater from './crater';

export const batchActions = (...actions) => ({
  type: 'BATCH_ACTIONS',
  payload: actions,
});

export const subscribe = (name, params) => dispatch => new Promise((resolve, reject) => {
  let subId = Crater.subscribe(name, params, (error) => {
    error && reject(error);
    !error && resolve(subId);
  });

  dispatch({
    type: 'SET_STATUS',
    payload: 'Loading',
  });
});

export const unsubscribe = (subId) => (dispatch, getState) => {
  Crater.unsubscribe(subId);
};
