import WAMPClient from 'console/access/wampClient.js';
import { addDefinition } from 'console/state/reducers/definitions.js';

const prefix = 'PERSPECTIVES.';
const loadPageDefActionType = prefix + 'LOAD';
export const LOAD_PERSPECTIVES = loadPageDefActionType + '_COMMENCE';
export const LOAD_PERSPECTIVES_DONE = loadPageDefActionType + '_DONE';
export const LOAD_PERSPECTIVES_FAILED = loadPageDefActionType + '_FAIL';

const perspectivesURI = 'mock.struct.perspectives';

export function loadPerspectives() {
	return dispatch => {
		dispatch({ type: LOAD_PERSPECTIVES });
		return WAMPClient.call(perspectivesURI)
		.then(response => {
			response.forEach(def => dispatch(addDefinition('perspective', def)));
			dispatch({ type: LOAD_PERSPECTIVES_DONE });
		})
		.catch(err => {
			dispatch({ type: LOAD_PERSPECTIVES_FAILED, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}
