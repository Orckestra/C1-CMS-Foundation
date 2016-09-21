import { connect } from 'react-redux';
import FormTab from 'console/components/presentation/FormTab.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';

function mapStateToProps(state) {
	let tabName = state.pages.tabs[state.pages.currentPage];
	return {
		name: tabName,
		tabDef: state.tabDefs[tabName],
		fieldsetDefs: state.fieldsetDefs,
		dataFieldDefs: state.dataFieldDefs,
		values: state.values
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			updateValue: (pageName, fieldName) => value => dispatch(updateFieldValue(pageName, fieldName, value))
		}
	};
}

const TabContent = connect(mapStateToProps, mapDispatchToProps)(FormTab);

export default TabContent;
