const prefix = 'DOCUMENTPAGE.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(pageName, fieldName, newValue) {
	return { type: UPDATE_VALUE, pageName, fieldName, newValue };
}

export const SAVE_STATE = prefix + 'SAVE_STATE';
export function saveState(pageName) {
	// Dispatch an action saving the key/value pairs of the page's dirty fields?
	return { type: SAVE_STATE, pageName };
}

export const STORE_VALUES = prefix + 'STORE_VALUES';
export function storeValues(values) {
	return {type: STORE_VALUES, values };
}

const initialState = {
	dirtyPages: {}
};

export default function dataFields(state = initialState, action) {
	let update;
	switch (action.type) {
	case UPDATE_VALUE:
		update = {};
		update[action.fieldName] = action.newValue;
		update.dirtyPages = Object.assign({}, state.dirtyPages);
		if (state.dirtyPages[action.pageName]) {
			update.dirtyPages[action.pageName] = [].concat(state.dirtyPages[action.pageName]);
			if (update.dirtyPages[action.pageName].indexOf(action.fieldName) === -1) {
				update.dirtyPages[action.pageName].push(action.fieldName);
			}
		} else {
			update.dirtyPages[action.pageName] = [action.fieldName];
		}
		return Object.assign({}, state, update);
	case SAVE_STATE:
		update = { dirtyPages: Object.assign({}, state.dirtyPages) };
		delete update.dirtyPages[action.pageName];
		return Object.assign({}, state, update);
	default:
		return state;
	}
}
