import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import Immutable from 'immutable';

const dialogDefsSelector = state => state.get('dialogDefs');
const providersSelector = state => state.get('providers');

const currentDialogDefSelector = createSelector(
	currentPageSelector,
	dialogDefsSelector,
	(pageDef, dialogDefs) => dialogDefs.get(pageDef.get('dialog')) || Immutable.Map()
);

// Grab the list of components
export const currentPaletteElementList = createSelector(
	currentDialogDefSelector,
	providersSelector,
	(dialogDef, providers) =>
		providers.getIn([
			dialogDef.getIn(['providers', 'elementSource', 'uri']),
			dialogDef.get('name')
		]) || Immutable.List()
);
