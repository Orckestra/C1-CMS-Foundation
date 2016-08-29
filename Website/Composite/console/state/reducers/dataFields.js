const prefix = 'DOCUMENTPAGE.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(fieldName, newValue) {
	return { type: UPDATE_VALUE, fieldName, newValue };
}

export const SAVE_STATE = prefix + 'SAVE_STATE';
export function saveState(pageName) {
	return { type: SAVE_STATE, pageName };
}

const initialState = {
	dirtyFields: []
};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.fieldName] = action.newValue;
		if (state.dirtyFields.indexOf(action.fieldName) === -1) {
			update.dirtyFields = state.dirtyFields.concat([action.fieldName]);
		}
		return Object.assign({}, state, update);
	case SAVE_STATE:
		return Object.assign({}, state, { dirtyFields: [] });
	default:
		return state;
	}
}
