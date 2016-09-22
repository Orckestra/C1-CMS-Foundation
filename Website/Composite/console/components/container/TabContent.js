import { connect } from 'react-redux';
import FormTab from 'console/components/presentation/FormTab.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';

function mapStateToProps(state) {
	let tabName = state.pages.tabs[state.pages.currentPage] ||
		state.pageDefs[state.pages.currentPage].tabs[0];
	let props = {
		name: tabName,
		pageName: state.pages.currentPage,
		tabDef: state.tabDefs[tabName] || {},
		fieldsetDefs: state.fieldsetDefs,
		dataFieldDefs: state.dataFieldDefs,
		values: {}
	};
	Object.keys(state.dataFields).forEach(fieldName => {
		if (fieldName === 'dirtyPages') return;
		props.values[fieldName] = state.dataFields[fieldName];
	});
	return props;
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
