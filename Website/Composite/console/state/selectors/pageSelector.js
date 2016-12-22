import { createSelector } from 'reselect';
import { currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';
import Immutable from 'immutable';

const pageDefSelector = state => state.get('pageDefs');
const providerSelector = state => state.get('providerDefs');

export const currentPageSelector = createSelector(
	currentPageNameSelector,
	pageDefSelector,
	providerSelector,
	(name, pageDefs, providerDefs) => pageDefs.get(name) && pageDefs.get(name).withMutations(pageDef => {
		if (pageDef.get('providers')) {
			pageDef.set('providers', pageDef.get('providers').reduce((providers, providerName) =>
				providers.set(providerName, providerDefs.get(providerName)),
				Immutable.Map()
			));
		}
	})
);
