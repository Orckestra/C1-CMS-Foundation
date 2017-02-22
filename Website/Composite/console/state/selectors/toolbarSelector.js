import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import Immutable from 'immutable';
import { hydrateChild, hydrateChildren } from 'console/state/utilities.js';

const toolbarDefSelector = state => state.get('toolbarDefs');
const itemDefSelector = state => state.get('itemDefs');
const providerDefSelector = state => state.get('providerDefs');
const optionsSelector = state => state.get('options');

export const toolbarAssemblySelector = createSelector(
	currentPageSelector,
	toolbarDefSelector,
	itemDefSelector,
	providerDefSelector,
	(pageDef, toolbarDefs, itemDefs, providerDefs) =>
		hydrateChildren(pageDef, toolbarDefs, 'toolbars', toolbar =>
			hydrateChildren(toolbar, itemDefs, 'items', item =>
				hydrateChild(item, providerDefs, 'provider')
			)
		).get('toolbars')
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
