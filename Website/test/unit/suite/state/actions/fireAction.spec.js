import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('Fire server action', () => {
	let actions, WAMPClient;
	before(done => {
		loadModules([
			{
				module: 'console/state/actions/fireAction.js',
				moduleCb: m => { actions = m; }
			},
			{
				module: 'console/access/wampClient.js',
				moduleCb: m => { WAMPClient = m.default; }
			}
		], () => done());
	});


	it('has action descriptors', () =>
		expect(actions, 'to have property', 'FIRE_ACTION')
		.and('to have property', 'FIRE_ACTION_DONE')
		.and('to have property', 'FIRE_ACTION_FAILED')
	);

	describe('fireAction', () => {
		let dispatch, provider, valueData, fireAction;
		beforeEach(() => {
			fireAction = actions.fireAction;
			dispatch = sinon.spy().named('dispatch');
			valueData = {};
		});

		describe('using HTTP', () => {
			let requestData;
			beforeEach(() => {
				provider = {
					protocol: 'http',
					uri: '/SomeURL',
					post: true
				};
				requestData = Object.assign({}, valueData, {pageName: 'testPage' });
			});

			it('creates a thunk that sends a server action off, fires state actions to track it', () => {
				return expect(() => expect(fireAction, 'when called with', [provider, 'testPage', valueData])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'with http mocked out', {
					request: {
						method: 'POST',
						url: '/SomeURL',
						body: requestData
					},
					response: {
						statusCode: 200,
						body: { result: 'OK' }
					}
				}, 'not to error')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION, provider, pageName: 'testPage' }] },
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_DONE, provider, pageName: 'testPage' }] }
					])
				);
			});

			it('sends word of unhandled errors', () => {
				return expect(() => expect(fireAction, 'when called with', [provider, 'testPage', valueData])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'with http mocked out', {
					request: {
						method: 'POST',
						url: '/SomeURL',
						body: requestData
					},
					response: {
						statusCode: 404
					}
				}, 'not to error')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION,  provider, pageName: 'testPage' }] },
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_FAILED, provider, pageName: 'testPage', message: '404 Not Found' }] }
					])
				);
			});
		});

		describe('using WAMP', () => {
			beforeEach(() => {
				provider = {
					protocol: 'wamp',
					uri: 'mock.test.provider'
				};
				let wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
				wampCall.withArgs('mock.test.provider', 'failPage').returns(Promise.reject(new Error('test error')));
				wampCall.withArgs('mock.test.provider', 'testPage').returns(Promise.resolve({ result: 'OK' }));
				WAMPClient.setMock(wampCall);
				valueData = [true, 'test'];
			});

			afterEach(() => {
				WAMPClient.reset();
			});

			it('creates a thunk that sends a server action off, fires state actions to track it', () => {
				return expect(() => expect(fireAction, 'when called with', [provider, 'testPage', ...valueData])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				), 'not to error')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION, provider, pageName: 'testPage' }] },
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_DONE, provider, pageName: 'testPage' }] }
					])
				);
			});

			it('sends word of unhandled errors', () => {
				return expect(() => expect(fireAction, 'when called with', [provider, 'failPage', ...valueData])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				), 'not to error')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION,  provider, pageName: 'failPage' }] },
						{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_FAILED, provider, pageName: 'failPage', message: 'test error' }] }
					])
				);
			});
		});
	});
});
