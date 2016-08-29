import expect from 'unittest/helpers/expect.js';
import dataFields, * as actions from 'console/state/reducers/dataFields.js';

describe('Data fields', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'SAVE_STATE')
			.and('to have property', 'UPDATE_VALUE')
		);

		describe('Save state', () => {
			let saveState = actions.saveState;
			it('creates action for saving state', () => {
				let action = saveState('testpage');
				return expect(action, 'to be an action of type', actions.SAVE_STATE)
					.and('to have property', 'pageName', 'testpage');
			});
		});

		describe('Update field value', () => {
			let updateFieldValue = actions.updateFieldValue;
			it('creates action for updating a field value', () => {
				let action = updateFieldValue('testfield', 'testvalue');
				return expect(action, 'to be an action of type', actions.UPDATE_VALUE)
				.and('to have properties', {
					fieldName: 'testfield',
					newValue: 'testvalue'
				});
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = dataFields(undefined, {});
			return expect(newState, 'to equal', {});
		});

		it('outputs the same state object if no action', () => {
			let oldState = { thing: 'do not touch' };
			let newState = dataFields(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		it('updates state when given update action', () => {
			let oldState = { thing: 'do not touch' };
			let newState = dataFields(oldState, {
				type: actions.UPDATE_VALUE,
				fieldName: 'testfield',
				newValue: 'testvalue'
			});
			return expect(newState, 'not to be', oldState)
			.and('to equal', {
				thing: 'do not touch',
				testfield: 'testvalue'
			});
		});
	});
});
