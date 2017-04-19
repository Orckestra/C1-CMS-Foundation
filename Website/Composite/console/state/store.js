import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import layout from 'console/state/reducers/layout.js';
import dataFields from 'console/state/reducers/dataFields.js';
import activity from 'console/state/reducers/activity.js';
import options from 'console/state/reducers/options.js';
import logs from 'console/state/reducers/logs.js';
import providers from 'console/state/reducers/providers.js';
import dialogData from 'console/state/reducers/dialog.js';
import getDefinitionReducer from 'console/state/reducers/definitions.js';
import thunk from 'redux-thunk';
import observers from 'console/state/observers.js';
import initState from 'console/state/initState.js';
import Immutable from 'immutable';

let reducers = {
	activity,
	layout,
	dataFields,
	options,
	logs,
	providers,
	dialogData
};
[
	'page',
	'tab',
	'item',
	'toolbar',
	'fieldset',
	'dataField',
	'dialog',
	'dialogPane',
	'provider'
].forEach(typeName => {
	reducers[typeName + 'Defs'] = getDefinitionReducer(typeName);
});

const consoleReducers = combineReducers(reducers);

const hotStore = getHotReloadStore('console:store');

export default function configureStore(initialState) {
	let store = hotStore.prevStore;
	if (store && store.replaceReducer) {
		store.replaceReducer(consoleReducers);
	} else {
		store = createStore(consoleReducers, Immutable.fromJS(initialState), compose(
			applyMiddleware(thunk),
			applyMiddleware(observers),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		));
		hotStore.prevStore = store;
		initState(store);
	}
	return store;
}
