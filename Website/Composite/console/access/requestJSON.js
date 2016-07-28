import 'whatwg-fetch';

let fetch = window.fetch;

export default function requestJSON(inputData) {
	return fetch(inputData)
	.then(response => response.json());
	// Provide basic error handling, maybe retry logic?
}

export function mockFetch(result, error) {
	fetch = url => new Promise((resolve, reject) => {
		if (error) {
			reject({ url, result });
		} else {
			resolve({ url, json: () => JSON.parse(result) });
		}
	});
}
export function unmock() {
	fetch = window.fetch;
}
