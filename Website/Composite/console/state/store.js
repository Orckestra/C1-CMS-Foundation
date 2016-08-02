import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import dataFields from './reducers/dataFields';
import pages from './reducers/pages';
import getDefinitionReducer from './reducers/definitions';
import ReduxThunk from 'redux-thunk';
import initState from './initState';

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
			window.devToolsExtension && window.devToolsExtension()
		));
		hotStore.prevStore = store;
		initState(store);
	}
	return store;
}
