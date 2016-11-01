import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import layout from 'console/state/reducers/layout.js';
import dataFields from 'console/state/reducers/dataFields.js';
import pages from 'console/state/reducers/pages.js';
import options from 'console/state/reducers/options.js';
import logs from 'console/state/reducers/logs.js';
import getDefinitionReducer from 'console/state/reducers/definitions.js';
import thunk from 'redux-thunk';
import socket from 'console/access/socket.js';
import observers from 'console/state/observers.js';
import initState from 'console/state/initState.js';
import Immutable from 'immutable';

let reducers = {
	layout,
	dataFields,
	pages,
	options,
	logs
};
['page', 'tab', 'item', 'toolbar', 'fieldset', 'dataField'].forEach(typeName => {
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
			applyMiddleware(thunk.withExtraArgument(socket)),
			applyMiddleware(observers),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		));
		hotStore.prevStore = store;
		socket.subscribe(store);
		initState(store);
	}
	return store;
}
