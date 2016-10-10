import { connect } from 'react-redux';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import DockPanel from 'console/components/presentation/DockPanel.js';

function mapStateToProps(state) {
	return {
		pageDef: currentPageSelector(state)
	};
}

const ConnectDockPanel = connect(mapStateToProps)(DockPanel);

export default ConnectDockPanel;
