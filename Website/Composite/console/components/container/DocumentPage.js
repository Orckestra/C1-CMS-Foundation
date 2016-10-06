import { connect } from 'react-redux';
import { toolbarSelectorMutable } from 'console/state/selectors/toolbarSelector.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import { saveValues } from 'console/state/actions/values.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';
import { setOption } from 'console/state/reducers/options.js';
import { fireAction } from 'console/state/actions/fireAction.js';
import Immutable from 'immutable';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let props = {
		pageName: state.getIn(['pages', 'currentPage']),
		toolbars: toolbarSelectorMutable(state)
	};
	props.dirty = !Immutable.is(
		state.getIn(['dataFields', 'committedPages', props.pageName]),
		state.getIn(['dataFields', props.pageName])
	);
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
