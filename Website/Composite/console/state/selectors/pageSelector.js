import { createSelector } from 'reselect';

const pageDefSelector = state => state.pageDefs;
const currentPageNameSelector = state => state.pages.currentPage;

export const currentPageSelector = createSelector(
	currentPageNameSelector,
	pageDefSelector,
	(name, pageDefs) => Object.assign({}, pageDefs[name])
);
