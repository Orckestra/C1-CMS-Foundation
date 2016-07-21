import { connect } from 'react-redux'
import FormPage from '../presentation/FormPage';
import { saveState, updateFieldValue } from './../../state/actions';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let update = { values: { } };
	Object.keys(state.dataFields).forEach(fieldName => {
		update.values[fieldName] = state.dataFields[fieldName];
	})
	return update;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			save: () => dispatch(saveState()),
			updateValue: (fieldName, value) => dispatch(updateFieldValue(fieldName, value))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
