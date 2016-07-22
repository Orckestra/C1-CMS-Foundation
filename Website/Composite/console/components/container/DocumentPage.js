import { connect } from 'react-redux';
import FormPage from '../presentation/FormPage';
import { saveState, updateFieldValue } from './../../state/actions/documentPage';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let update = { values: {} };
	Object.keys(state.dataFields).forEach(fieldName => {
		update.values[fieldName] = state.dataFields[fieldName];
	});
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
