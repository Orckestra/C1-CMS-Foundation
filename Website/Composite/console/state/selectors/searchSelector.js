import { createSelector } from 'reselect';
import Immutable from 'immutable';
import {currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const providerSelector = state => state.get('providers');
const allOptionsSelector = state => state.get('options');

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

const facetOptionsSelector = createSelector(
	allOptionsSelector,
	currentPageNameSelector,
	(options, pageName) => options.getIn(['values', pageName, 'selections']) || Immutable.List()
);

export const facetSelector = createSelector(
	searchSelector,
	facetOptionsSelector,
	(search, selections) => (search.get('facetFields') || Immutable.List()).withMutations(facetFields => {
		selections.forEach(field => {
			let fieldName = field.get('fieldName');
			let fieldIndex = facetFields.findKey(field => field.get('fieldName') === fieldName);
			let facets = facetFields.getIn([fieldIndex, 'facets']) || Immutable.List();
			field.get('values').forEach(facetValue => {
				let facetIndex = facets.findKey(facet => facet.get('value') === facetValue);
				facetFields.setIn([fieldIndex, 'facets', facetIndex, 'checked'], true);
			});
		});
	})
);

export const columnSelector = createSelector(
	searchSelector,
	search => search.get('columns') || Immutable.List()
);

export const rowSelector = createSelector(
	searchSelector,
	search => search.get('rows') || Immutable.List()
);
