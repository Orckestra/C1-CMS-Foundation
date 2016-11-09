import { connect } from 'react-redux';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';

const dialogTypes = {
	palette: () => null
};

function mapStateToProps(state, ownProps) {
	// Harvest dialog identity from pageDef
	let dialogDef = state.getIn(['dialogDefs', ownProps.pageDef.get('dialog')]);
	// TODO: Rig this up in a way that allows dialog control from layout state.
	return {
		dialogDef,
		dialogTypes
	};
}

const ConnectDialog = connect(mapStateToProps)(SwitchPanel);

export default ConnectDialog;
