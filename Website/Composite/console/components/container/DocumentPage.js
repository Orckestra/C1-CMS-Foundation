import { connect } from 'react-redux';
import FormPage from 'console/components/presentation/FormPage.js';
import { saveState, updateFieldValue } from 'console/state/reducers/dataFields.js';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let update = {
		buttonDefs: state.buttonDefs,
		fieldsetDefs: state.fieldsetDefs,
		dataFieldDefs: state.dataFieldDefs,
		values: {}
	};
	Object.keys(state.dataFields).forEach(fieldName => {
		update.values[fieldName] = state.dataFields[fieldName];
	});
	update.hasDirtyFields = !!(state.dataFields && state.dataFields.dirtyFields.length);
	return update;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			save: pageName => () => dispatch(saveState(pageName)),
			updateValue: fieldName => value => dispatch(updateFieldValue(fieldName, value))
		}
	};
}

const DocumentPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);

export default DocumentPage;
