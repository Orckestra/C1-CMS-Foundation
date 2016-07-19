import { connect } from 'react-redux'
import Page from '../../Page';
import { saveState, updateFieldValue }from './../../state/actions';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			save: () => dispatch(saveState()),
			updateValue: (fieldName, value) => dispatch(updateFieldValue(fieldName, value))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
