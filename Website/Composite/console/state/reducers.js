import { combineReducers } from 'redux'
import { UPDATE_VALUE, SAVE_STATE } from './actions';

let initialState = {
	dataFields: {}
}

function dataFields(state = initialState.dataFields, action) {
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
	dataFields
});

export default consoleReducers;
