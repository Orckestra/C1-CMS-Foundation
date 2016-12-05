import { connect } from 'react-redux';
import { currentPaletteElementList } from 'console/state/selectors/paletteDialogSelector.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import Palette from 'console/components/presentation/Palette.js';
import Immutable from 'immutable';

const dialogTypes = {
	palette: Palette
};

function mapStateToProps(state, ownProps) {
	// Harvest dialog identity from pageDef
	let dialogDef = state.getIn(['dialogDefs', ownProps.pageDef.get('dialog')]) || Immutable.Map();
	// TODO: Rig this up in a way that allows dialog control from layout state.
	return {
		dialogDef,
		showType: dialogDef.get('type'),
		panelTypes: dialogTypes,
		headline: dialogDef.get('headline'),
		itemGroups: currentPaletteElementList(state),
		dialogData: state.getIn(['dialogData', dialogDef.get('name')]) || Immutable.Map()
	};
}

const ConnectDialog = connect(mapStateToProps)(SwitchPanel);

export default ConnectDialog;
