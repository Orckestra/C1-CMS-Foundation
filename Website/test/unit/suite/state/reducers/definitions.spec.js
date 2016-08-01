import expect from '../../../helpers/expect';
import getDefinitionReducer from '../../../../../Composite/console/state/reducers/definitions';
import { STORE_DEF } from '../../../../../Composite/console/state/actions/componentDefinitions';

describe('Component definitions', () => {
	['page', 'button', 'fieldset', 'dataField'].forEach(typeName => {
		describe(typeName, () => {
			let reducer;
			beforeEach(() => {
				reducer = getDefinitionReducer(typeName);
			});

			it('outputs an intial state if no action and no previous state', () => {
				let newState = reducer(undefined, {});
				return expect(newState, 'to equal', {});
			});

			it('outputs the same state object if no action', () => {
				let oldState = { thing: 'do not touch' };
				let newState = reducer(oldState, {});
				return expect(newState, 'to be', oldState);
			});

			it('updates state when given update action', () => {
				let oldState = { thing: 'do not touch' };
				let newState = reducer(oldState, {
					type: STORE_DEF,
					defType: typeName,
					definition: {
						name: 'testEntity'
					}
				});
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					testEntity: {
						name: 'testEntity'
					}
				});
			});
		});
	});
});
