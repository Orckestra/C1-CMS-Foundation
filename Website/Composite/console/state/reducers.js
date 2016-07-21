import { combineReducers } from 'redux';
import { UPDATE_VALUE, SAVE_STATE } from './actions';

let initialState = {
	dataFields: {}
};

function dataFields(state = initialState.dataFields, action) {
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

const consoleReducers = combineReducers({
	dataFields
});

export default consoleReducers;
