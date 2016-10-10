import { connect } from 'react-redux';
import { tabSelector } from 'console/state/selectors/tabSelector.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import ConnectFormPanel from 'console/components/container/ConnectFormPanel.js';
import Immutable from 'immutable';

let panelTypes = {
	form: ConnectFormPanel
};

function mapStateToProps(state) {
	return {
		tabDef: tabSelector(state),
		showType: (tabSelector(state) || Immutable.Map()).get('type'),
		panelTypes
	};
}

const ConnectTabPanel = connect(mapStateToProps)(SwitchPanel);

export default ConnectTabPanel;
