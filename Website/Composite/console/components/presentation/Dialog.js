import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Palette from 'console/components/presentation/Palette.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Immutable from 'immutable';
import { setDialogState } from 'console/state/reducers/dialog.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
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
	let nextAction;
	let buttons = ['next', 'finish', 'cancel'].map(name => {
		let button = paneDef.get(name + 'Button') ? paneDef.get(name + 'Button').toJS() : null;
		let provider = paneDef.get(name + 'Provider') && paneDef.get(name + 'Provider').toJS ? paneDef.get(name + 'Provider').toJS() : null;
		if (provider && button) {
			let action = props.actions.useProvider(provider, props.dialogDef.get('name'));
			if (provider.sendData) {
				let innerAction = action;
				action = () => {
					let payload = props.dialogData.getIn(provider.markup);
					innerAction(payload);
				};
			}
			if (name !== 'cancel') {
				nextAction = action;
			}
			return <ActionButton key={name} action={action} {...button}/>;
		} else {
			return null;
		}
	});
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
			<SwitchPanel
				showType={paneDef.get('type')}
				panelTypes={paneTypes}
				dialogName={props.dialogDef.get('name')}
				paneDef={paneDef}
				itemGroups={props.itemGroups}
				dialogData={props.dialogData}
				useProvider={props.actions.useProvider}
				nextAction={nextAction}/>
		</DialogPane>
		<DialogButtonGroup>
			{buttons}
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
	actions: PropTypes.shape({
		useProvider: PropTypes.func.isRequired,
	}).isRequired,
	itemGroups: ImmutablePropTypes.list
};

export default Dialog;
