const prefix = 'DOCUMENTPAGE.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(fieldName, newValue) {
	return { type: UPDATE_VALUE, fieldName, newValue };
}

export const SAVE_STATE = prefix + 'SAVE_STATE';
export function saveState(pageName) {
	return { type: SAVE_STATE, pageName };
}
