/**
A provider is, at its root, a JS object with a set of information that allows a
specific set of actions to be taken. The `useProvider` thunk creator will take
such a provider, and perform the actions involved. This test suite demonstrates
the functionality.
*/
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
			/**
				A provider without a protocol will be handled locally. This can be used
				to dispatch actions without contacting the server. Actions named here
				should be available in the action locator by that name.
			*/
			beforeEach(() => {
				provider = {
					callAction: 'testAction'
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
				/**
					A local provider with the `sendData` flag set will use the data it was
					given when calling the action dispatcher as data for the action.
				*/
				let data;
				beforeEach(() => {
					provider.sendData = true;
					data = {
						test: 'this is test data'
					};
				});

				it('dispatches the provider\'s action with data attached', () =>
					expect(useProvider(provider, caller, data), 'to be a function')
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
				.and('when called with', [dispatch], 'to be a', 'Promise')
				.then(() =>
					expect([dispatch], 'to have calls satisfying', [
						{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller }] },
						{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller, message: 'Unknown protocol: wat?' }] }
					])
				);
			});

			describe('Signal', () => {
				/**
					If you neither send data to an RPC nor expect data back from it, it's
					considered a signal. While supported, consider whether reworking these
					into PubSub topics is feasible.
				*/
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Save', () => {
				/**
					Providers that have a remote access protocol and the `sendData`flag
					are considered saves. They will send data to the server.
				*/
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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

				it('when requested sends only data, not caller', () => {
					provider.sendNoCaller = true;
					wampCall.withArgs(provider.uri, inData).returns(Promise.resolve());
					return expect(useProvider(provider, caller, inData), 'to be a function')
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
								{ args: [provider.uri, inData] }
							]),
						])
					);
				});

				it('sends word of unhandled errors', () =>
					expect(useProvider(provider, 'failCaller', inData), 'to be a function')
					.and('when called with', [dispatch], 'to be a', 'Promise')
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Fetch', () => {
				/**
					Providers with remote access and an action to be called will access
					the indicated RPC, and use the response data to feed the action
					creator they found in the action locator.
				*/
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
						callAction: 'testAction',
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
					.then(() =>
						expect([dispatch], 'to have calls satisfying', [
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER,  provider, caller: 'failCaller' }] },
							{ spy: dispatch, args: [{ type: actions.USE_PROVIDER_FAILED, provider, caller: 'failCaller', message: 'test error' }] }
						])
					)
				);
			});

			describe('Post', () => {
				/**
					Post is a combination save and fetch. The accessed RPC expects to be
					sent data, and provides back data in return. A search function is an
					example. The signature of such a provider is having a remote protocol,
					the `sendData`flag, and an action to call with the resulting response.
				*/
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
						callAction: 'testAction',
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
					.and('when called with', [dispatch], 'to be a', 'Promise')
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
