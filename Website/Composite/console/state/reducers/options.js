const prefix = 'OPTIONS.';

export const SET_OPTION = prefix + 'SET';
export function setOption(name, value) {
	return { type: SET_OPTION, name, value };
}

export const STORE_OPTION_LIST = prefix + 'STORE_LIST';
export function storeOptions(field, options) {
	return { type: STORE_OPTION_LIST, field, options };
}

const initialState = {
	values: {},
	lists: {}
};

const options = (state = initialState, action) => {
	let update;
	switch (action.type) {
	case SET_OPTION:
		update = { values: Object.assign({}, state.values)};
		update.values[action.name] = action.value;
		return Object.assign({}, state, update);
	case STORE_OPTION_LIST:
		update = { lists: Object.assign({}, state.lists) };
		update.lists[action.field] = action.options;
		return Object.assign({}, state, update);
	default:
		return state;
	}
};

export default options;
