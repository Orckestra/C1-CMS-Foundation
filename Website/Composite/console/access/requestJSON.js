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
	.then(response => response.json());
	// Provide basic error handling, maybe retry logic?
	// Catch 503s with Retry-After header and wait, then retry.
}
