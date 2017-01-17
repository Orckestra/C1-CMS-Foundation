import WAMPClient from 'console/access/wampClient.js';
import outerFrameCallback from 'console/access/postFrame.js';
import actionLocator from 'console/state/actionLocator.js';

const prefix = 'PROVIDER.';
const useName = prefix + 'USE';
export const USE_PROVIDER = useName + '_COMMENCE';
export const USE_PROVIDER_DONE = useName + '_DONE';
export const USE_PROVIDER_FAILED = useName + '_FAILED';

export const useProvider = (provider, caller, inputData) => dispatch => {
	let innerCall = outputData => {
		let action;
		if (provider.action) {
			let actionCreator = actionLocator.get(provider.action);
			action = actionCreator(caller, outputData);
		}
		return new Promise((resolve) => {
			let result;
			if (action) {
				result = dispatch(action);
			}
			resolve(result);
		});
	};
	if (provider.protocol) {
		dispatch({ type: USE_PROVIDER, provider, caller });
		let request;
		if (provider.protocol === 'wamp') {
			if (provider.sendData) {
				request = WAMPClient.call(provider.uri, caller, inputData);
			} else {
				request = WAMPClient.call(provider.uri, caller);
			}
		} else if (provider.protocol === 'post') {
			// Obsolescent protocol, for compatibility with old UI
			if (provider.sendData) {
				request = outerFrameCallback(provider, inputData);
			} else {
				request = outerFrameCallback(provider);
			}
		} else {
			dispatch({
				type: USE_PROVIDER_FAILED,
				provider,
				caller,
				message: 'Unknown protocol: ' + provider.protocol
			});
			return;
		}
		return request
		.then(() => {
			dispatch({ type: USE_PROVIDER_DONE, provider, caller });
		})
		.catch(err => {
			dispatch({ type: USE_PROVIDER_FAILED, provider, caller, message: err.message, stack: err.stack });
			//console.error(err); // eslint-disable-line no-console
		});
	} else {
		innerCall(inputData);
	}
};
