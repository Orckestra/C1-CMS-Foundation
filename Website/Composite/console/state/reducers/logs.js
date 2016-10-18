import Immutable from 'immutable';

const prefix = 'LOGS.';

export const REFRESH_LOG = prefix + 'REFRESH';
export function refreshLog(logName, page, entries) {
	return { type: REFRESH_LOG, logName, page, entries };
}

const initialState = Immutable.Map({
});

export default function logs(state = initialState, action) {
	switch (action.type) {
	case REFRESH_LOG:
		return state.setIn([action.logName, action.page], Immutable.fromJS(action.entries));
	default:
		return state;
	}
}
