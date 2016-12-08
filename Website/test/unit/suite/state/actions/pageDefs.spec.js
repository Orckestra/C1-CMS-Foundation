import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('Get page definitions', () => {
	let STORE_DEF, WAMPClient, actions;
	before(done => {
		loadModules([
			{
				module: 'console/state/reducers/definitions.js',
				moduleCb: m => { STORE_DEF = m.STORE_DEF; }
			},
			{
				module: 'console/state/actions/pageDefs.js',
				moduleCb: m => { actions = m; }
			},
			{
				module: 'console/access/wampClient.js',
				moduleCb: m => { WAMPClient = m.default; }
			}
		], () => done());
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_PAGE_DEF')
		.and('to have property', 'LOAD_PAGE_DEF_DONE')
		.and('to have property', 'LOAD_PAGE_DEF_FAILED')
	);

	describe('loadPageDef', () => {
		let dispatch, wampCall, loadPageDef;
		beforeEach(() => {
			loadPageDef = actions.loadPageDef;
			dispatch = sinon.spy().named('dispatch');
			let rawPageDef = {
				name: 'testPage',
				type: 'test',
				tabs: [
					{
						name: 'testTab',
						fieldsets: [
							{
								name: 'testFieldSet',
								label: 'A test',
								fields: [
									{
										name: 'testDataField',
										label: 'A field'
									}
								]
							}
						]
					}
				],
				toolbars: [
					{
						name: 'testToolbar',
						items: [
							{
								name: 'testButton',
								label: 'Test it'
							}
						]
					}
				]
			};
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs('structure.page', 'failPage').returns(Promise.reject(new Error('test error')));
			wampCall.withArgs('structure.page', 'testPage').returns(Promise.resolve(rawPageDef));
			WAMPClient.setMock(wampCall);
		});

		afterEach(() => {
			WAMPClient.reset();
		});

		it('creates a thunk that loads definitions and dispatches actions', () => {
			return expect(() => expect(loadPageDef, 'when called with', ['testPage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF, name: 'testPage' }] },
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'page', definition: {
						name: 'testPage',
						tabs: ['testTab'],
						toolbars: ['testToolbar'],
						type: 'test'
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'tab', definition: {
						name: 'testTab',
						fieldsets: ['testFieldSet']
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'fieldset', definition: {
						name: 'testFieldSet',
						label: 'A test',
						fields: ['testDataField']
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'dataField', definition: {
						name: 'testDataField',
						label: 'A field'
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'toolbar', definition: {
						name: 'testToolbar',
						items: ['testButton']
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'item', definition: {
						name: 'testButton',
						label: 'Test it'
					}}]},
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF_DONE, name: 'testPage' }] }
				])
			);
		});

		it('sends word of unhandled errors', () => {
			return expect(() => expect(loadPageDef, 'when called with', ['failPage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF, name: 'failPage' }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF_FAILED, message: 'test error' }] }
				])
			);
		});
	});
});
