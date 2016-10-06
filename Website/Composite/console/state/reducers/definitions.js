import Immutable from 'immutable';

const prefix = 'DEFINITIONS.';

export const STORE_DEF = prefix + 'STORE';

export function addDefinition(defType, definition) {
	return { type: STORE_DEF, defType, definition };
}

const initialState = Immutable.Map();

export default function getDefinitionReducer(typeName) {
	return (state = initialState, action) => {
		if (action.type === STORE_DEF && action.defType === typeName) {
			return state.set(action.definition.name, Immutable.fromJS(action.definition));
		} else {
			return state;
		}
	};
}
