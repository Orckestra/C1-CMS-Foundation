import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import Immutable from 'immutable';

const toolbarDefSelector = state => state.get('toolbarDefs');
const itemDefSelector = state => state.get('itemDefs');
const optionsSelector = state => state.get('options');

const exists = x => x;

export const toolbarAssemblySelector = createSelector(
	currentPageSelector,
	toolbarDefSelector,
	itemDefSelector,
	(pageDef, toolbarDefs, itemDefs) =>
		pageDef.get('toolbars')
			.map(toolbarName => toolbarDefs.get(toolbarName))
			.filter(exists)
			.map(toolbar => {
				let items = toolbar.get('items')
					.map(itemName => itemDefs.get(itemName))
					.filter(exists);
				return toolbar.set('items', items);
			})
);

export const toolbarSelector = createSelector(
	toolbarAssemblySelector,
	optionsSelector,
	(toolbars, options) =>
		toolbars.map(toolbar => {
			let items = toolbar.get('items')
				.map(item => item.withMutations(item => {
					if (item.get('type') === 'select' || item.get('type') === 'checkboxGroup') {
						let name = item.get('name');
						let optionList = options.getIn(['lists', name]);
						if (optionList) {
							item.set('options', optionList);
						}
						let value = options.getIn(['values', name]);
						if (typeof value === 'undefined') {
							value = item.get('default') || '';
						}
						item.set('value', value);
						if (item.get('type') === 'checkboxGroup' && item.get('value') === '') {
							item.set('value', Immutable.List());
						}
					}
				}));
			return toolbar.set('items', items);
		})
);
