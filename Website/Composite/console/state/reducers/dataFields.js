const prefix = 'DOCUMENTPAGE.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(fieldName, newValue) {
	return { type: UPDATE_VALUE, fieldName, newValue };
}

export const SAVE_STATE = prefix + 'SAVE_STATE';
export function saveState(pageName) {
	return { type: SAVE_STATE, pageName };
}

const initialState = {};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.fieldName] = action.newValue;
		return Object.assign({}, state, update);
	default:
		return state;
	}
}
