import 'whatwg-fetch';
import 'url-polyfill';

export default function requestJSON(path, inputData) {
	if (typeof inputData === 'object') {
		inputData.credentials = 'include';
		if (typeof inputData.body === 'object') {
			inputData.method = inputData.method ? inputData.method : 'POST';
			inputData.headers = inputData.headers || {};
			inputData.headers['Content-Type'] = 'application/json';
			inputData.body = JSON.stringify(inputData.body);
		} else {
			delete inputData.body;
		}
	} else {
		inputData = {
			credentials: 'include'
		};
	}
	let url = new URL(path, location.href);
	return fetch(url.href, inputData)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			if (response.headers && response.headers.get('Retry-After')) {
				let waittime = parseInt(response.headers.get('Retry-After'), 10) * 1000;
				return new Promise(resolve => setTimeout(resolve, waittime))
				.then(() => requestJSON(path, inputData));
			} else {
				throw new Error(response.status + ' ' + response.statusText);
			}
		}
	});
}
