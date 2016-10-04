import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const tabDefsSelector = state => state.tabDefs;
const fieldsetDefsSelector = state => state.fieldsetDefs;
const dataFieldDefsSelector = state => state.dataFieldDefs;
const valuesSelector = state => state.dataFields;
const currentTabsSelector = state => state.pages.tabs;

const currentTabNameSelector = createSelector(
	currentPageSelector,
	currentTabsSelector,
	(page, tabs) => {
		return tabs[page.name] || page.tabs[0];
	}
);

const pureValuesSelector = createSelector(
	valuesSelector,
	values => {
		let vals = Object.assign({}, values);
		delete vals.dirtyPages;
		return vals;
	}
);

export const currentTabDefSelector = createSelector(
	tabDefsSelector,
	currentTabNameSelector,
	(tabDefs, tabName) => tabDefs[tabName]
);

export const currentTabAssemblySelector = createSelector(
	currentPageSelector,
	currentTabDefSelector,
	fieldsetDefsSelector,
	dataFieldDefsSelector,
	(page, tabDef, fieldsetDefs, dataFieldDefs) => Object.assign({}, tabDef, {
		fieldsets: ((tabDef || {}).fieldsets || []).map(fieldsetName => Object.assign({}, fieldsetDefs[fieldsetName], {
			fields: ((fieldsetDefs[fieldsetName] || {}).fields || [])
				.map(fieldName => Object.assign({}, dataFieldDefs[fieldName]))
				.filter(field => field.name)
		})).filter(fieldset => fieldset.name)
	})
);

export const tabSelector = createSelector(
	currentTabAssemblySelector,
	pureValuesSelector,
	(tabAssembly, values) => {
		let tab = Object.assign({}, tabAssembly);
		tab.fieldsets = (tab.fieldsets || []).map(fieldset => Object.assign({}, fieldset, {
			fields: (fieldset.fields || []).map(field => Object.assign({}, field, {
				value: values[field.name] || ''
			}))
		}));
		return tab;
	}
);
