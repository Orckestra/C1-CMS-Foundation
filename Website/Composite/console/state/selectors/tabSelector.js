import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const tabDefsSelector = state => state.get('tabDefs');
const currentTabsSelector = state => state.getIn(['pages', 'tabs']);

const currentTabNameSelector = createSelector(
	currentPageSelector,
	currentTabsSelector,
	(page, tabs) => {
		return tabs.get(page.get('name')) || page.getIn(['tabs', 0]);
	}
);

export const tabSelector = createSelector(
	tabDefsSelector,
	currentTabNameSelector,
	(tabDefs, tabName) => tabDefs.get(tabName)
);
