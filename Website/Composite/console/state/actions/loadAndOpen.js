import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { openPage, setPage } from 'console/state/reducers/layout.js';
import { getLogDates } from 'console/state/actions/logs.js';

const loaderActions = {
	getLogDates
};

const optionLoaders = {
	document: (pageName, state, dispatch) => {
		let pageDef = state.getIn(['pageDefs', pageName]);
		// Run through toolbars, load options
		pageDef.get('toolbars').forEach(toolbarName => {
			let toolbarDef = state.getIn(['toolbarDefs', toolbarName]);
			toolbarDef.get('items').forEach(itemName => {
				let itemDef = state.getIn(['itemDefs', itemName]);
				if (itemDef.get('type') === 'select' && itemDef.get('optionLoader')) {
					dispatch(loaderActions[itemDef.get('optionLoader')](itemName));
				}
			});
		});
	}
};

export function loadAndOpenPage(pageName) {
	return (dispatch, getState) => {
		let loadDef = getState().getIn(['pageDefs', pageName]) ?
			Promise.resolve(null) :
			dispatch(loadPageDef(pageName));
		return Promise.all([
			loadDef.then(() => {
				let pageDef = getState().getIn(['pageDefs', pageName]);
				// Load any options specified
				let optionLoader = optionLoaders[pageDef.get('type')];
				if (optionLoader) {
					optionLoader(pageName, getState(), dispatch);
				}
				let tabs = pageDef && pageDef.get('tabs') ?
					pageDef.get('tabs').toArray() :
					[];
				dispatch(openPage(pageName, tabs));
				dispatch(setPage(pageName));
			}),
			dispatch(loadValues(pageName))
		]);
	};
}
