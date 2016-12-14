import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import { setDialogState } from 'console/state/reducers/dialog.js';
import Icon from 'console/components/presentation/Icon.js';

// two-dimensional structure: Categories containing components.
// Category has headline, open state, contains list of components
// Component has preview image url, label, description

export const ItemGroup = styled.div`
	overflow: hidden;
`;
export const ItemGroupTitle = styled.h2`
	color: ${colors.dialogHeaderColor};
	margin-top: 0;
	font-family: 'Roboto Condensed', sans-serif;
	font-style: italic;
	font-size: 14px;
	font-weight: normal;
	text-transform: uppercase;
`;
export const Item = styled.div`
	float: left;
	width: 420px;
	height: 140px;
	margin-right: 15px;
	margin-bottom: 15px;
	position: relative;
	background-color: ${ props => props.active ? colors.darkBackground : 'white' };
	border-radius: 5px;
	border-width: 1px;
	border-color: ${colors.borderColor};
	border-style: ${ props => props.active ? 'solid' : 'dashed' };
`;
export const PreviewImage = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	left: 20px;
	top: 15px;
	padding: 5px;
	border-radius: 5px;
	border: 1px solid ${colors.borderColor};
	background-color: white;
	background-image: url(${ props => props.image });
	background-position: center center;
	background-repeat: no-repeat;
`;
export const PreviewIcon = styled(Icon)`
	width: 100px;
	height: 100px;
	position: absolute;
	left: 20px;
	top: 15px;
	padding: 5px;
	border-radius: 5px;
	border: 1px solid ${colors.borderColor};
	background-color: white;
`;
export const Label = styled.h3`
	position: absolute;
	left: 150px;
	top: 0;
	font-weight: normal;
	color: ${colors.fieldLabelColor};
`;
export const Description = styled.p`
	position: absolute;
	left: 150px;
	top: 26px;
	width: 260px;
	max-height: 80px;
	overflow-y: auto;
`;

function resolveMediaURI(uri) {
	return '/media(' + uri + ')?mw=100&mh=100';
}

const Palette = props => {
	return <div>
		{props.itemGroups.map(itemGroup =>
			<ItemGroup
				key={itemGroup.get('name')}>
				<ItemGroupTitle>{itemGroup.get('title')}</ItemGroupTitle>
				{itemGroup.get('entries').map(item => {
					let itemName = item.get('id');
					return <Item
						key={itemName}
						onClick={() => props.dispatch(
							setDialogState(
								props.dialogName,
								props.dialogData
									.set('selectedItem', itemName)
									.set('selectedComponentDefinition', item.get('componentDefinition'))
							)
						)}
						active={itemName === props.dialogData.get('selectedItem')}>
						{
							item.getIn(['imageUri', 'customImageUri']) ?
							<PreviewImage image={resolveMediaURI(item.getIn(['imageUri', 'customImageUri']))}/> :
							<PreviewIcon id={item.getIn(['imageUri', 'iconName']) || 'base-function-function'}/>
						}
						<Label>{item.get('title')}</Label>
						<Description>{item.get('description')}</Description>
					</Item>;
				}).toArray()}
			</ItemGroup>
		).toArray()}
	</div>;
};

Palette.propTypes = {
	dialogName: PropTypes.string.isRequired,
	dialogData: ImmutablePropTypes.mapContains({
		selectedItem: PropTypes.string
	}),
	paneDef: ImmutablePropTypes.mapContains({
		name: PropTypes.string.isRequired,
		headline: PropTypes.string
	}).isRequired,
	itemGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		entries: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
	})).isRequired,
	dispatch: PropTypes.func.isRequired
};

export default Palette;
