import expect from '../../helpers/expect';
import requestJSON from '../../../../Composite/console/access/requestJSON';

describe('requestJSON', () => {
	it('is asynchronous', () =>
		expect(() =>
			requestJSON('/').then(result => expect(result, 'to be an object')),
		'with xhr mocked out', {
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
			'with xhr mocked out', {
				request: 'GET ' + url,
				response: { body }
			},
			'not to error')
		);
	});

	describe('Error handling', () => {
		it('rejects on unrecoverable errors', () =>
			expect(() => requestJSON('/failure.json'), 'to error')
		);
	});
});
