import expect from '../../helpers/expect';
import requestJSON from '../../../../Composite/console/access/requestJSON';

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

	describe('Response', () => {
		let url, body;
		beforeEach(() => {
			url = '/fixture.json';
			body = {
				url,
				list: [1,2,3]
			};
		});

		it('fetches JSON from a passed URL', () =>
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

	describe('Error handling', () => {
		it('rejects if called with a non-compliant URL', () =>
			expect(requestJSON,
				'when called with', ['this/is/wrong'],
				'to be rejected with', 'Paths requested must either be absolute or begin with a slash'
			)
		);

		it('rejects on unrecoverable errors', () =>
			expect(() => requestJSON('/failure.json'), 'to error')
		);
	});
});
