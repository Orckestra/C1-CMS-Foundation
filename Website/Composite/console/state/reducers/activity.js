import Immutable from 'immutable';

const initialState = Immutable.Map({});

const commenceActionPattern = /_COMMENCE$/;
const failedActionPattern = /_FAILED$/;
const doneActionPattern = /_DONE$/;
const lastWordPattern = /_[A-Z]+$/;

export default function activity(state = initialState, action) {
	let actionType = '';
	if (action && action.type) {
		actionType = action.type.replace(lastWordPattern, '');
		if (commenceActionPattern.test(action.type)) {
			return state.set(actionType, (state.get(actionType) || 0) + 1);
		} else if (
			state.get(actionType) &&
			doneActionPattern.test(action.type) ||
			failedActionPattern.test(action.type)
		) {
			return state.set(actionType, state.get(actionType) - 1);
		}
	}
	return state;
}
