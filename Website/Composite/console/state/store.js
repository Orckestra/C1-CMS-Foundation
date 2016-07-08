import getHotReloadStore from 'systemjs-hot-reloader-store';
import { createStore } from 'redux'
import consoleReducers from './reducers'

const hotStore = getHotReloadStore('console:store');

export default function configureStore(initialState) {
	let store = hotStore.prevStore;
	if (store && store.replaceReducer) {
		store.replaceReducer(consoleReducers);
	} else {
		store = createStore(consoleReducers, initialState);
		hotStore.prevStore = store;
	}
	return store;
}
