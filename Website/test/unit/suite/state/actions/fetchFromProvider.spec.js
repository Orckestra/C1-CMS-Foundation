import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('Data providers', () => {
	let STORE_PROVIDER_DATA, actions, WAMPClient;
	before(done => {
		loadModules([
			{
				module: 'console/state/reducers/providers.js',
				moduleCb: m => { STORE_PROVIDER_DATA = m.STORE_PROVIDER_DATA; }
			},
			{
				module: 'console/state/actions/fetchFromProvider.js',
				moduleCb: m => { actions = m; }
			},
			{
				module: 'console/access/wampClient.js',
				moduleCb: m => { WAMPClient = m.default; }
			}
		], () => done());
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'GET_PROVIDER')
			.and('to have property', 'GET_PROVIDER_DONE')
			.and('to have property', 'GET_PROVIDER_FAILED')
	);

	describe('getProviderPage', () => {
		let dispatch, getProviderPage;
		beforeEach(()=> {
			getProviderPage = actions.getProviderPage;
			dispatch = sinon.spy().named('dispatch');
		});

		describe.skip('using HTTP', () => {
			let provider, params, result;
			beforeEach(() => {
				provider = {
					protocol: 'http',
					uri: '/Composite/api/Mock/Provider'
				};
				params = {
					first: true,
					second: 'something',
					third: [1, 2, 3]
				};
				result = {
					output: 'will be there'
				};
			});

			describe('GET w. params', () => {
				it('fetches data from a given provider', () =>
					expect(() =>
						expect(getProviderPage, 'when called with', [provider, 'page1', params])
						.then(thunk =>
							expect(thunk, 'to be a function')
							.and('when called with', [dispatch])
						),
						'with http mocked out', {
							request: 'GET /Composite/api/Mock/Provider?first=true&second=something&third=1,2,3',
							response: {
								statusCode: 200,
								body: ['elements', 'of', 'data']
							}
						},
						'not to error'
					)
					.then(() =>
						expect(dispatch, 'to have calls satisfying', [
							{ args: [{ type: actions.GET_PROVIDER, provider: { uri: 'mock.test.provider' }, page: 'page1' }] },
							{ args: [{ type: STORE_PROVIDER_DATA, page: 'page1', data: result }] },
							{ args: [{ type: actions.GET_PROVIDER_DONE, provider: { uri: 'mock.test.provider' }, page: 'page1' }] }
						])
					)
				);
			});

			describe('POST', () => {
				beforeEach(() => {
					provider.post = true;
				});
			});
		});

		describe('using WAMP', () => {
			let provider, params, wampCall, result;
			beforeEach(() => {
				provider = {
					protocol: 'wamp',
					uri: 'mock.test.provider'
				};
				params = [
					true,
					'something',
					[1, 2, 3]
				];
				result = {
					output: 'will be there'
				};
				wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
				wampCall.withArgs('mock.test.provider', false).returns(Promise.reject(new Error('test error')));
				wampCall.withArgs('mock.test.provider', true).returns(Promise.resolve(result));
				WAMPClient.setMock(wampCall);
			});

			afterEach(() => {
				WAMPClient.reset();
			});

			it('fetches data from a given provider', () =>
				expect(() =>
					expect(getProviderPage, 'when called with', [provider, 'page1', ...params])
					.then(thunk =>
						expect(thunk, 'to be a function')
						.and('when called with', [dispatch], 'to be fulfilled')
					),
					'not to error'
				)
				.then(() =>
					expect(dispatch, 'to have calls satisfying', [
						{ args: [{ type: actions.GET_PROVIDER, provider: { uri: 'mock.test.provider' }, page: 'page1' }] },
						{ args: [{ type: STORE_PROVIDER_DATA, page: 'page1', data: result }] },
						{ args: [{ type: actions.GET_PROVIDER_DONE, provider: { uri: 'mock.test.provider' }, page: 'page1' }] }
					])
				)
			);
		});
	});
});
