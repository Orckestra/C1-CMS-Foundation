import expect from '../../helpers/expect';
import requestJSON from 'console/access/requestJSON.js';

describe('requestJSON', () => {
	it('is asynchronous', () =>
		expect(() =>
			requestJSON('/').then(result => expect(result, 'to be an object')),
			'with http mocked out', {
				request: 'GET /',
				response: { body: '{}' }
			},
		'not to error')
	);

	describe('GET local URL', () => {
		let url, body;
		beforeEach(() => {
			url = '/fixture.json';
			body = {
				url,
				list: [1,2,3]
			};
		});

		it('fetches JSON data', () =>
			expect(() =>
				requestJSON(url)
				.then(result => expect(result, 'to satisfy', {
					url,
					list: [1,2,3]
				})),
				'with http mocked out', {
					request: 'GET ' + url,
					response: { body }
				},
				'not to error')
		);
	});

	describe('POST local URL', () => {
		let url, body;
		beforeEach(() => {
			url = '/fixture.json';
			body = {
				url,
				list: [1,2,3]
			};
		});

		it('sends JSON data', () =>
			expect(() =>
				requestJSON(url, {
					method: 'POST',
					body
				}),
				'with http mocked out', {
					request: {
						url: 'POST ' + url,
						body
					},
					response: {
						body
					}
				},
				'not to error')
		);
	});

	describe('GET absolute URL', () => {
		let url, body;
		beforeEach(() => {
			url = 'http://example.org/fixture.json';
			body = {
				url,
				list: [1,2,3]
			};
		});

		it('fetches JSON data', () =>
			expect(() =>
				requestJSON(url, {})
				.then(result => expect(result, 'to satisfy', {
					url,
					list: [1,2,3]
				})),
				'with http mocked out', {
					request: 'GET ' + url,
					response: { body }
				},
				'not to error')
		);
	});

	describe('Error handling', () => {
		it('rejects if called with a non-compliant URL', () =>
			expect(requestJSON,
				'when called with', ['this/is/wrong'],
				'to be rejected with', 'URLs may not be relative'
			)
		);

		it('rejects on unrecoverable errors', () =>
			expect(
				requestJSON, 'when called with', ['/failure.json'],
				'to be rejected with', '404 Not Found'
			)
		);
	});
});
