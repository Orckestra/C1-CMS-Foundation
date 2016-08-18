import 'whatwg-fetch';

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
	if (!/^http/.test(path)) {
		if (!/^\//.test(path)) {
			return Promise.reject(new Error('URLs may not be relative'));
		}
		path = location.origin + path;
	}
	return fetch(path, inputData)
	// Provide basic error handling, maybe retry logic?
	.then(response => {
		if (!response.ok) {
			// Catch 503s with Retry-After header and wait, then retry.
			throw new Error(response.status + ' ' + response.statusText);
		} else {
			return response;
		}
	})
	.then(response => response.json());
}
