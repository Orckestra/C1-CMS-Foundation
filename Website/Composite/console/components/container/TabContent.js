import { connect } from 'react-redux';
import FormTab from 'console/components/presentation/FormTab.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';
import { tabSelector } from 'console/state/selectors/tabSelector.js';

function mapStateToProps(state) {
	let props = tabSelector(state);
	return props ? props.toObject() : {};
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
