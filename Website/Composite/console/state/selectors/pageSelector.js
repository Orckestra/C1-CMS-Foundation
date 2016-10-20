import { createSelector } from 'reselect';
import Immutable from 'immutable';

const pageDefSelector = state => state.get('pageDefs');
const currentPageNameSelector = state => state.getIn(['pages', 'currentPage']);

export const currentPageSelector = createSelector(
	currentPageNameSelector,
	pageDefSelector,
	(name, pageDefs) => pageDefs.get(name) || Immutable.Map()
);
