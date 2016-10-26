import { createSelector } from 'reselect';
import Immutable from 'immutable';

const layoutSelector = state => state.get('layout');

const perspectivesSelector = createSelector(
	layoutSelector,
	layout => layout.get('perspectives')
);
export const currentPerspectiveNameSelector = createSelector(
	layoutSelector,
	layout => layout.get('currentPerspective')
);

const currentPerspectiveSelector = createSelector(
	perspectivesSelector,
	currentPerspectiveNameSelector,
	(perspectives, name) => perspectives.get(name)
);

const pagesSelector = createSelector(
	currentPerspectiveSelector,
	perspective => perspective.get('pages') || Immutable.Map()
);
export const currentPageNameSelector = createSelector(
	currentPerspectiveSelector,
	perspective => perspective.get('currentPage')
);

const currentPageSelector = createSelector(
	pagesSelector,
	currentPageNameSelector,
	(pages, name) => pages.get(name) || Immutable.Map()
);

export const currentTabNameSelector = createSelector(
	currentPageSelector,
	page => page.get('currentTab')
);
