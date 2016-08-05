import { STORE_DEF } from '../actions/componentDefinitions.js';

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
