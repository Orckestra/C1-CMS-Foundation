import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import { setDialogState } from 'console/state/reducers/dialog.js';

// two-dimensional structure: Categories containing components.
// Category has headline, open state, contains list of components
// Component has preview image url, label, description

// TODO: Restyle for use in actual dialogs.
export const Dialog = styled.div`
	background-color: ${colors.fieldsetBackgroundColor};
	height: 100%;
/*	max-width: 880px;
	overflow: hidden;*/
`;
export const DialogTitle = styled.h1``;

export const ItemGroup = styled.div`
	overflow: hidden;
`;
export const ItemGroupTitle = styled.h2`
`;
export const Item = styled.div`
	float: left;
	width: 420px;
	height: 140px;
	margin-left: 15px;
	margin-bottom: 15px;
	position: relative;
	background-color: ${ props => props.active ? colors.darkBackground : 'white' };
	border-radius: 5px;
	border-width: 1px;
	border-color: ${colors.borderColor};
	border-style: ${ props => props.active ? 'solid' : 'dashed' };
`;
export const Preview = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	left: 20px;
	top: 15px;
	padding: 5px;
	border-radius: 5px;
	border: 1px solid ${colors.borderColor};
	background-color: white;
	background-image: url(${props => props.image});
	background-position: center center;
	background-repeat: no-repeat;
`;
export const Label = styled.h3`
	position: absolute;
	left: 150px;
	top: 0;
`;
export const Description = styled.p`
	position: absolute;
	left: 150px;
	top: 40px;
	width: 260px;
`;

const Palette = props => {
	return <Dialog>
		{props.dialogDef.get('headline') ? <DialogTitle>{props.dialogDef.get('headline')}</DialogTitle> : null}
		{props.itemGroups.map(itemGroup =>
			<ItemGroup
				key={itemGroup.get('name')}>
				<ItemGroupTitle>{itemGroup.get('label')}</ItemGroupTitle>
				{itemGroup.get('entries').map(item => {
					let itemName = item.get('name');
					return <Item
						key={item.get('name')}
						onClick={() => props.dispatch(
							setDialogState(
								props.dialogDef.get('name'),
								props.dialogData.set('selectedItem', itemName)
							)
						)}
						active={itemName === props.dialogData.get('selectedItem')}>
						<Preview image={item.get('previewImageUrl')}/>
						<Label>{item.get('label')}</Label>
						<Description>{item.get('description')}</Description>
					</Item>;
				}).toArray()}
			</ItemGroup>
		).toArray()}
	</Dialog>;
};

Palette.propTypes = {
	dialogData: ImmutablePropTypes.mapContains({
		selectedItem: PropTypes.string
	}),
	dialogDef: ImmutablePropTypes.mapContains({
		name: PropTypes.string.isRequired,
		headline: PropTypes.string
	}).isRequired,
	itemGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		entries: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
	})).isRequired,
	dispatch: PropTypes.func.isRequired
};

export default Palette;
