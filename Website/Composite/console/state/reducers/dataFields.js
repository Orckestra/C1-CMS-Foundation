import { UPDATE_VALUE, SAVE_STATE } from '../actions/documentPage.js';

const initialState = {};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.fieldName] = action.newValue;
		return Object.assign({}, state, update);
	case SAVE_STATE: // Async, will save state.
	default:
		return state;
	}
}
