import { connect } from 'react-redux';
import { currentPaletteElementList } from 'console/state/selectors/paletteDialogSelector.js';
import { currentDialogDefSelector } from 'console/state/selectors/dialogSelector.js';
import Dialog from 'console/components/presentation/Dialog.js';
import Immutable from 'immutable';

function mapStateToProps(state, ownProps) {
	// Harvest dialog identity from pageDef
	let dialogDef = state.getIn(['dialogDefs', ownProps.pageDef.get('dialog')]) || Immutable.Map();
	// TODO: Rig this up in a way that allows dialog control from layout state.
	return {
		dialogDef: currentDialogDefSelector(state),
		itemGroups: currentPaletteElementList(state),
		dialogData: state.getIn(['dialogData', dialogDef.get('name')]) || Immutable.Map()
	};
}

const ConnectDialog = connect(mapStateToProps)(Dialog);

export default ConnectDialog;
