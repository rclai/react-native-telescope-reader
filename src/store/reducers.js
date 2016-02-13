import { ListView } from 'react-native';

let initialState = {
  status: 'Connecting',
  loading: true,
  posts: [],
  comments: [],
};

export const batchReducers = (reducer) => {
  return function batchingReducer(state, { type, payload }) {
    switch (type) {
    case 'BATCH_ACTIONS':
      return payload.reduce(batchingReducer, state);
    default:
      return reducer(state, { type, payload });
    }
  };
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'SYNC_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'SYNC_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
