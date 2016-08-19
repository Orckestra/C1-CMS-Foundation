import { UPDATE_VALUE } from 'console/state/actions/documentPage.js';

const initialState = {};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.fieldName] = action.newValue;
		return Object.assign({}, state, update);
	default:
		return state;
	}
}
