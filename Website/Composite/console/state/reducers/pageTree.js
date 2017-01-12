import Immutable from 'immutable';

const prefix = 'PAGE_TREE.';
export const SET_NODE = prefix + 'SET_NODE';
export function setNode(name, node) {
	if (typeof node === 'object') {
		return {
			type: SET_NODE,
			name,
			node
		};
	} else {
		return {};
	}
}

export const OPEN_NODE = prefix + 'OPEN_NODE';
export function openNode(name) {
	return {
		type: OPEN_NODE,
		name
	};
}

export const CLOSE_NODE = prefix + 'CLOSE_NODE';
export function closeNode(name) {
	return {
		type: CLOSE_NODE,
		name
	};
}

const initialState = Immutable.Map({});

export default function pageTree(state = initialState, action) {
	switch (action.type) {
	case SET_NODE:
		return state.set(action.name, Immutable.fromJS(action.node));
	case OPEN_NODE:
		if (state.get(action.name)) {
			return state.setIn([action.name, 'open'], true);
		} else {
			return state;
		}
	case CLOSE_NODE:
		if (state.get(action.name)) {
			return state.setIn([action.name, 'open'], false);
		} else {
			return state;
		}
	default:
		return state;
	}
}
