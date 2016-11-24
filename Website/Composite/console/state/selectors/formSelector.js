import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import { tabSelector } from 'console/state/selectors/tabSelector.js';

const fieldsetDefsSelector = state => state.get('fieldsetDefs');
const dataFieldDefsSelector = state => state.get('dataFieldDefs');
const valuesSelector = state => state.get('dataFields');

const exists = x => x;

const pureValuesSelector = createSelector(
	valuesSelector,
	values => values.delete('committedPages')
);

export const formAssemblySelector = createSelector(
	currentPageSelector,
	tabSelector,
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

export const formSelector = createSelector(
	formAssemblySelector,
	pureValuesSelector,
	(tabAssembly, values) =>
		!tabAssembly ? null :
		tabAssembly.set('fieldsets',
			tabAssembly.get('fieldsets')
				.map(fieldset =>
					fieldset.set('fields', fieldset.get('fields')
						.map(field =>
							field.set('value',
								values.getIn([tabAssembly.get('pageName'), field.get('name')] || '')
							)
						)
					)
				)
		)
);
