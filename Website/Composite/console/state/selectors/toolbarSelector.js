import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const toolbarDefSelector = state => state.toolbarDefs;
const itemDefSelector = state => state.itemDefs;

export const toolbarSelector = createSelector(
	currentPageSelector,
	toolbarDefSelector,
	itemDefSelector,
	(pageDef, toolbarDefs, itemDefs) => {
		let toolbars = pageDef.toolbars.map(toolbarName => {
			let toolbar = Object.assign({}, toolbarDefs[toolbarName]);
			toolbar.items = (toolbar.items || [])
				.map(itemName => itemDefs[itemName])
				.filter(item => !!item);
			return toolbar;
		}).filter(toolbar => !!toolbar.name);
		return toolbars;
	}
);
