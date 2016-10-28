import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import { loadAndOpenPage } from 'console/state/actions/loadAndOpenPage.js';
import { OPEN_PAGE, SELECT_LOCATION } from 'console/state/reducers/layout.js';
import { STORE_OPTION_LIST } from 'console/state/reducers/options.js';
import Immutable from 'immutable';

describe('loadAndOpenPage', () => {
	let store;
	beforeEach(() => {
		store = {
			state: Immutable.fromJS({
				pageDefs: {
					testpage: {
						type: 'test',
						tabs: ['tab1', 'tab2'],
						toolbars: ['toolbar']
					}
				},
				toolbarDefs: {
					toolbar: {
						name: 'toolbar',
						items: ['optionized']
					}
				},
				itemDefs: {
					optionized: {
						name: 'optionized',
						type: 'select',
						optionLoader: 'getLogDates'
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

		it('loads log dates', () => {
			store.state = store.state.setIn(['pageDefs', 'testpage', 'type'], 'document');
			return expect(loadAndOpenPage, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState])
			).then(() => {
				let innerDispatch = sinon.spy().named('innerDispatch');
				expect(store.dispatch.secondCall.args[0],'to be a function')
				.and(
					'with http mocked out', {
						request: 'GET /Composite/api/Logger/GetDates',
						response: {
							status: 200,
							body: [
								'9/28/2016',
								'9/30/2016',
								'10/3/2016'
							]
						}
					},
					'when called with', [innerDispatch]
				).then(() =>
					expect(innerDispatch.secondCall, 'to satisfy', { args: [{
						type: STORE_OPTION_LIST,
						field: 'optionized',
						options: [
							{ value: '2016-10-03T00:00:00.000Z', label: '10/3/2016' },
							{ value: '2016-09-30T00:00:00.000Z', label: '9/30/2016' },
							{ value: '2016-09-28T00:00:00.000Z', label: '9/28/2016' }
						]
					}]})
				);
			});
		});
	});

	describe('for unknown page', () => {
		it('fetches page definitions for the requested page, then opens it', () =>
			expect(loadAndOpenPage, 'when called with', ['newpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState], 'to be rejected')
			).then(() =>
				expect([store.dispatch], 'to have calls satisfying', [
					{ spy: store.dispatch, args: [expect.it('to be a function')] }, // Load pageDef
					{ spy: store.dispatch, args: [expect.it('to be a function')] } // Load values
					// Mocking causes page def load to fail, stops page from being opened and selected.
				])
			)
		);
	});
});
