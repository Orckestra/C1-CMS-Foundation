import { createSelector } from 'reselect';

const pageDefSelector = state => state.get('pageDefs');
const currentPageNameSelector = state => state.getIn(['pages', 'currentPage']);

export const currentPageSelector = createSelector(
	currentPageNameSelector,
	pageDefSelector,
	(name, pageDefs) => pageDefs.get(name)
);
