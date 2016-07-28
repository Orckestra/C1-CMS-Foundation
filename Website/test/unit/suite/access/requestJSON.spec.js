import expect from '../../helpers/expect';
import requestJSON, { mockFetch } from '../../../../Composite/console/access/requestJSON';

describe('requestJSON', () => {
	describe('Response', () => {
		let url;
		beforeEach(() => {
			url = '/fixture.json';
			mockFetch(JSON.stringify({
				url,
				list: [1,2,3]
			}));
		});

		it('fetches JSON from a passed URL', () =>
			expect(requestJSON(url), 'to be a', 'Promise')
			.and('when fulfilled', 'to satisfy', {
				url,
				list: [1,2,3]
			})
		);
	});

	describe('Error handling', () => {
		it('rejects on general errors', () => {
			mockFetch({}, true);
			return expect(requestJSON('/failure.json'), 'to be rejected');
		});
	});
});
