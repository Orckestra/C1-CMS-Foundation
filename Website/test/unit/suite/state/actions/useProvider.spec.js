import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import WAMPClient from 'console/access/wampClient.js';
import * as actions from 'console/state/actions/useProvider.js';
const useProvider = actions.useProvider;
import actionLocator from 'console/state/actionLocator.js';

describe('Provider activities', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'USE_PROVIDER')
			.and('to have property', 'USE_PROVIDER_DONE')
			.and('to have property', 'USE_PROVIDER_FAILED')
	);

	describe('useProvider', () => {
		let dispatch, provider, caller;
		beforeEach(()=> {
			dispatch = sinon.spy().named('dispatch');
			caller = 'testCaller';
		});

		describe('Local', () => {
			beforeEach(() => {
				provider = {
					action: 'testAction'
				};
				actionLocator.register('testAction', function (caller, data) {
					return {
						type: 'TEST',
						caller,
						data
					};
				});
			});

			describe('without data', () => {
				it('dispatches the provider\'s action without data attached', () =>
					expect(useProvider(provider, caller), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect(dispatch, 'to have calls satisfying', [
							{ args: [
								expect.it('to be an action of type', 'TEST')
								.and('to have property', 'caller', caller)
								.and('not to have property', 'data')
							] }
						])
					)
				);
			});

			describe('with data', () => {
				let data;
				beforeEach(() => {
					provider.sendData = true;
					data = {
						test: 'this is test data'
					};
				});

				it('dispatches the provider\'s action with data attached', () =>
					expect(useProvider(provider, caller, data), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect(dispatch, 'to have calls satisfying', [
							{ args: [expect.it('to be an action of type', 'TEST')
							.and('to have property', 'caller', caller)
							.and('to have property', 'data', data)] }
						])
					)
				);
			});
		});

		describe('Remote', () => {
			let wampCall;
			beforeEach(() => {
				wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
				WAMPClient.setMock(wampCall);
			});
			afterEach(() => {
				WAMPClient.reset();
			});

			it('throws error on unknown protocol', () => {
				provider = {
					protocol: 'wat?'
				};
				return expect(useProvider(provider, caller), 'to be a function')
				.and('when called with', [dispatch])
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller }] },
						{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller, message: 'Unknown protocol: wat?' }] }
					])
				);
			});

			describe('Signal', () => {
				beforeEach(() => {
					provider = {
						protocol: 'wamp',
						uri: 'test.signal'
					};
					wampCall.withArgs(provider.uri, 'failCaller').returns(Promise.reject(new Error('test error')));
					wampCall.withArgs(provider.uri, caller).returns(Promise.resolve());
				});

				it('makes a remote call, without further actions or data sent', () =>
					expect(useProvider(provider, caller), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						Promise.all([
							expect(dispatch, 'to have calls satisfying', [
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER)
									.and('to have property', 'caller', caller)
									.and('not to have property', 'data')
								] },
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER_DONE)
									.and('to have property', 'caller', caller)
									.and('not to have property', 'data')
								] }
							]),
							expect(wampCall, 'to have calls satisfying', [
								{ args: [provider.uri, caller] }
							]),
						])
					)
				);

				it('sends word of unhandled errors', () =>
					expect(useProvider(provider, 'failCaller'), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Save', () => {
				let inData;
				beforeEach(() => {
					provider = {
						protocol: 'wamp',
						uri: 'test.save',
						sendData: true
					};
					inData = {
						test: 'this is saved data'
					};
					wampCall.withArgs(provider.uri, 'failCaller').returns(Promise.reject(new Error('test error')));
					wampCall.withArgs(provider.uri, caller, inData).returns(Promise.resolve());
				});

				it('makes a remote call, with data sent', () =>
					expect(useProvider(provider, caller, inData), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						Promise.all([
							expect(dispatch, 'to have calls satisfying', [
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER)
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', inData)
								] },
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER_DONE)
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', inData)
								] }
							]),
							expect(wampCall, 'to have calls satisfying', [
								{ args: [provider.uri, caller, inData] }
							]),
						])
					)
				);

				it('sends word of unhandled errors', () =>
					expect(useProvider(provider, 'failCaller', inData), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Fetch', () => {
				let outData;
				beforeEach(() => {
					actionLocator.register('testAction', function (caller, data) {
						return {
							type: 'TEST',
							caller,
							data
						};
					});
					provider = {
						action: 'testAction',
						protocol: 'wamp',
						uri: 'test.fetch'
					};
					outData = {
						test: 'this is fetched data'
					};
					wampCall.withArgs(provider.uri, 'failCaller').returns(Promise.reject(new Error('test error')));
					wampCall.withArgs(provider.uri, caller).returns(Promise.resolve(outData));
				});

				it('makes a remote call, with action', () =>
					expect(useProvider(provider, caller), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						Promise.all([
							expect(dispatch, 'to have calls satisfying', [
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER)
									.and('to have property', 'caller', caller)
									.and('not to have property', 'data')
								] },
								{ args: [
									expect.it('to be an action of type', 'TEST')
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', outData)
								] },
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER_DONE)
									.and('to have property', 'caller', caller)
									.and('not to have property', 'data')
								] }
							]),
							expect(wampCall, 'to have calls satisfying', [
								{ args: [provider.uri, caller] }
							]),
						])
					)
				);

				it('sends word of unhandled errors', () =>
					expect(useProvider(provider, 'failCaller'), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Post', () => {
				let inData, outData;
				beforeEach(() => {
					actionLocator.register('testAction', function (caller, data) {
						return {
							type: 'TEST',
							caller,
							data
						};
					});
					provider = {
						action: 'testAction',
						protocol: 'wamp',
						uri: 'test.post',
						sendData: true
					};
					inData = {
						test: 'this is sent data'
					};
					outData = {
						test: 'this is fetched data'
					};
					wampCall.withArgs(provider.uri, 'failCaller').returns(Promise.reject(new Error('test error')));
					wampCall.withArgs(provider.uri, caller, inData).returns(Promise.resolve(outData));
				});

				it('makes a remote call, with data sent', () =>
					expect(useProvider(provider, caller, inData), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						Promise.all([
							expect(dispatch, 'to have calls satisfying', [
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER)
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', inData)
								] },
								{ args: [
									expect.it('to be an action of type', 'TEST')
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', outData)
								] },
								{ args: [
									expect.it('to be an action of type', actions.USE_PROVIDER_DONE)
									.and('to have property', 'caller', caller)
									.and('to have property', 'data', inData)
								] }
							]),
							expect(wampCall, 'to have calls satisfying', [
								{ args: [provider.uri, caller, inData] }
							]),
						])
					)
				);

				it('sends word of unhandled errors', () =>
					expect(useProvider(provider, 'failCaller', inData), 'to be a function')
					.and('when called with', [dispatch])
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});
		});
	});
});
