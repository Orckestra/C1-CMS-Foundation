/*
* action types
*/
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const SAVE_STATE = 'SAVE_STATE';

/*
* action creators
*/
export function updateFieldValue(field, newValue) {
	return { type: UPDATE_VALUE, field, newValue };
}
export function saveState() {
	return { type: SAVE_STATE };
}
