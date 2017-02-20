import expect from 'unittest/helpers/expect.js';
import requestJSON from 'console/access/requestJSON.js';
import sinon from 'sinon';
import zurvan from 'zurvan';

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
		let url, body;
		beforeEach(() => {
			url = 'http://example.org/fixture.json';
			body = {
				url,
				list: [1,2,3]
			};
			// Spy on fetch
			sinon.spy(global, 'fetch');
			return zurvan.interceptTimers();
		});

		afterEach(() => {
			global.fetch.restore();
			return zurvan.releaseTimers();
		});

		it('rejects if called with a non-compliant URL', () =>
			expect(requestJSON,
				'when called with', ['about:blank/this/is/wrong'],
				'to be rejected'
			)
		);

		it('rejects on unrecoverable errors', () =>
			expect(
				requestJSON, 'when called with', ['/failure.json'],
				'to be rejected with', '404 Not Found'
			)
		);

		it('retries if given a Retry-After header', () =>
			expect(() =>
				requestJSON(url, {})
				.then(result => expect(result, 'to satisfy', { url, list: [1,2,3] })),
			'with http mocked out', [
				{
					request: 'GET ' + url,
					response: {
						statusCode: 503,
						headers: {
							'Retry-After': 5
						}
					}
				},
				{
					request: 'GET ' + url,
					response: { body }
				}
			],
			'while waiting for', 6000,
			'not to error')
			.then(() =>
				expect(global.fetch, 'was called twice')
			)
		);
	});
});
