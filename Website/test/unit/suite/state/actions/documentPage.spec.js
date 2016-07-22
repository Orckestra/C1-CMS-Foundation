import expect from '../../../helpers/expect';
import * as actions from '../../../../../Composite/console/state/actions/documentPage';

describe('Document page actions', () => {
	it('has action descriptors', () =>
		Promise.all([
			expect(actions, 'to have property', 'SAVE_STATE'),
			expect(actions, 'to have property', 'UPDATE_VALUE')
		])
	);

	describe('Save state', () => {
		let saveState = actions.saveState;
		it('creates action for saving state', () => {
			let action = saveState('testpage');
			return Promise.all([
				expect(action, 'to be an action of type', actions.SAVE_STATE),
				expect(action, 'to have property', 'pageName', 'testpage')
			]);
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
