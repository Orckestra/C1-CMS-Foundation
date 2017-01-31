import requestJSON from 'console/access/requestJSON.js';
import WAMPClient from 'console/access/wampClient.js';
import outerFrameCallback from 'console/access/postFrame.js';

const prefix = 'SERVER_ACTION.';
const fireActionType = prefix + 'FIRE';
export const FIRE_ACTION = fireActionType + '_COMMENCE';
export const FIRE_ACTION_DONE = fireActionType + '_DONE';
export const FIRE_ACTION_FAILED = fireActionType + '_FAILED';

// TODO: Rig to handle WAMP endpoints

function stringifySearchParam(param) {
	if (Array.isArray(param)) {
		return param.map(encodeURIComponent).join(',');
	} else {
		return encodeURIComponent(param.toString());
	}
}

export function fireAction(provider, pageName, ...params) {
	return dispatch => {
		dispatch({ type: FIRE_ACTION, provider, pageName });
		let request;
		if (provider.protocol === 'http') {
			// HTTP needs key/value parameters - pass as object in first parameter.
			params = params[0];
			params.pageName = pageName;
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
			request = requestJSON(url, {
				body
			});
		} else if (provider.protocol === 'wamp') {
			request = WAMPClient.call(provider.uri, pageName, ...params);
		} else if (provider.protocol === 'post') {
			// Get postFrame accessor, fire with appropriate info
			request = outerFrameCallback(provider, params[0]);
		} else {
			dispatch({
				type: FIRE_ACTION_FAILED,
				provider,
				pageName,
				message: 'Unknown protocol: ' + provider.protocol
			});
			return;
		}
		return request
		.then(() => {
			dispatch({ type: FIRE_ACTION_DONE, provider, pageName });
		})
		.catch(err => {
			dispatch({ type: FIRE_ACTION_FAILED, provider, pageName, message: err.message, stack: err.stack });
			//console.error(err); // eslint-disable-line no-console
		});
	};
}
