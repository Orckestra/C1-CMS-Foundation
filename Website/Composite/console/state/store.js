import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import dataFields from './reducers/dataFields';
import pages from './reducers/pages';
import ReduxThunk from 'redux-thunk';

const consoleReducers = combineReducers({
	dataFields,
	pages
});

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
	}
	return store;
}
