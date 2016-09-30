const prefix = 'OPTIONS.';

export const SET_OPTION = prefix + 'SET';
export function setOption(name, value) {
	return { type: SET_OPTION, name, value };
}

const initialState = {};

const options = (state = initialState, action) => {
	let update;
	switch (action.type) {
	case SET_OPTION:
		update = {};
		update[action.name] = action.value;
		return Object.assign({}, state, update);
	default:
		return state;
	}
};

export default options;
