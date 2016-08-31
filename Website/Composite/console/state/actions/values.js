import requestJSON from 'console/access/requestJSON.js';
import { storeValues } from 'console/state/reducers/dataFields.js';

const prefix = 'VALUES.';
export const LOAD_VALUES = prefix + 'LOAD';
export const LOAD_VALUES_DONE = prefix + 'LOAD.DONE';
export const LOAD_VALUES_FAILED = prefix + 'LOAD.FAIL';

export function loadValues(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_VALUES, pageName });
		return requestJSON('/Composite/console/values.json' +
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
