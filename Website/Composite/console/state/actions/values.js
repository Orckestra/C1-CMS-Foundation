import requestJSON from 'console/access/requestJSON.js';
import { storeValues, commitPage, flagDirty } from 'console/state/reducers/dataFields.js';

const prefix = 'VALUES.';
export const LOAD_VALUES = prefix + 'LOAD';
export const LOAD_VALUES_DONE = prefix + 'LOAD.DONE';
export const LOAD_VALUES_FAILED = prefix + 'LOAD.FAIL';
export const SAVE_VALUES = prefix + 'SAVE';
export const SAVE_VALUES_DONE = prefix + 'SAVE.DONE';
export const SAVE_VALUES_FAILED = prefix + 'SAVE.FAIL';

const valueEndpointURL = '/Composite/console/values.json'; // Mocked to point at JSON file

export function loadValues(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_VALUES, pageName });
		return requestJSON(valueEndpointURL +
			'?page=' + pageName)
		.then(valueData => {
			dispatch(storeValues(valueData));
			dispatch({ type: LOAD_VALUES_DONE, pageName });
		})
		.catch(err => {
			dispatch({ type: LOAD_VALUES_FAILED, error: err });
		});
	};
}

export function saveValues(pageName) {
	return (dispatch, getState) => {
		dispatch({ type: SAVE_VALUES, pageName });
		let state = getState().dataFields;
		let fieldList = state.dirtyPages[pageName];
		if (!fieldList) {
			dispatch({ type: SAVE_VALUES_FAILED, pageName, error: new Error('No fields to save for ' + pageName)});
			return;
		}
		let body = fieldList.reduce((values, fieldName) => {
			values[fieldName] = state[fieldName];
			return values;
		}, {});
		dispatch(commitPage(pageName));
		return requestJSON(valueEndpointURL, {
			method: 'POST',
			body
		})
		.then(() => {
			dispatch({ type: SAVE_VALUES_DONE, pageName });
		})
		.catch(err => {
			dispatch(flagDirty(pageName, fieldList));
			dispatch({ type: SAVE_VALUES_FAILED, error: err });
		});
	};
}
