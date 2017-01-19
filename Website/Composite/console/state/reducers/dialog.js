import Immutable from 'immutable';
import actionLocator from 'console/state/actionLocator.js';

const prefix = 'DIALOG.';
export const SET_DIALOG_STATE = prefix + 'SET_STATE';
export function setDialogState(dialogName, data) {
	return {
		type: SET_DIALOG_STATE,
		dialogName,
		data
	};
}
actionLocator.register('setDialogState', setDialogState);

const initialState = Immutable.Map();

function dialog(state = initialState, action) {
	switch(action.type) {
	case SET_DIALOG_STATE:
		return state.set(action.dialogName, action.data);
	default:
		return state;
	}
}

export default dialog;
