import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import { currentTabNameSelector } from 'console/state/selectors/layoutSelector.js';

const tabDefsSelector = state => state.get('tabDefs');

export const shownTabNameSelector = createSelector(
	currentTabNameSelector,
	currentPageSelector,
	(tabName, page) => {
		return tabName || page.getIn(['tabs', 0]);
	}
);

export const tabSelector = createSelector(
	tabDefsSelector,
	shownTabNameSelector,
	(tabDefs, tabName) => tabDefs.get(tabName)
);
