import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const toolbarDefSelector = state => state.toolbarDefs;
const itemDefSelector = state => state.itemDefs;
const optionsSelector = state => state.options;

export const toolbarAssemblySelector = createSelector(
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

export const toolbarSelector = createSelector(
	toolbarAssemblySelector,
	optionsSelector,
	(toolbars, options) =>
		toolbars.map(toolbar => Object.assign({}, toolbar, {
			items: toolbar.items.map(item => {
				let update = {};
				if (item.type === 'select' || item.type == 'checkboxGroup') {
					update.options = options.lists[item.name] || item.options;
					update.value = options.values[item.name];
					if (item.type === 'checkboxGroup' && !update.value) {
						update.value = [];
					}
				}
				return Object.assign({}, item, update);
			})
		}))
);
