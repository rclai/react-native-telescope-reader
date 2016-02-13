import { ListView } from 'react-native';

let initialState = {
	status: 'Connecting',
	loading: true,
	posts: [],
	comments: [],
	commentsCache: {},
	subIdMap: {},
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
		case 'CACHE_ITEMS':
			var { cacheName, cacheKey, items } = action.payload;
			return {
				...state,
				[cacheName]: {
					...state[cacheName],
					[cacheKey]: items,
				},
			};
		case 'CLEAR_CACHE':
			var { cacheName, cacheKey } = action.payload;
			return {
				...state,
				[cacheName]: {
					...state[cacheName],
					[cacheKey]: null,
				},
			};
		case 'STORE_SUB_ID':
			var { subName, subId } = action.payload;
			return {
				...state,
				subIdMap: {
					...state.subIdMap,
					[subName]: subId,
				},
			};
		default:
			return state;
	}
};
