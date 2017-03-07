import Immutable from 'immutable';

const prefix = 'DIALOG.';
export const SET_DIALOG_STATE = prefix + 'SET_STATE';
export function setDialogState(dialogName, data) {
	return {
		type: SET_DIALOG_STATE,
		dialogName,
		data
	};
}

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
