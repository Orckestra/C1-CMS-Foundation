import requestJSON from 'console/access/requestJSON.js';
import WAMPClient from 'console/access/wampClient.js';
import { storeData } from 'console/state/reducers/providers.js';

// Determine protocol (HTTP/WAMP)
// Access endpoint
const prefix = 'PROVIDER.';

const getActionType = prefix + 'GET';
export const GET_PROVIDER = getActionType + '_COMMENCE';
export const GET_PROVIDER_DONE = getActionType + '_DONE';
export const GET_PROVIDER_FAILED = getActionType + '_FAILED';

function stringifySearchParam(param) {
	if (Array.isArray(param)) {
		return param.map(encodeURIComponent).join(',');
	} else {
		return encodeURIComponent(param.toString());
	}
}

export const getProviderPage = (provider, page, ...params) => (dispatch) => {
	dispatch({ type: GET_PROVIDER, provider, page, params });
	let request;
	if (provider.protocol === 'http') {
		// HTTP needs key/value parameters - pass as object in first parameter.
		params = params[0];
		let url = provider.uri;
		let body;
		if (params && typeof params === 'object') {
			if (provider.post) {
				body = params;
			} else {
				url += '?' + Object.keys(params)
				.map(key => key + '=' + stringifySearchParam(params[key]))
				.join('&');
			}
		}
		request =  requestJSON(url, {
			body
		});
	} else if (provider.protocol === 'wamp') {
		request = WAMPClient.call(provider.uri, ...params);
	} else {
		dispatch({
			type: GET_PROVIDER_FAILED,
			provider,
			page,
			message: 'Unknown protocol: ' + provider.protocol
		});
		return;
	}
	return request
	.then(data => {
		dispatch(storeData(provider.uri, page, data));
		dispatch({ type: GET_PROVIDER_DONE, provider, page });
	})
	.catch(err => {
		dispatch({ type: GET_PROVIDER_FAILED, provider, page, params, message: err.message, stack: err.stack });
		console.error(err); // eslint-disable-line no-console
	});
};
