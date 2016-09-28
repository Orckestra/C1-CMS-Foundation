import requestJSON from 'console/access/requestJSON.js';
import { normalize } from 'normalizr';
import schema from 'console/state/normalizingSchema.js';
import { addDefinition } from 'console/state/reducers/definitions.js';

const prefix = 'PAGE_DEF.';
export const LOAD_PAGE_DEF = prefix + 'LOAD';
export const LOAD_PAGE_DEF_DONE = prefix + 'LOAD.DONE';
export const LOAD_PAGE_DEF_FAILED = prefix + 'LOAD.FAIL';

const pageDefEndpointURL = '/Composite/console/pageData.json';

// Better input: Page identity/-ies (perspective, parentage, page name - path object of some kind?)
export function loadPageDef(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_PAGE_DEF, name: pageName });
		return requestJSON(pageDefEndpointURL)
		.then(response => {
			let defs = normalize(response, schema).entities;
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
			console.error(err); // eslint-disable-line no-console
		});
	};
}
