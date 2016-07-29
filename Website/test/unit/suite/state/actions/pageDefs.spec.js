import expect from '../../../helpers/expect';
import sinon from 'sinon';
import * as actions from '../../../../../Composite/console/state/actions/pageDefs';

describe('Get page definitions', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'GET_PAGE_DEF')
		.and('to have property', 'GET_PAGE_DEF_DONE')
		.and('to have property', 'GET_PAGE_DEF_FAILED')
	);

	describe('Action creator', () => {
		let dispatch, getPageDef, pageDef;
		beforeEach(() => {
			getPageDef = actions.getPageDef;
			dispatch = sinon.spy().named('dispatch');
			pageDef = {
				testPage: {
					type: 'TestComponent',
					fieldsets: {},
					buttons: {}
				}
			};
		});

		it.skip('returns a thunk that dispatches actions', () =>
			expect(getPageDef, 'when called with', ['testPage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('with xhr mocked out', {
					request: 'GET /Composite/console/pageData.json',
					response: {
						body: JSON.stringify(pageDef)
					}
				}, 'when called with', [dispatch])
			)
			.then(response => Promise.all([
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.GET_PAGE_DEF, name: 'testPage' }] },
					{ spy: dispatch, args: [{ type: actions.GET_PAGE_DEF_DONE, name: 'testPage' }] }
				]),
				expect(response, 'to satisfy', pageDef)
			]))
		);
	});
});
