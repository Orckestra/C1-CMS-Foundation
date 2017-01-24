import { createSelector } from 'reselect';
import { currentDialogDefSelector, currentDialogPaneDefSelector, currentDialogDataSelector } from 'console/state/selectors/dialogSelector.js';
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

const filteredElementsSelector = createSelector(
	rawProviderDataSelector,
	currentDialogDataSelector,
	(elements, dialogData) => {
		let filterText = (dialogData.get('filterText') || '').toLowerCase();
		if (/\w/.test(filterText)) {
			return elements.filter(element => {
				let searchText = (element.get('title') + ' ' + element.get('description')).toLowerCase();
				return searchText.indexOf(filterText) !== -1;
			});
		} else {
			return elements;
		}
	}
);

const categorySelector = createSelector(
	currentDialogPaneDefSelector,
	paneDef => paneDef.get('categories') || Immutable.List()
);

const categorizedElementListSelector = createSelector(
	categorySelector,
	filteredElementsSelector,
	(categories, rawData) => {
		let categoryMap = {
			uncategorized: []
		};
		categories.forEach(name => {
			categoryMap[name] = [];
		});
		rawData.forEach(element => {
			let categorized = false;
			element.get('groupingTags').forEach(tag => {
				if (categoryMap[tag]) {
					categoryMap[tag].push(element);
					categorized = true;
				}
			});
			if (!categorized) {
				categoryMap['uncategorized'].push(element);
			}
		});
		categories = categories.push('uncategorized');
		categories = categories.filter(name => categoryMap[name].length);
		return categories.map(categoryName => Immutable.Map({
			name: categoryName,
			// Ideally, title for the group would be defined as a string somewhere.
			title: categoryName.replace(/^\w/, match => match.toLocaleUpperCase()),
			entries: Immutable.List(categoryMap[categoryName])
		}));
	}
);

// Grab and transform the list of components
export const currentPaletteElementList = createSelector(
	categorizedElementListSelector,
	list => list
);
