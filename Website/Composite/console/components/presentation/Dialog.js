import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Palette from 'console/components/presentation/Palette.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Immutable from 'immutable';

const paneTypes = {
	palette: Palette
};

// TODO: Restyle for use in actual dialogs.
export const DialogBox = styled.div`
	background-color: ${colors.fieldsetBackgroundColor};
	height: 100%;
/*	max-width: 880px;
	overflow: hidden;*/
`;
export const DialogTitle = styled.h1``;

const Dialog = props => {
	let paneDef = props.dialogDef.getIn(['panes', props.dialogData.get('showPane') || 0]) || Immutable.Map();
	let Pane = paneTypes[paneDef.get('type')] || (() => null);
	let cancelButton = paneDef.get('cancelButton') ? paneDef.get('cancelButton').toJS() : null;
	let cancelProvider = paneDef.get('cancelProvider') ? paneDef.get('cancelProvider').toJS() : null;
	let cancelAction = cancelButton ? () => {
		// Cancel and close dialog
		console.log('Cancel', props.dialogDef.get('name')); // eslint-disable-line no-console
		if (cancelProvider) {
			// Fire off a call to the provider if one exists, send dialog name.
		}
	} : null;
	let nextButton = paneDef.get('nextButton') ? paneDef.get('nextButton').toJS() : null;
	let nextAction = paneDef.get('nextButton') ? () => {
		// Switch to next pane - set or increment dialogData[showPane]
		console.log('Next', props.dialogDef.get('name')); // eslint-disable-line no-console
	} : null;
	let finishButton = paneDef.get('finishButton') ? paneDef.get('finishButton').toJS() : null;
	let finishAction = paneDef.get('finishButton') && paneDef.get('finishProvider') ? () => {
		// Complete dialog activity, send back data using provider
		console.log('Finish', props.dialogDef.get('name'), props.dialogData.toJS()); // eslint-disable-line no-console
	} : null;
	return <DialogBox>
		{paneDef.get('headline') ? <DialogTitle>{paneDef.get('headline')}</DialogTitle> : null}
		<Pane dialogName={props.dialogDef.get('name')} paneDef={paneDef} itemGroups={props.itemGroups} dialogData={props.dialogData} dispatch={props.dispatch}/>
		{ cancelButton ? <ActionButton action={cancelAction} {...cancelButton}/> : null}
		{ nextButton ? <ActionButton action={nextAction} {...nextButton}/> : null}
		{ finishButton ? <ActionButton action={finishAction} {...finishButton}/> : null}
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
