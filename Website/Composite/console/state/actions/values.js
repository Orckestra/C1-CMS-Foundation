import WAMPClient from 'console/access/wampClient.js';
import { storeValues, commitPage } from 'console/state/reducers/dataFields.js';
import Immutable from 'immutable';

const prefix = 'VALUES.';
export const LOAD_VALUES = prefix + 'LOAD';
export const LOAD_VALUES_DONE = prefix + 'LOAD.DONE';
export const LOAD_VALUES_FAILED = prefix + 'LOAD.FAIL';
export const SAVE_VALUES = prefix + 'SAVE';
export const SAVE_VALUES_DONE = prefix + 'SAVE.DONE';
export const SAVE_VALUES_FAILED = prefix + 'SAVE.FAIL';

const valueEndpointURI = 'mock.data.values';
const valueLoadEndpointURI = valueEndpointURI + '.load';
const valueSaveEndpointURI = valueEndpointURI + '.save';

export function loadValues(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_VALUES, pageName });
		return WAMPClient.call(valueLoadEndpointURI, pageName)
		.then(valueData => {
			dispatch(storeValues(pageName, valueData));
			dispatch({ type: LOAD_VALUES_DONE, pageName });
		})
		.catch(err => {
			dispatch({ type: LOAD_VALUES_FAILED, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}

export function saveValues(pageName) {
	return (dispatch, getState) => {
		dispatch({ type: SAVE_VALUES, pageName });
		let state = getState().get('dataFields');
		let fieldValues = state.get(pageName);
		let committedFieldList = state.getIn(['committedPages', pageName]);
		if (Immutable.is(fieldValues, committedFieldList)) {
			dispatch({ type: SAVE_VALUES_FAILED, pageName, message: 'Page ' + pageName + ' is unchanged'});
			return;
		}
		let values = fieldValues.toJS();
		return WAMPClient.call(valueSaveEndpointURI, pageName, values)
		.then(() => {
			dispatch(commitPage(pageName));
			dispatch({ type: SAVE_VALUES_DONE, pageName });
		})
		.catch(err => {
			dispatch({ type: SAVE_VALUES_FAILED, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}
