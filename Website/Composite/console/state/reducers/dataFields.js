import Immutable from 'immutable';

const prefix = 'DATAFIELDS.';

export const UPDATE_VALUE = prefix + 'UPDATE_VALUE';
export function updateFieldValue(pageName, fieldName, newValue) {
	return { type: UPDATE_VALUE, pageName, fieldName, newValue };
}

export const COMMIT_PAGE = prefix + 'COMMIT';
export function commitPage(pageName) {
	return { type: COMMIT_PAGE, pageName };
}

export const ROLLBACK_PAGE = prefix + 'ROLLBACK';
export function rollbackPage(pageName, values) {
	return {type: ROLLBACK_PAGE, pageName, values };
}

export const STORE_VALUES = prefix + 'STORE_VALUES';
export function storeValues(pageName, values) {
	return { type: STORE_VALUES, pageName, values };
}

const initialState = Immutable.Map({
	committedPages: Immutable.Map()
});

export default function dataFields(state = initialState, action) {
	switch (action.type) {
	case UPDATE_VALUE:
		return state.withMutations(state => {
			if (!state.getIn(['committedPages', action.pageName])) {
				state.setIn(['committedPages', action.pageName], Immutable.Map());
			}
			if (!state.get(action.pageName)) {
				state.set(action.pageName, Immutable.Map());
			}
			state.setIn([action.pageName, action.fieldName], action.newValue);
		});
	case COMMIT_PAGE:
		return state.setIn(['committedPages', action.pageName], state.get(action.pageName));
	case ROLLBACK_PAGE:
		if (!Immutable.Map.isMap(action.values)) {
			action.values = state.getIn(['committedPages', action.pageName]);
		}
		return state
			.set(action.pageName, action.values)
			.setIn(['committedPages', action.pageName], action.values);
	case STORE_VALUES:
		return state.withMutations(state => {
			state.mergeIn([action.pageName], action.values);
			state.setIn(['committedPages', action.pageName], state.get(action.pageName));
		});
	default:
		return state;
	}
}
