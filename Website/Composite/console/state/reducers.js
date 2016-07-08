import { combineReducers } from 'redux'
import { UPDATE_VALUE } from './actions';

let initialState = {
	fieldsets: {}
}

function fieldsets(state = initialState.fieldsets, action) {
	switch (action.type) {
		case UPDATE_VALUE:
			let update = {};
			update[action.fieldset] = {};
			update[action.fieldset][action.field] = action.newValue;
			return Object.assign({}, state, update);
		default:
			return state;
	}
}

const consoleReducers = combineReducers({
	fieldsets
});
export default consoleReducers;
