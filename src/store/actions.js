import Crater from './crater';

export const subscribe = (name, params) => dispatch => new Promise((resolve, reject) => {
	dispatch({
		type: 'SET_STATUS',
		payload: 'Loading',
	});
	let subId = Crater.subscribe(name, params, (error) => {
		error && reject(error);
		!error && resolve();
	});
	// By storing the subId, we can immediately
	// cancel it in case we navigate, for example
	dispatch({
		type: 'STORE_SUB_ID',
		payload: {
			subName: name,
			subId: subId,
		},
	});
});

export const unsubscribe = (subName) => (dispatch, getState) => {
	const { subIdMap } = getState();
	subIdMap[subName] && Crater.unsubscribe(subIdMap[subName]);
};

let cacheClearingFunctions = {};
let CACHE_TIME_LIMIT = 30000;

export const cacheItems = (cacheName, cacheKey, items) => dispatch => {
	console.log('caching items on', cacheName, 'in', cacheKey);
	dispatch({
		type: 'CACHE_ITEMS',
		payload: {
			cacheName,
			cacheKey,
			items,
		}
	});
	// This causes these cached items to get cleared after 30 seconds
	clearTimeout(cacheClearingFunctions[cacheName + cacheKey]);
	cacheClearingFunctions[cacheName + cacheKey] = setTimeout(() => {
		console.log('clearing cache automatically of', cacheName, 'in', cacheKey);
		dispatch(clearCache(cacheName, cacheKey));
	}, CACHE_TIME_LIMIT);
};

export const clearCache = (cacheName, cacheKey) => dispatch => {
	console.log('clearing cache of', cacheName, 'in', cacheKey);
	dispatch({
		type: 'CLEAR_CACHE',
		payload: {
			cacheName,
			cacheKey,
		}
	});
	clearTimeout(cacheClearingFunctions[cacheName + cacheKey]);
};

export const stopClearCache = (cacheName, cacheKey) => dispatch => {
	console.log('preventing cache clear on', cacheName, 'in', cacheKey);
	clearTimeout(cacheClearingFunctions[cacheName + cacheKey]);
};
