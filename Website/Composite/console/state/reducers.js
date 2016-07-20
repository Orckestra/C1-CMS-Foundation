import { combineReducers } from 'redux'
import { UPDATE_VALUE, SAVE_STATE } from './actions';

let initialState = {
	fields: {}
}

function fields(state = initialState.fields, action) {
	switch (action.type) {
		case UPDATE_VALUE:
			let update = {};
			update[action.field] = action.newValue;
			return Object.assign({}, state, update);
		case SAVE_STATE:
		default:
			return state;
	}
}

const consoleReducers = combineReducers({
	fields
});

export default consoleReducers;
