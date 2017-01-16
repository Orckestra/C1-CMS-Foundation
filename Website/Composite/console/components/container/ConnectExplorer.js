import { connect } from 'react-redux';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import { shownTabNameSelector } from 'console/state/selectors/tabSelector.js';
import { currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';
import { toolbarSelector } from 'console/state/selectors/toolbarSelector.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import Immutable from 'immutable';

function mapStateToProps(state) {
	return {
		pageName: currentPageNameSelector(state),
		shownTab: shownTabNameSelector(state),
		tabDefs: currentPageSelector(state).get('tabs').map(tabName => state.getIn(['tabDefs', tabName])),
		toolbars: toolbarSelector(state), // Replace with node-based + navigation bar
		dirty: false
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			fireAction: () => () => {}
		} // Output actions used for selected node
	};
}

const ConnectExplorer = connect(mapStateToProps, mapDispatchToProps)(ToolbarFrame);

export default ConnectExplorer;
