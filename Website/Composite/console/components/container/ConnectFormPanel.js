import { connect } from 'react-redux';
import FormTab from 'console/components/presentation/FormTab.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';
import { formSelector } from 'console/state/selectors/formSelector.js';

function mapStateToProps(state) {
	let props = formSelector(state);
	return props ? props.toObject() : {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			updateValue: (pageName, fieldName) => value => dispatch(updateFieldValue(pageName, fieldName, value))
		}
	};
}

const ConnectFormPanel = connect(mapStateToProps, mapDispatchToProps)(FormTab);

export default ConnectFormPanel;
