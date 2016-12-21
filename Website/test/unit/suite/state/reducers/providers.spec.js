import expect from 'unittest/helpers/expect.js';
import providers, * as actions from 'console/state/reducers/providers.js';
import Immutable from 'immutable';

describe('Providers', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'STORE_PROVIDER_DATA')
		);

		describe('storeData', () => {
			let storeData = actions.storeData;
			it('creates action for storing a provider\'s data', () => {
				let entries = [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ];
				let action = storeData('test', 'page1', entries);
				return expect(action, 'to be an action of type', actions.STORE_PROVIDER_DATA)
					.and('to have property', 'providerName', 'test')
					.and('to have property', 'page', 'page1')
					.and('to have property', 'data', entries);
			});
		});
	});


	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = providers(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({}));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = providers(oldState, {});
			return expect(newState, 'to be', oldState);
		});
	});

	describe('store data', () => {
		let action;
		beforeEach(() => {
			action = {
				type: actions.STORE_PROVIDER_DATA,
				providerName: 'test',
				page: 'page1',
				data: [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
			};
		});

		it('Adds a new log page', () => {
			let oldState = Immutable.fromJS({
				test: {
					'otherpage': ['no', 'change']
				},
				other: {
					'something': ['no', 'touchy']
				}
			});
			let newState = providers(oldState, action);
			return expect(newState, 'not to be', oldState)
			.and('to equal', Immutable.fromJS({
				test: {
					'otherpage': ['no', 'change'],
					'page1': [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
				},
				other: {
					'something': ['no', 'touchy']
				}
			}));
		});
	});
});
