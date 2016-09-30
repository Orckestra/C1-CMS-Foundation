import { connect } from 'react-redux';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import { saveValues } from 'console/state/actions/values.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';
import { setOption } from 'console/state/reducers/options.js';
import { fireAction } from 'console/state/actions/fireAction.js';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let props = {
		toolbarDefs: state.toolbarDefs,
		itemDefs: state.itemDefs,
		options: state.options
	};
	props.dirtyPages = state.dataFields && state.dataFields.dirtyPages;
	return props;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			save: pageName => () => dispatch(saveValues(pageName)),
			setOption: fieldName => value => dispatch(setOption(fieldName, value)),
			updateValue: (pageName, fieldName) => value => dispatch(updateFieldValue(pageName, fieldName, value)),
			fireAction: (pageName, actionId) => values => dispatch(fireAction(pageName, actionId, values))
		}
	};
}

const DocumentPage = connect(mapStateToProps, mapDispatchToProps)(ToolbarFrame);

export default DocumentPage;
