import { connect } from 'react-redux';
import { toolbarSelector } from 'console/state/selectors/toolbarSelector.js';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import { shownTabNameSelector } from 'console/state/selectors/tabSelector.js';
import { currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import { saveValues } from 'console/state/actions/values.js';
import { updateFieldValue } from 'console/state/reducers/dataFields.js';
import { setOption } from 'console/state/reducers/options.js';
import { fireAction } from 'console/state/actions/fireAction.js';
import { setTab } from 'console/state/reducers/layout.js';
import Immutable from 'immutable';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	let props = {
		pageName: currentPageNameSelector(state),
		shownTab: shownTabNameSelector(state),
		tabDefs: currentPageSelector(state).get('tabs').map(tabName => state.getIn(['tabDefs', tabName])),
		toolbars: toolbarSelector(state)
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
			fireAction: (pageName, actionId) => values => dispatch(fireAction(pageName, actionId, values)),
			setTab: tabName => () => dispatch(setTab(tabName))
		}
	};
}

const ConnectToolbarFrame = connect(mapStateToProps, mapDispatchToProps)(ToolbarFrame);

export default ConnectToolbarFrame;
