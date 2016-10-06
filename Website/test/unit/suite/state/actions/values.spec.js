import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/values.js';
import { STORE_VALUES, COMMIT_PAGE } from 'console/state/reducers/dataFields.js';
import Immutable from 'immutable';

describe('Load/save values', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_VALUES')
		.and('to have property', 'LOAD_VALUES_DONE')
		.and('to have property', 'LOAD_VALUES_FAILED')
		.and('to have property', 'SAVE_VALUES')
		.and('to have property', 'SAVE_VALUES_DONE')
		.and('to have property', 'SAVE_VALUES_FAILED')
	);

	describe('loadValues', () => {
		let dispatch, rawValues, loadValues = actions.loadValues;
		beforeEach(() => {
			dispatch = sinon.spy().named('dispatch');
			rawValues = {
				field1: 10,
				field2: 'foo',
				field3: []
			};
		});

		it('creates a thunk that loads values and dispatches actions', () => {
			return expect(() => expect(loadValues, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: 'GET /Composite/console/values.json?page=' + 'testpage',
				response: {
					body: JSON.stringify(rawValues)
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: STORE_VALUES, values: expect.it('to equal', rawValues) }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES_DONE, pageName: 'testpage' }] }
				])
			);
		});

		it('sends word of unhandled errors', () => {
			return expect(() => expect(loadValues, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: 'GET /Composite/console/values.json?page=' + 'testpage',
				response: {
					statusCode: 404
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES_FAILED, message: '404 Not Found' }] }
				])
			);
		});
	});

	describe('saveValues', () => {
		let saveValues, dispatch, rawState, getState, valueData;
		beforeEach(() => {
			saveValues = actions.saveValues;
			dispatch = sinon.spy().named('dispatch');
			valueData = {
				field1: 10,
				field2: 'foo',
				field3: [],
				field4: 'no',
				field5: false
			};
			rawState = Immutable.fromJS({
				dataFields: {
					testpage: {
						field1: 10,
						field2: 'foo',
						field3: [],
						field4: 'no',
						field5: false
					},
					committedPages: {
						testpage: {
							field1: 12,
							field2: 'foo',
							field3: ['things'],
							field4: 'yes',
							field5: false
						}
					}
				}
			});
			getState = sinon.stub().named('getState').returns(rawState);
		});

		it('creates a thunk that saves a page\'s dirty fields and dispatches actions', () => {
			return expect(() =>
				expect(saveValues, 'when called with', ['testpage'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch, getState])
				),
			'with http mocked out', {
				request: {
					method: 'POST',
					url: '/Composite/console/values.json',
					body: valueData
				},
				response: {
					statusCode: 200,
					body: valueData
				}
			},
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: COMMIT_PAGE, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES_DONE, pageName: 'testpage' }] }
				])
			);
		});

		it('aborts if there are no dirty fields for the page', () => {
			getState.returns(
				rawState.setIn(['dataFields', 'testpage'],
					rawState.getIn(['dataFields', 'committedPages', 'testpage'])
				)
			);
			return expect(() =>
				expect(saveValues, 'when called with', ['testpage'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch, getState])
				),'not to error')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.SAVE_VALUES, pageName: 'testpage' }] },
						{ spy: dispatch, args: [{ type: actions.SAVE_VALUES_FAILED, message: 'Page testpage is unchanged' }] }
					])
				);
		});

		it('sends word of unhandled errors, and reverts cleared dirty flags', () => {
			return expect(() => expect(saveValues, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch, getState])
			),
			'with http mocked out', {
				request: {
					method: 'POST',
					url: '/Composite/console/values.json',
					body: valueData
				},
				response: {
					statusCode: 404
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES_FAILED, message: '404 Not Found' }] }
				])
			);
		});
	});
});
