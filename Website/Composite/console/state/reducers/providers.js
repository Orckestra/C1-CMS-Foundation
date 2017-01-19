import Immutable from 'immutable';
import actionLocator from 'console/state/actionLocator.js';

const prefix = 'PROVIDER.';

// Save data from provider in state
export const STORE_PROVIDER_DATA = prefix + 'STORE';
export function storeData(page, data) {
	return { type: STORE_PROVIDER_DATA, page, data };
}

actionLocator.register('storeProviderData', storeData);

const initialState = Immutable.Map({});

export default function providers(state = initialState, action) {
	switch (action.type) {
	case STORE_PROVIDER_DATA:
		return state.set(action.page, Immutable.fromJS(action.data));
	default:
		return state;
	}
}
