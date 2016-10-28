import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { openPage, setPage } from 'console/state/reducers/layout.js';
import { getLogDates, getLogPage } from 'console/state/actions/logs.js';

const actionList = {
	getLogDates,
	getLogPage
};

const pageLoaders = {
	document: (pageName, state, dispatch) => {
		let pageDef = state.getIn(['pageDefs', pageName]);
		// Run through toolbars, load options
		let loading = [];
		pageDef.get('toolbars').forEach(toolbarName => {
			let toolbarDef = state.getIn(['toolbarDefs', toolbarName]);
			toolbarDef.get('items').forEach(itemName => {
				let itemDef = state.getIn(['itemDefs', itemName]);
				if (itemDef.get('type') === 'select' && itemDef.get('optionLoader')) {
					loading.push(dispatch(actionList[itemDef.get('optionLoader')](itemName)));
				}
			});
		});
		return Promise.all(loading);
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
				let tabs = pageDef && pageDef.get('tabs') ?
					pageDef.get('tabs').toArray() :
					[];
				let loading = [];
				dispatch(openPage(pageName, tabs));
				dispatch(setPage(pageName));
				let loader = pageLoaders[pageDef.get('type')];
				if (loader) {
					loading.push(loader(pageName, getState(), dispatch));
				}
				return Promise.all(loading)
				.then(() => Promise.all(tabs.map(tabName =>
					dispatch(loadTabValues(tabName))
				)));
			}),
			dispatch(loadValues(pageName))
		]);
	};
}

const tabLoaders = {
	log: (tabName, state, dispatch) => {
		let dateSelectorName = state.getIn(['tabDefs', tabName, 'logPageName']);
		let date = state.getIn(['options', 'values', dateSelectorName]) ||
			state.getIn(['options', 'lists', dateSelectorName, 0]);
		return dispatch(actionList['getLogPage'](tabName, date));
	}
};

export function loadTabValues(tabName) {
	return (dispatch, getState) => {
		let tabDef = getState().getIn(['tabDefs', tabName]);
		let loader = tabLoaders[tabDef.get('type')];
		if (loader) {
			return loader(tabName, getState(), dispatch);
		}
	};
}
