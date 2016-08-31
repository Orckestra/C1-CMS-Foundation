import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/values.js';
import { STORE_VALUES } from 'console/state/reducers/dataFields.js';

describe('Load/save values', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_VALUES')
		.and('to have property', 'LOAD_VALUES_DONE')
		.and('to have property', 'LOAD_VALUES_FAILED')
	);

	describe('loadValues', () => {
		let loadValues, dispatch, rawValues;
		beforeEach(() => {
			loadValues = actions.loadValues;
			dispatch = sinon.spy().named('dispatch');
			rawValues = {
				field1: 10,
				field2: 'foo',
				field3: []
			};
		});

		it('creates a thunk that dispatches actions', () => {
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
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES_FAILED, error: '404 Not Found' }] }
				])
			);
		});
	});
});
