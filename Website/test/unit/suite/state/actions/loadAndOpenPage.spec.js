import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import { loadAndOpenPage } from 'console/state/actions/loadAndOpenPage.js';
import { OPEN_PAGE, SELECT_LOCATION } from 'console/state/reducers/layout.js';
import Immutable from 'immutable';

describe('loadAndOpenPage', () => {
	let store;
	beforeEach(() => {
		store = {
			state: Immutable.fromJS({
				pageDefs: {
					testpage: {
						tabs: ['tab1', 'tab2']
					}
				}
			}),
			getState: function () {
				return store.state;
			},
			dispatch: sinon.stub().named('dispatch').returns(Promise.resolve(true))
		};
	});

	describe('for known page', () => {
		it('does not fetch definition again, opens page', () =>
			expect(loadAndOpenPage, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState])
			).then(() =>
				expect([store.dispatch], 'to have calls satisfying', [
					{ spy: store.dispatch, args: [expect.it('to be a function')] }, // Load values
					{ spy: store.dispatch, args: [{
						type: OPEN_PAGE,
						pageName: 'testpage',
						tabNames: ['tab1', 'tab2']
					}] },
					{ spy: store.dispatch, args: [{
						type: SELECT_LOCATION,
						page: 'testpage'
					}] }
				])
			)
		);
	});

	describe('for unknown page', () => {
		it('fetches page definitions for the requested page, then opens it', () =>
			expect(loadAndOpenPage, 'when called with', ['newpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState])
			).then(() =>
				expect([store.dispatch], 'to have calls satisfying', [
					{ spy: store.dispatch, args: [expect.it('to be a function')] }, // Load pageDef
					{ spy: store.dispatch, args: [expect.it('to be a function')] }, // Load values
					{ spy: store.dispatch, args: [{
						type: OPEN_PAGE,
						pageName: 'newpage'
					}] },
					{ spy: store.dispatch, args: [{
						type: SELECT_LOCATION,
						page: 'newpage'
					}] }
				])
			)
		);
	});
});
