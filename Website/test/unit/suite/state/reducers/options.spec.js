import expect from 'unittest/helpers/expect.js';
import options, * as actions from 'console/state/reducers/options.js';
import Immutable from 'immutable';

describe('Options', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let state = options(undefined, {});
		return expect(state, 'to equal', Immutable.fromJS({ values: {}, lists: {} }));
	});

	it('outputs the same state object if no action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = options(oldState, {});
		return expect(newState, 'to be', oldState);
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'SET_OPTION', 'OPTIONS.SET')
		.and('to have property', 'STORE_OPTION_LIST', 'OPTIONS.STORE_LIST')
	);

	describe('Set option', () => {
		let setOption = actions.setOption;

		it('creates action for setting an option value', () => {
			let action = setOption('testopt', 'a value');
			return expect(action, 'to be an action of type', actions.SET_OPTION)
			.and('to have property', 'name', 'testopt')
			.and('to have property', 'value', 'a value');
		});
	});

	describe('Store option list', () => {
		let storeOptions = actions.storeOptions;

		it('creates action for storing an option set', () => {
			let action = storeOptions('fieldName', ['one', 'two', 'three']);
			return expect(action, 'to be an action of type', actions.STORE_OPTION_LIST)
			.and('to have property', 'field', 'fieldName')
			.and('to have property', 'options', ['one', 'two', 'three']);
		});
	});

	describe('Action responses', () => {
		let oldState;
		beforeEach(() => {
			oldState = Immutable.fromJS({
				values: {
					thing: 'do not touch'
				},
				lists: {
					unused: [{ value: 'test', label: 'Do not show' }]
				}
			});
		});

		describe('Set option', () => {
			it('sets anew the value of the given option field', () => {
				let newState = options(oldState, { type: actions.SET_OPTION, name: 'test1', value: 'was set' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					values: {
						thing: 'do not touch',
						test1: 'was set'
					}
				});
			});

			it('overwrites the value of the given option field', () => {
				oldState.test1 = 'old';
				let newState = options(oldState, { type: actions.SET_OPTION, name: 'test1', value: 'was set' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					values: {
						thing: 'do not touch',
						test1: 'was set'
					}
				});
			});
		});

		describe('Store option list', () => {
			it('stores a list of options according to the field name', () => {
				let newState = options(oldState, {
					type: actions.STORE_OPTION_LIST,
					field: 'testField',
					options: [{value: 'opt1', label: 'Option 1'}, {value: 'opt2', label: 'Option 2'}]
				});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					lists: {
						testField: [{value: 'opt1', label: 'Option 1'}, {value: 'opt2', label: 'Option 2'}],
						unused: [{ value: 'test', label: 'Do not show' }]
					}
				});
			});
		});
	});
});
