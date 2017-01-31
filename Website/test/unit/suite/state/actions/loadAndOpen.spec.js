import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import { OPEN_PAGE, SELECT_LOCATION } from 'console/state/reducers/layout.js';
import { STORE_OPTION_LIST } from 'console/state/reducers/options.js';
import { GET_LOG, GET_LOG_DONE } from 'console/state/actions/logs.js';
import Immutable from 'immutable';

let loadAndOpenPage, loadTabValues;
before(done => {
	System.import('console/state/actions/loadAndOpen.js')
	.then(m => {
		({ loadAndOpenPage, loadTabValues } = m);
		done();
	});
});

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
					},
					shimpage: {
						name: 'shimpage',
						dialog: 'testdialog',
						type: 'dialogPageShim'
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
				},
				dialogDefs: {
					testdialog: {
						name: 'testdialog',
						panes: [
							'testpalette'
						]
					}
				},
				dialogPaneDefs: {
					testpalette: {
						name: 'testpalette',
						type: 'palette',
						context: 'testing',
						provider: 'elementSource'
					}
				},
				providerDefs: {
					elementSource: {
						protocol: 'wamp',
						uri: 'mock.provider.test'
					}
				}
			}),
			getState: sinon.spy(function () {
				return store.state;
			}).named('getState'),
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
				expect(store.dispatch, 'to have calls satisfying', [
					{ args: [{
						type: OPEN_PAGE,
						pageName: 'testpage',
						tabNames: ['tab1', 'tab2']
					}] },
					{ args: [{
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
				.and('when called with', [store.dispatch, store.getState], 'to be rejected')
			).then(() =>
				expect(store.dispatch, 'to have calls satisfying', [
					{ args: [expect.it('to be a function')] }, // Load pageDef
					{ args: [{ type: 'LAYOUT.OPEN_PAGE', pageName: 'newpage', tabNames: [] }] },
					{ args: [{ type: 'LAYOUT.SELECT_LOCATION', page: 'newpage' }] }
				])
			)
		);
	});

	describe('for log page', () => {
		it('loads log dates', () => {
			store.state = store.state.setIn(['pageDefs', 'testpage', 'type'], 'document');
			let tabState = sinon.stub().named('getState').returns(Immutable.fromJS({
				tabDefs: {
					tab1: {
						name: 'tab1',
						type: 'log',
						logURL: '/Composite/console/serverLog.json',
						logPageName: 'tab1date'
					},
					tab2: {}
				},
				options: {
					tab1date: '2016-09-30T00:00:00.000Z'
				}
			}));
			let innerDispatch = sinon.spy().named('innerDispatch');
			return expect(loadAndOpenPage, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState])
			).then(() => {
				return expect(store.dispatch, 'to have calls satisfying', [
					{ args: [{ type: 'LAYOUT.OPEN_PAGE', pageName: 'testpage', tabNames: ['tab1', 'tab2'] }] },
					{ args: [{ type: 'LAYOUT.SELECT_LOCATION', page: 'testpage' }] },
					{ args: [ expect.it('to be a function') ]},
					{ args: [
						expect.it('to be a function')
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
							'when called with', [innerDispatch, tabState],
							'to be fulfilled'
						)
					] },
					{ args: [ expect.it('to be a function') ]},
					{ args: [ expect.it('to be a function') ]}
				])
				.then(() =>
					expect(innerDispatch, 'to have a call satisfying', {
						args: [
							{
								type: STORE_OPTION_LIST,
								field: 'optionized',
								options: [
									{ value: '2016-10-03T00:00:00.000Z', label: '10/3/2016' },
									{ value: '2016-09-30T00:00:00.000Z', label: '9/30/2016' },
									{ value: '2016-09-28T00:00:00.000Z', label: '9/28/2016' }
								]
							}
						]
					})
				);
			});
		});
	});

	describe('for shim page', () => {
		it('fetches data from the dialog provider', () => {
			let innerDispatch = sinon.spy().named('innerDispatch');
			return expect(loadAndOpenPage, 'when called with', ['shimpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [store.dispatch, store.getState], 'to be fulfilled')
			)
			.then(() =>
				expect(store.dispatch, 'to have calls satisfying', [
					{ args: [{ type: 'LAYOUT.OPEN_PAGE', pageName: 'shimpage', tabNames: [] }] },
					{ args: [{ type: 'LAYOUT.SELECT_LOCATION', page: 'shimpage' }] },
					{ args: [
						expect.it('to be a function') // Load provider data
						.and('when called with', [innerDispatch], 'to be fulfilled')
					] }
				])
			)
			.then(() =>
				expect(innerDispatch, 'to have calls satisfying', [
					{ args: [ { type: 'PROVIDER.GET_COMMENCE', provider: { protocol: 'wamp', uri: 'mock.provider.test' }, page: 'testdialog', params: [ '' ] } ]},
					{ args: [ { type: 'PROVIDER.STORE', providerName: 'mock.provider.test', page: 'testdialog' } ]},
					{ args: [ { type: 'PROVIDER.GET_DONE', provider: { protocol: 'wamp', uri: 'mock.provider.test' }, page: 'testdialog' } ]}
				])
			);
		});
	});
});

describe('loadTabValues', () => {
	let store;
	beforeEach(() => {
		store = {
			state: Immutable.fromJS({
				tabDefs: {
					testTab: {
						name: 'testTab',
						type: ''
					}
				},
				options: {
					values: {},
					lists: {
						'testTab.date': [
							{ value: '2016-10-23T00:00:00.000Z' },
							{ value: '2016-10-22T00:00:00.000Z' },
							{ value: '2016-10-21T00:00:00.000Z' }
						]
					}
				},
				logs: {
					testTab: {
						'2016-10-22T00:00:00.000Z': ['it', 'exists', 'already']
					}
				}
			}),
			getState: sinon.spy(function () {
				return store.state;
			}).named('getState'),
			dispatch: sinon.stub().named('dispatch').returns(Promise.resolve(true))
		};
	});

	describe('on a form tab', () => {
		beforeEach(() => {
			store.state = store.state.setIn(['tabDefs', 'testTab', 'type'], 'form');
		});

		it('checks tab type, but does nothing', () =>
			expect(loadTabValues,
				'when called with', ['testTab']
			)
			.then(loader =>
				expect(loader, 'to be a function')
				.and('when called with', [store.dispatch, store.getState])
			).then(() => expect.promise.all([
				expect(store.getState, 'was called'),
				expect(store.dispatch, 'was not called')
			]))
		);
	});

	describe('on a log tab', () => {
		let innerDispatch;
		beforeEach(() => {
			store.state = store.state
				.setIn(['tabDefs', 'testTab', 'logPageName'], 'testTab.date')
				.setIn(['tabDefs', 'testTab', 'type'], 'log');
			innerDispatch = sinon.spy().named('innerDispatch');
		});

		describe('without log', () => {
			it('checks tab type, and gets the latest log page', () =>
				expect(loadTabValues,
					'when called with', ['testTab']
				)
				.then(loader =>
					expect(loader, 'to be a function')
					.and('when called with', [store.dispatch, store.getState])
				).then(() => expect.promise.all([
					expect(store.getState, 'was called'),
					expect(
						() => expect(store.dispatch.firstCall.args[0], 'to be a function')
						.and('when called with', [innerDispatch]),
						'with http mocked out', {
							request: {
								method: 'POST',
								url: '/Composite/api/Logger/GetData',
								body: {
									DateFrom: '10/23/2016',
									DateTo: '10/24/2016',
									Severity: 'Verbose',
									Amount: 5000
								}
							},
							response: {
								statusCode: 200,
								body: []
							}
						},
						'not to error'
					)
				]))
				.then(() =>
					expect(innerDispatch, 'to have a call satisfying', { args: [{
						type: GET_LOG,
						logTabName: 'testTab',
						day: '2016-10-23T00:00:00.000Z'
					}]})
					.and('to have a call satisfying', { args: [{
						type: GET_LOG_DONE,
						logTabName: 'testTab',
						day: '2016-10-23T00:00:00.000Z'
					}]})
				)
			);
		});

		describe('with existing log', () => {
			beforeEach(() => {
				store.state = store.state
					// Set date selector to the page that already has content
					.setIn(['options', 'values', 'testTab.date'], '2016-10-22T00:00:00.000Z');
			});

			it('checks tab type, and does not fetch log data', () =>
				expect(loadTabValues,
					'when called with', ['testTab']
				)
				.then(loader =>
					expect(loader, 'to be a function')
					.and('when called with', [store.dispatch, store.getState])
				).then(() => expect.promise.all([
					expect(store.getState, 'was called'),
					expect(store.dispatch, 'was not called')
				]))
			);
		});
	});
});
