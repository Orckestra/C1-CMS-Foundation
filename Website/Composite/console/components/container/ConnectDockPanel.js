import { connect } from 'react-redux';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import ConnectToolbarFrame from 'console/components/container/ConnectToolbarFrame.js';
import ConnectDialog from 'console/components/container/ConnectDialog.js';
import Spritesheet from 'console/components/presentation/Spritesheet.js';
import ConnectSearchPage from 'console/components/container/ConnectSearchPage.js';
import Immutable from 'immutable';

let panelTypes = {
	document: ConnectToolbarFrame,
	spritesheet: Spritesheet,
	dialogPageShim: ConnectDialog,
	search: ConnectSearchPage
};

function mapStateToProps(state) {
	return {
		pageDef: currentPageSelector(state),
		showType: (currentPageSelector(state) || Immutable.Map()).get('type'),
		panelTypes
	};
}

const ConnectDockPanel = connect(mapStateToProps)(SwitchPanel);

export default ConnectDockPanel;
