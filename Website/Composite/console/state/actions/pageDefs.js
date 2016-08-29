import requestJSON from 'console/access/requestJSON.js';
import { normalize, Schema, arrayOf } from 'normalizr';
import { addDefinition } from 'console/state/reducers/definitions.js';

const dataFieldSchema = new Schema('dataFieldDefs', { idAttribute: 'name' });
const fieldsetSchema = new Schema('fieldsetDefs', { idAttribute: 'name' });
fieldsetSchema.define({
	fields: arrayOf(dataFieldSchema)
});
const buttonSchema = new Schema('buttonDefs', { idAttribute: 'name' });
const pageSchema = new Schema('pageDefs', { idAttribute: 'name' });
pageSchema.define({
	fieldsets: arrayOf(fieldsetSchema),
	buttons: arrayOf(buttonSchema)
});

const prefix = 'PAGE_DEF.';
export const LOAD_PAGE_DEF = prefix + 'LOAD';
export const LOAD_PAGE_DEF_DONE = prefix + 'LOAD.DONE';
export const LOAD_PAGE_DEF_FAILED = prefix + 'LOAD.FAIL';

// Better input: Page identity/-ies (perspective, parentage, page name - path object of some kind?)
export function loadPageDef(pageName) {
	return dispatch => {
		dispatch({ type: LOAD_PAGE_DEF, name: pageName });
		return requestJSON('/Composite/console/pageData.json')
		.then(response => {
			let defs = normalize(response, arrayOf(pageSchema)).entities;
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
			dispatch({ type: LOAD_PAGE_DEF_FAILED, error: err });
		});
	};
}
