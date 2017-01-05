import WAMPClient from 'console/access/wampClient.js';
import { normalize } from 'normalizr';
import { pageSchema } from 'console/state/normalizingSchema.js';
import { addDefinition } from 'console/state/reducers/definitions.js';

const prefix = 'PAGE_DEF.';
const loadPageDefActionType = prefix + 'LOAD';
export const LOAD_PAGE_DEF = loadPageDefActionType + '_COMMENCE';
export const LOAD_PAGE_DEF_DONE = loadPageDefActionType + '_DONE';
export const LOAD_PAGE_DEF_FAILED = loadPageDefActionType + '_FAIL';

const pageDefEndpointURI = 'structure.page';

export function loadPageDef(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_PAGE_DEF, name: pageName });
		return WAMPClient.call(pageDefEndpointURI, pageName)
		.then(response => {
			let defs = normalize(response, pageSchema).entities;
			Object.keys(defs).forEach(defType => {
				let defSet = defs[defType];
				let typeName = defType.replace(/Defs$/, '');
				Object.keys(defSet).forEach(defName => {
					dispatch(addDefinition(typeName, defSet[defName]));
				});
			});
			dispatch({ type: LOAD_PAGE_DEF_DONE, name: pageName });
		})
		.catch(err => {
			dispatch({ type: LOAD_PAGE_DEF_FAILED, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}
