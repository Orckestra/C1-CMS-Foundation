import Immutable from 'immutable';

const prefix = 'OPTIONS.';

export const SET_OPTION = prefix + 'SET';
export function setOption(name, value) {
	return { type: SET_OPTION, name, value };
}

export const STORE_OPTION_LIST = prefix + 'STORE_LIST';
export function storeOptions(field, options) {
	return { type: STORE_OPTION_LIST, field, options };
}

const initialState = Immutable.Map({
	values: Immutable.Map(),
	lists: Immutable.Map()
});

const options = (state = initialState, action) => {
	switch (action.type) {
	case SET_OPTION:
		return state.setIn(['values', action.name], action.value);
	case STORE_OPTION_LIST:
		return state.setIn(['lists', action.field], Immutable.fromJS(action.options));
	default:
		return state;
	}
};

export default options;
