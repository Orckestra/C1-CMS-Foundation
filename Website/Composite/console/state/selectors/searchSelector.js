import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const providerSelector = state => state.get('providers');

export const searchSelector = createSelector(
	providerSelector,
	currentPageSelector,
	(provider, pageDef) => pageDef && provider.getIn([
		pageDef.getIn([
			'providers',
			pageDef.get('searchProvider'),
			'uri'
		]),
		pageDef.get('name')
	]) || Immutable.Map()
);

export const searchQuerySelector = createSelector(
	searchSelector,
	search => search.get('queryText') || ''
);
export const facetSelector = createSelector(
	searchSelector,
	search => search.get('facetFields') || Immutable.List()
);

export const columnSelector = createSelector(
	searchSelector,
	search => search.get('columns') || Immutable.List()
);

export const rowSelector = createSelector(
	searchSelector,
	search => search.get('rows') || Immutable.List()
);
