const prefix = 'DEFINITIONS.';

export const STORE_DEF = prefix + 'STORE';

export function addDefinition(defType, definition) {
	return { type: STORE_DEF, defType, definition };
}

const initialState = {};

export default function getDefinitionReducer(typeName) {
	return (state = initialState, action) => {
		if (action.type === STORE_DEF && action.defType === typeName) {
			let update = Object.assign({}, state);
			update[action.definition.name] = action.definition;
			return update;
		} else {
			return state;
		}
	};
}
