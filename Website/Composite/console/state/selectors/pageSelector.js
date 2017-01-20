import { createSelector } from 'reselect';
import { currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';

const pageDefSelector = state => state.get('pageDefs');

export const currentPageSelector = createSelector(
	currentPageNameSelector,
	pageDefSelector,
	(name, pageDefs) => pageDefs.get(name)
);
