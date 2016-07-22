import { UPDATE_VALUE, SAVE_STATE } from '../actions';

const initialState = {};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.field] = action.newValue;
		return Object.assign({}, state, update);
	case SAVE_STATE:
	default:
		return state;
	}
}
