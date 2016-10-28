import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { openPage, setPage } from 'console/state/reducers/layout.js';

export function loadAndOpenPage(pageName) {
	return (dispatch, getState) => {
		let loadDef = getState().getIn(['pageDefs', pageName]) ?
			Promise.resolve(null) :
			dispatch(loadPageDef(pageName));
		return Promise.all([
			loadDef.then(() => {
				let page = getState().getIn(['pageDefs', pageName]);
				let tabs = page && page.get('tabs') ?
					page.get('tabs').toArray() :
					[];
				dispatch(openPage(pageName, tabs));
				dispatch(setPage(pageName));
			}),
			// Load any options specified
			dispatch(loadValues(pageName))
		]);
	};
}
