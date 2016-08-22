import 'whatwg-fetch';
import 'url-polyfill';

export default function requestJSON(path, inputData) {
	if (typeof inputData === 'object') {
		inputData.credentials = 'same-origin';
		if (typeof inputData.body === 'object') {
			inputData.headers = inputData.headers || {};
			inputData.headers['Content-Type'] = 'application/json';
			inputData.body = JSON.stringify(inputData.body);
		}
	} else {
		inputData = {
			credentials: 'same-origin'
		};
	}
	let url = new URL(path, location.href);
	return fetch(url.href, inputData)
	// Provide basic error handling, maybe retry logic?
	.then(response => {
		if (!response.ok) {
			// Catch 503s (with Retry-After?) header and wait, then retry.
			throw new Error(response.status + ' ' + response.statusText);
		} else {
			return response;
		}
	})
	.then(response => response.json());
}
