import expect from 'unittest/helpers/expect.js';
import getDefinitionReducer, * as actions from 'console/state/reducers/definitions.js';
import Immutable from 'immutable';

describe('Component definitions', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'STORE_DEF', 'DEFINITIONS.STORE')
	);

	describe('addDefinition', () => {
		let addDefinition, pageDef;
		beforeEach(() => {
			addDefinition = actions.addDefinition;
			pageDef = {
				name: 'testPage',
				type: 'TestComponent',
				fieldsets: [],
				buttons: []
			};
		});

		it('is an action creator', () =>
			expect(addDefinition, 'to be a function')
			.then(() => {
				let action = addDefinition('page', pageDef);
				return expect(action, 'to be an action of type', actions.STORE_DEF)
				.and('to have property', 'defType', 'page')
				.and('to have property', 'definition', pageDef);
			})
		);
	});

	['page', 'tab', 'button', 'fieldset', 'dataField'].forEach(typeName => {
		describe(typeName, () => {
			let reducer;
			beforeEach(() => {
				reducer = getDefinitionReducer(typeName);
			});

			it('outputs an intial state if no action and no previous state', () => {
				let newState = reducer(undefined, {});
				return expect(newState, 'to equal', Immutable.Map());
			});

			it('outputs the same state object if no action', () => {
				let oldState = Immutable.Map({ thing: 'do not touch' });
				let newState = reducer(oldState, {});
				return expect(newState, 'to be', oldState);
			});

			it('updates state when given update action', () => {
				let oldState = Immutable.Map({ thing: 'do not touch' });
				let newState = reducer(oldState, {
					type: actions.STORE_DEF,
					defType: typeName,
					definition: {
						name: 'testEntity'
					}
				});
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					thing: 'do not touch',
					testEntity: {
						name: 'testEntity'
					}
				}));
			});
		});
	});
});
