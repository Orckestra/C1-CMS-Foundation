import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';

const tabDefsSelector = state => state.get('tabDefs');
const fieldsetDefsSelector = state => state.get('fieldsetDefs');
const dataFieldDefsSelector = state => state.get('dataFieldDefs');
const valuesSelector = state => state.get('dataFields');
const currentTabsSelector = state => state.getIn(['pages', 'tabs']);

const exists = x => x;

const currentTabNameSelector = createSelector(
	currentPageSelector,
	currentTabsSelector,
	(page, tabs) => {
		return tabs.get(page.get('name')) || page.getIn(['tabs', 0]);
	}
);

const pureValuesSelector = createSelector(
	valuesSelector,
	values => values.delete('committedPages')
);

export const currentTabDefSelector = createSelector(
	tabDefsSelector,
	currentTabNameSelector,
	(tabDefs, tabName) => tabDefs.get(tabName)
);

export const currentTabAssemblySelector = createSelector(
	currentPageSelector,
	currentTabDefSelector,
	fieldsetDefsSelector,
	dataFieldDefsSelector,
	(page, tabDef, fieldsetDefs, dataFieldDefs) =>
		!tabDef ? null :
		tabDef.set('fieldsets', tabDef.get('fieldsets')
			.map(fieldsetName => fieldsetDefs.get(fieldsetName))
			.filter(exists)
			.map(fieldset => fieldset.set('fields', fieldset.get('fields')
				.map(fieldName => dataFieldDefs.get(fieldName))
				.filter(exists)
			))
		).set('pageName', page.get('name'))
);

export const tabSelector = createSelector(
	currentTabAssemblySelector,
	pureValuesSelector,
	(tabAssembly, values) =>
		!tabAssembly ? null :
		tabAssembly.set('fieldsets',
			tabAssembly.get('fieldsets')
				.map(fieldset =>
					fieldset.set('fields', fieldset.get('fields')
						.map(field =>
							field.set('value',
								values.getIn([tabAssembly.get('pageName'), field.get('name')])
							)
						)
					)
				)
		)
);

export const tabSelectorMutable = createSelector(
	tabSelector,
	tab => tab ? tab.toJS() : {}
);
