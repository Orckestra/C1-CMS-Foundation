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
		if (provider.callAction) {
			let actionCreator = actionLocator.get(provider.callAction);
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
		let action = { type: USE_PROVIDER, provider, caller };
		if (provider.sendData) {
			action.data = inputData;
		}
		dispatch(action);
		let request;
		let args = [];
		if (!provider.sendNoCaller) {
			args.push(caller);
		}
		if (provider.sendData) {
			args.push(inputData);
		}
		if (provider.protocol === 'wamp') {
			request = WAMPClient.call(provider.uri, ...args);
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
			return Promise.resolve();
		}
		return request
		.then(innerCall)
		.then(() => {
			let action = { type: USE_PROVIDER_DONE, provider, caller };
			if (provider.sendData) {
				action.data = inputData;
			}
			dispatch(action);
		})
		.catch(err => {
			let action = { type: USE_PROVIDER_FAILED, provider, caller, message: err.message, stack: err.stack };
			if (provider.sendData) {
				action.data = inputData;
			}
			dispatch(action);
			//console.error(err); // eslint-disable-line no-console
		});
	} else {
		return innerCall(inputData);
	}
};
