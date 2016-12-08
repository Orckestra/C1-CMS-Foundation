import { createSelector } from 'reselect';
import { currentDialogDefSelector, currentDialogPaneDefSelector } from 'console/state/selectors/dialogSelector.js';
import Immutable from 'immutable';

const providersSelector = state => state.get('providers');

// Grab the list of components
export const currentPaletteElementList = createSelector(
	currentDialogDefSelector,
	currentDialogPaneDefSelector,
	providersSelector,
	(dialogDef, paneDef, providers) =>
		providers.getIn([
			paneDef.getIn(['provider', 'uri']),
			dialogDef.get('name')
		]) || Immutable.List()
);
