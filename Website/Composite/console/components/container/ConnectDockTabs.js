// Handles dock tab bar (incl. absence thereof)
import { connect } from 'react-redux';
import TabBar from 'console/components/presentation/TabBar.js';
import { dockTabsSelector } from 'console/state/selectors/dockTabsSelector.js';
import { setPage } from 'console/state/reducers/layout.js';

function mapStateToProps(state) {
	return {
		dock: true,
		tabs: dockTabsSelector(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClick: pageName => () => dispatch(setPage(pageName))
	};
}

const ConnectDockTabs = connect(mapStateToProps, mapDispatchToProps)(TabBar);

export default ConnectDockTabs;
