import { createSelector } from 'reselect';
import { currentDialogDefSelector, currentDialogPaneDefSelector } from 'console/state/selectors/dialogSelector.js';
import Immutable from 'immutable';

const providersSelector = state => state.get('providers');

const rawProviderDataSelector = createSelector(
	currentDialogDefSelector,
	currentDialogPaneDefSelector,
	providersSelector,
	(dialogDef, paneDef, providers) =>
		providers.getIn([
			paneDef.getIn(['provider', 'uri']),
			dialogDef.get('name')
		]) || Immutable.List()
);

const categorySelector = createSelector(
	currentDialogPaneDefSelector,
	paneDef => paneDef.get('categories') || Immutable.List()
);

const categorizedElementListSelector = createSelector(
	categorySelector,
	rawProviderDataSelector,
	(categories, rawData) => {
		let categoryMap = {};
		categories.forEach(name => {
			categoryMap[name] = [];
		});
		rawData.forEach(element => {
			element.get('GroupingTags').forEach(tag => {
				if (categoryMap[tag]) {
					categoryMap[tag].push(element);
				}
			});
		});
		return categories.map(categoryName => Immutable.Map({
			name: categoryName,
			entries: Immutable.List(categoryMap[categoryName])
		}));
	}
);

// Grab and transform the list of components
export const currentPaletteElementList = createSelector(
	categorizedElementListSelector,
	list => list
);
