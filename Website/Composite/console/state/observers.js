import observer from 'redux-observer';
import Immutable from 'immutable';

const pathSubscriptions = new Map();

export function subscribe(path, handler) {
	if (!pathSubscriptions.get(path)) {
		pathSubscriptions.set(path, []);
	}
	pathSubscriptions.get(path).push(handler);
}

export function unsubscribe(path, handler) {
	if (pathSubscriptions.get(path)) {
		let handlers = pathSubscriptions.get(path);
		let handlerIndex = handlers.indexOf(handler);
		if (handlerIndex != -1) {
			handlers.splice(handlerIndex, 1);
		}
	}
}

export function stateChange(newState, oldState) {
	return [...pathSubscriptions].map(([path, handlers]) => {
		if (!Immutable.is(newState.getIn(path), oldState.getIn(path))) {
			return Promise.all(handlers.map(handler => new Promise(handler)));
		}
	});
}

export default observer(stateChange, { compareWith: Immutable.is });
