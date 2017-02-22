import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const dialogDefsSelector = state => state.get('dialogDefs');
const dialogPaneDefsSelector = state => state.get('dialogPaneDefs');
const providerDefsSelector = state => state.get('providerDefs');
const itemDefsSelector = state => state.get('itemDefs');
const dialogDataSelector = state => state.get('dialogData');

function hydrateChild(parent, childDefs, name, mutator) {
	if (parent.get(name)) {
		let childDef = childDefs.get(parent.get(name));
		if (mutator) {
			childDef = mutator(childDef);
		}
		return parent.set(
			name,
			childDef
		);
	} else {
		return parent;
	}
}

function hydrateChildren(parent, childDefs, name, childMutator) {
	let list = parent.get(name);
	if (list && Immutable.Iterable.isIndexed(list)) {
		list = list.map(childName => {
			let childDef = childDefs.get(childName);
			if (childMutator) {
				childDef = childMutator(childDef);
			}
			return childDef;
		});
		return parent.set(name, list);
	} else {
		return parent;
	}
}

export const currentDialogDefSelector = createSelector(
	currentPageSelector,
	dialogDefsSelector,
	dialogPaneDefsSelector,
	providerDefsSelector,
	itemDefsSelector,
	(page, dialogDefs, paneDefs, providerDefs, itemDefs) =>
		hydrateChildren((dialogDefs.get(page.get('dialog')) || Immutable.Map()), paneDefs, 'panes', paneDef => {
			let elements = paneDef.get('elements');
			paneDef = paneDef.set('elements', hydrateChild(hydrateChild(elements, providerDefs, 'fetch'), providerDefs, 'update'));
			paneDef = hydrateChildren(paneDef, itemDefs, 'buttons', buttonDef => hydrateChild(buttonDef, providerDefs, 'provider'));
			return paneDef;
		})
);

export const currentDialogDataSelector = createSelector(
	currentDialogDefSelector,
	dialogDataSelector,
	(dialogDef, dialogData) => dialogData.get(dialogDef.get('name')) || Immutable.Map()
);

export const currentDialogPaneDefSelector = createSelector(
	currentDialogDefSelector,
	currentDialogDataSelector,
	(dialogDef, dialogData) => dialogDef.getIn(['panes', dialogData.get('showPane') || 0]) || Immutable.Map()
);
