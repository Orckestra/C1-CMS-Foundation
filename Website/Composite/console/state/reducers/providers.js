import Immutable from 'immutable';

const prefix = 'PROVIDER.';

// Save data from provider in state
export const STORE_PROVIDER_DATA = prefix + 'STORE';
export function storeData(providerName, page, data) {
	return { type: STORE_PROVIDER_DATA, providerName, page, data };
}

const initialState = Immutable.Map({});

export default function providers(state = initialState, action) {
	switch (action.type) {
	case STORE_PROVIDER_DATA:
		return state.setIn([action.providerName, action.page], Immutable.fromJS(action.data));
	default:
		return state;
	}
}
