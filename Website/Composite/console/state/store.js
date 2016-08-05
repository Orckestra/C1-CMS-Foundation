import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import dataFields from './reducers/dataFields.js';
import pages from './reducers/pages.js';
import getDefinitionReducer from './reducers/definitions.js';
import ReduxThunk from 'redux-thunk';
import initState from './initState.js';

let reducers = {
	dataFields,
	pages
};
['page', 'button', 'fieldset', 'dataField'].forEach(typeName => {
	reducers[typeName + 'Defs'] = getDefinitionReducer(typeName);
});

const consoleReducers = combineReducers(reducers);

const hotStore = getHotReloadStore('console:store');

export default function configureStore(initialState) {
	let store = hotStore.prevStore;
	if (store && store.replaceReducer) {
		store.replaceReducer(consoleReducers);
	} else {
		store = createStore(consoleReducers, initialState, compose(
			applyMiddleware(ReduxThunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		));
		hotStore.prevStore = store;
		initState(store);
	}
	return store;
}
