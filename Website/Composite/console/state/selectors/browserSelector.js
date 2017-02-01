import { createSelector }from 'reselect';
import { currentTabSelector } from 'console/state/selectors/layoutSelector.js';

export const splitterSelector = createSelector(
	currentTabSelector,
	tab => tab.get('splitPosition') || 400
);
