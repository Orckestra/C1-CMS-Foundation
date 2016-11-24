import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import Immutable from 'immutable';

describe('Load/save values', () => {
	let STORE_VALUES, COMMIT_PAGE, WAMPClient, actions;
	before(done => {
		loadModules([
			{
				module: 'console/state/reducers/dataFields.js',
				moduleCb: m => { ({ STORE_VALUES, COMMIT_PAGE } = m); }
			},
			{
				module: 'console/state/actions/values.js',
				moduleCb: m => { actions = m; }
			},
			{
				module: 'console/access/wampClient.js',
				moduleCb: m => { WAMPClient = m.default; }
			}
		], () => done());
	});

	afterEach(() => {
		WAMPClient.reset();
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_VALUES')
		.and('to have property', 'LOAD_VALUES_DONE')
		.and('to have property', 'LOAD_VALUES_FAILED')
		.and('to have property', 'SAVE_VALUES')
		.and('to have property', 'SAVE_VALUES_DONE')
		.and('to have property', 'SAVE_VALUES_FAILED')
	);

	describe('loadValues', () => {
		let dispatch, rawValues, loadValues, wampCall;
		beforeEach(() => {
			loadValues = actions.loadValues;
			dispatch = sinon.spy().named('dispatch');
			rawValues = {
				field1: 10,
				field2: 'foo',
				field3: []
			};
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs('mock.data.values.load', 'failpage').returns(Promise.reject(new Error('test error')));
			wampCall.withArgs('mock.data.values.load', 'testpage').returns(Promise.resolve(rawValues));
			WAMPClient.setMock(wampCall);
		});

		it('creates a thunk that loads values and dispatches actions', () => {
			return expect(() => expect(loadValues, 'when called with', ['testpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES, pageName: 'testpage' }] },
					{ spy: dispatch, args: [{ type: STORE_VALUES, values: expect.it('to equal', rawValues) }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES_DONE, pageName: 'testpage' }] }
				])
			);
		});

		it('sends word of unhandled errors', () => {
			return expect(() => expect(loadValues, 'when called with', ['failpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES, pageName: 'failpage' }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_VALUES_FAILED, message: 'test error' }] }
				])
			);
		});
	});

	describe('saveValues', () => {
		let saveValues, dispatch, rawState, getState, valueData, wampCall;
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
					failpage: {},
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
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs('mock.data.values.save', 'failpage').returns(Promise.reject(new Error('test error')));
			wampCall.withArgs('mock.data.values.save', 'testpage', valueData).returns(Promise.resolve());
			WAMPClient.setMock(wampCall);
		});

		it('creates a thunk that saves a page\'s dirty fields and dispatches actions', () => {
			return expect(() =>
				expect(saveValues, 'when called with', ['testpage'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch, getState])
				),
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
			return expect(() => expect(saveValues, 'when called with', ['failpage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch, getState])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES, pageName: 'failpage' }] },
					{ spy: dispatch, args: [{ type: actions.SAVE_VALUES_FAILED, message: 'test error' }] }
				])
			);
		});
	});
});
