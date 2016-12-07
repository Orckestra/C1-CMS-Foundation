import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const dialogDefsSelector = state => state.get('dialogDefs');
const dialogPaneDefsSelector = state => state.get('dialogPaneDefs');
const providerDefsSelector = state => state.get('providerDefs');
const dialogDataSelector = state => state.get('dialogData');

export const currentDialogDefSelector = createSelector(
	currentPageSelector,
	dialogDefsSelector,
	dialogPaneDefsSelector,
	providerDefsSelector,
	(page, dialogDefs, paneDefs, providerDefs) => (dialogDefs.get(page.get('dialog')) || Immutable.Map()).withMutations(dialogDef => {
		dialogDef.set(
			'panes',
			(dialogDef.get('panes') || Immutable.List()).map(paneName => {
				let paneDef = paneDefs.get(paneName) || Immutable.Map();
				if (paneDef.get('provider')) {
					paneDef = paneDef.set(
						'provider',
						providerDefs.get(paneDef.get('provider'))
					);
				}
				['finish', 'cancel'].forEach(button => {
					let name = button + 'Provider';
					if (paneDef.get(name)) {
						paneDef = paneDef.set(
							name,
							providerDefs.get(paneDef.get(name))
						);
					}
				});
				return paneDef;
			})
		);
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
