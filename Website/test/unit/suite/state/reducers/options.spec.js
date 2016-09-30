import expect from 'unittest/helpers/expect.js';
import options, * as actions from 'console/state/reducers/options.js';

describe('Options', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let state = options(undefined, {});
		return expect(state, 'to equal', {});
	});

	it('outputs the same state object if no action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = options(oldState, {});
		return expect(newState, 'to be', oldState);
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'SET_OPTION', 'OPTIONS.SET')
	);

	describe('Set option', () => {
		let setOption = actions.setOption;

		it('creates action for selecting a page', () => {
			let action = setOption('testopt', 'a value');
			return expect(action, 'to be an action of type', actions.SET_OPTION)
			.and('to have property', 'name', 'testopt')
			.and('to have property', 'value', 'a value');
		});
	});

	describe('Action responses', () => {
		let oldState;
		beforeEach(() => {
			oldState = {
				thing: 'do not touch'
			};
		});

		describe('Set option', () => {
			it('sets anew the value of the given option field', () => {
				let newState = options(oldState, { type: actions.SET_OPTION, name: 'test1', value: 'was set' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					test1: 'was set'
				});
			});

			it('overwrites the value of the given option field', () => {
				oldState.test1 = 'old';
				let newState = options(oldState, { type: actions.SET_OPTION, name: 'test1', value: 'was set' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					test1: 'was set'
				});
			});
		});
	});
});
