import expect from 'unittest/helpers/expect.js';
import dialog, * as actions from 'console/state/reducers/dialog.js';
import Immutable from 'immutable';

describe('Dialogs', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'SET_DIALOG_STATE')
		);

		describe('Set state', () => {
			let setDialogState = actions.setDialogState;
			it('creates an action to set the state of a dialog', () => {
				let data = { stuff: true, otherStuff: false };
				let action = setDialogState('testdialog', data);
				return expect(action, 'to be an action of type', actions.SET_DIALOG_STATE)
				.and('to have property', 'dialogName', 'testdialog')
				.and('to have property', 'data', data);
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = dialog(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({}));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = dialog(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		describe('set dialog state', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.SET_DIALOG_STATE,
					dialogName: 'testdialog',
					data: { stuff: true, otherStuff: false }
				};
			});

			it('sets the state for a dialog', () => {
				let oldState = Immutable.fromJS({
					unrelated: 'should not be altered'
				});
				let newState = dialog(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					unrelated: 'should not be altered',
					testdialog: { stuff: true, otherStuff: false }
				});
			});
		});
	});
});
