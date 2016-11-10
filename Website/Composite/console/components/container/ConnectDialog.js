import { connect } from 'react-redux';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import Palette from 'console/components/presentation/Palette.js';
import Immutable from 'immutable';

const dialogTypes = {
	palette: Palette
};

function mapStateToProps(state, ownProps) {
	// Harvest dialog identity from pageDef
	let dialogDef = state.getIn(['dialogDefs', ownProps.pageDef.get('dialog')]);
	// TODO: Rig this up in a way that allows dialog control from layout state.
	return {
		dialogDef,
		showType: (dialogDef || Immutable.Map()).get('type'),
		panelTypes: dialogTypes
	};
}

const ConnectDialog = connect(mapStateToProps)(SwitchPanel);

export default ConnectDialog;
