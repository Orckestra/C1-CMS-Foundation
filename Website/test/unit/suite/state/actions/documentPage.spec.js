import expect from '../../../helpers/expect';
import * as actions from 'console/state/actions/documentPage.js';

describe('Document page', () => {
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
