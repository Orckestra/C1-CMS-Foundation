import requestJSON from '../../access/requestJSON';

const prefix = 'PAGE_DEF.';
export const GET_PAGE_DEF = prefix + 'GET';
export const GET_PAGE_DEF_DONE = prefix + 'GET.DONE';
export const GET_PAGE_DEF_FAILED = prefix + 'GET.FAIL';

// Better input: Page identity/-ies (perspective, parentage, page name - path object of some kind?)
export function getPageDef(pageName) {
	return dispatch => {
		dispatch({ type: GET_PAGE_DEF, name: pageName });
		return requestJSON('/Composite/console/pageData.json')
		.then(response => {
			dispatch({ type: GET_PAGE_DEF_DONE, name: pageName });
			return response;
		});
		// Transform page type into component function, normalize data, insert into state
	};
}
