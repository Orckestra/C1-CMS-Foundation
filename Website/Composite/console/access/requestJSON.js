import 'whatwg-fetch';
// let fetch = window.fetch;

export default function requestJSON(path, inputData) {
	if (typeof inputData === 'object') {
		inputData.credentials = 'same-origin';
	} else {
		inputData = {
			credentials: 'same-origin'
		};
	}
	if (!/^http/.test(path)) {
		if (!/^\//.test(path)) {
			return Promise.reject(new Error('Paths requested must either be absolute or begin with a slash'));
		}
		path = location.origin + path;
	}
	return fetch(path, inputData)
	// .then(response => {
	// 	console.log(response);
	// 	return response;
	// })
	.then(response => response.json());
	// Provide basic error handling, maybe retry logic?
	// Catch 503s with Retry-After header and wait, then retry.
}
