import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Palette from 'console/components/presentation/Palette.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Immutable from 'immutable';
import { fireAction } from 'console/state/actions/fireAction.js';
import { setDialogState } from 'console/state/reducers/dialog.js';
import Input from 'console/components/presentation/Input.js';
import Icon from 'console/components/presentation/Icon.js';

const paneTypes = {
	palette: Palette
};

const sizes = {
	sidePadding: 15,
	titlePaddingTop: 20,
	titleHeight: 16,
	titlePaddingBottom: 18,
	paneBorder: 1,
	panePaddingTop: 15,
	panePaddingBottom: 15,
	buttonsPaddingTop: 12,
	buttonsHeight: 40,
	buttonsPaddingBottom: 14
};

// TODO: Restyle for use as actual dialogs, add overlays where needed, etc.
export const DialogBox = styled.div`
	background-color: ${colors.fieldsetBackgroundColor};
	height: 100%;
/*	max-width: 880px;
	overflow: hidden;*/
`;
export const DialogTitle = styled.h1`
	margin: 0;
	padding: ${sizes.titlePaddingTop}px ${sizes.sidePadding}px ${sizes.titlePaddingBottom}px;
	font-size: ${sizes.titleHeight}px;
	font-weight: normal;
	font-family: 'Roboto Condensed', sans-serif;
	text-transform: uppercase;
	color: ${colors.dialogHeaderColor};
`;

export const DialogPane = styled.div`
	border-top: ${sizes.paneBorder}px solid ${colors.borderColor};
	border-bottom: ${sizes.paneBorder}px solid ${colors.borderColor};
	padding: ${sizes.panePaddingTop}px ${sizes.sidePadding}px ${sizes.panePaddingBottom}px;
	height: calc(100% - ${
		(sizes.titlePaddingTop + sizes.titleHeight + sizes.titlePaddingBottom) +
		(sizes.paneBorder + sizes.panePaddingTop + sizes.panePaddingBottom + sizes.paneBorder) +
		(sizes.buttonsPaddingTop + sizes.buttonsHeight + sizes.buttonsPaddingBottom)
	}px);
	overflow-y: auto;
`;

export const DialogButtonGroup = styled.div`
	padding: ${sizes.buttonsPaddingTop}px ${sizes.sidePadding}px ${sizes.buttonsPaddingBottom}px;
	text-align: right;
`;
export const SearchField = styled(Input)`
position: absolute;
top: 10px;
right: 20px;
width: 200px;
padding-right: 30px;
`;
export const SearchIcon = styled(Icon)`
position: absolute;
top: 18px;
right: 31px;
`;

const Dialog = props => {
	let paneDef = props.dialogDef.getIn(['panes', props.dialogData.get('showPane') || 0]) || Immutable.Map();
	let Pane = paneTypes[paneDef.get('type')] || (() => null);
	let cancelButton = paneDef.get('cancelButton') ? paneDef.get('cancelButton').toJS() : null;
	let cancelProvider = paneDef.get('cancelProvider') && paneDef.get('cancelProvider').toJS ? paneDef.get('cancelProvider').toJS() : null;
	let cancelAction = cancelButton ? () => {
		// Cancel and close dialog
		if (cancelProvider) {
			// Fire off a call to the provider if one exists, send dialog name.
			props.dispatch(fireAction(cancelProvider, props.dialogDef.get('name')));
		}
	} : null;
	let nextButton = paneDef.get('nextButton') ? paneDef.get('nextButton').toJS() : null;
	let nextAction = paneDef.get('nextButton') ? () => {
		// Switch to next pane - set or increment dialogData[showPane]
	} : null;
	let finishButton = paneDef.get('finishButton') ? paneDef.get('finishButton').toJS() : null;
	let finishAction = paneDef.get('finishButton') && paneDef.get('finishProvider') && paneDef.get('finishProvider').toJS ? () => {
		// Complete dialog activity, send back data using provider
		props.dispatch(fireAction(paneDef.get('finishProvider').toJS(), props.dialogDef.get('name'), props.dialogData.toJS()));
	} : null;
	const searchFunction = event => props.dispatch(
		setDialogState(
			props.dialogDef.get('name'),
			props.dialogData
			.set('filterText', event.target.value)
		)
	);
	return <DialogBox
		onContextMenu={event => {
			event.preventDefault(); // To not show the default menu
		}}>
		{paneDef.get('headline') ? <DialogTitle>{paneDef.get('headline')}</DialogTitle> : null}
		<SearchField
			placeholder={props.dialogDef.get('searchPlaceholder')}
			value={props.dialogData.get('filterText')}
			onChange={searchFunction}
			onInput={searchFunction}/>
		<SearchIcon id='magnifier'/>
		<DialogPane>
			<Pane dialogName={props.dialogDef.get('name')} paneDef={paneDef} itemGroups={props.itemGroups} dialogData={props.dialogData} dispatch={props.dispatch} nextAction={nextAction || finishAction}/>
		</DialogPane>
		<DialogButtonGroup>
			{ nextButton ? <ActionButton action={nextAction} {...nextButton}/> : null}
			{ finishButton ? <ActionButton action={finishAction} {...finishButton} disabled={!props.dialogData.get('selectedItem')}/> : null}
			{ cancelButton ? <ActionButton action={cancelAction} {...cancelButton}/> : null}
		</DialogButtonGroup>
	</DialogBox>;
};

Dialog.propTypes = {
	dialogData: ImmutablePropTypes.mapContains({
		selectedItem: PropTypes.string
	}),
	dialogDef: ImmutablePropTypes.mapContains({
		name: PropTypes.string.isRequired,
		headline: PropTypes.string,
		panes: ImmutablePropTypes.list.isRequired
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
	itemGroups: ImmutablePropTypes.list
};

export default Dialog;
