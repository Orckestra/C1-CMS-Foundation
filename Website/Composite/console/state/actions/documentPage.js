const prefix = 'DOCUMENTPAGE.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(field, newValue) {
	return { type: UPDATE_VALUE, field, newValue };
}

export const SAVE_STATE = prefix + 'SAVE_STATE';
export function saveState() {
	return { type: SAVE_STATE };
}
