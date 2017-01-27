import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';

// two-dimensional structure: Categories containing components.
// Category has headline, open state, contains list of components
// Component has preview image url, label, description

const itemOpenCloseTime = '200ms';

export const ItemGroup = styled.div`
	overflow: hidden;
`;
export const ItemGroupTop = styled.div`
	position: relative;
	display: inline-block;
	width: max-content;
	cursor: default;
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
export const ItemGroupSwitch = styled(Icon)`
	position: absolute;
	right: -15px;
	top: 3px;
	height: 10px;
	width: 10px;
`;
export const ItemGroupCount = styled.div`
	position: absolute;
	right: -20px;
	transform: translateX(100%);
	top: 0;
`;
export const Item = styled.div`
	float: left;
	width: 420px;
	margin-right: 15px;
	position: relative;
	border-radius: 5px;
	border-color: ${colors.borderColor};
	${props => props.active ?
		'background-color: ' + colors.darkBackground + '; border-style: solid;' :
		'	background-color: white; border-style: dashed;'
	}
	${props => props.closed ?
		'height: 0; margin-bottom: 0; border-width: 0; opacity: 0;' :
		'height: 140px; margin-bottom: 15px; border-width: 1px; opacity: 1;'
	}
	transition:
		opacity ${itemOpenCloseTime},
		height ${itemOpenCloseTime},
		border-width ${itemOpenCloseTime},
		background-color ${itemOpenCloseTime},
		margin-bottom ${itemOpenCloseTime};
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
	background-image: url('${ props => props.image }');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
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
export const InfoBox = styled.div`
	position: absolute;
	left: 150px;
	top: 15px;
	width: 260px;
	height: 112px;
	overflow-y: auto;
`;
export const Label = styled.h3`
	font-weight: normal;
	color: ${colors.fieldLabelColor};
	margin: 0 0 10px;
`;
export const Description = styled.p`
margin: 10px 0;
`;

export const NoComponentsLabel = styled.div`
	color: ${colors.fieldLabelColor};
	margin: 150px auto;
	text-align: center;
	font-size: 24px;
`;
export const NoComponentsIcon = styled(Icon)`
	height: 60px;
	width: 60px;
`;
NoComponentsIcon.defaultProps = { id: 'close'};

function resolveMediaURI(uri) {
	return uri;
}

export function toggleGroupOpen(itemGroup, props) {
	return () => {
		let closed = props.dialogData.get('closed') || Immutable.Map();
		closed = closed.set(itemGroup.get('name'), !closed.get(itemGroup.get('name')));
		props.updateDialogData(props.dialogData.set('closed', closed));
	};
}

export function itemSelector(item, props) {
	return () => props.updateDialogData(
		props.dialogData
		.set('selectedItem', item.get('id'))
		.set('selectedData', item.get('componentDefinition'))
	);
}

const Palette = props => {
	return <div>
		{props.itemGroups.size === 0 ?
			<NoComponentsLabel>
				<NoComponentsIcon/><br/>
				{props.paneDef.get('noItemsText')}
			</NoComponentsLabel> :
			null}
		{props.itemGroups.map(itemGroup =>
			<ItemGroup
				key={itemGroup.get('name')}>
				<div>
					<ItemGroupTop
					onClick={toggleGroupOpen(itemGroup, props)}>
						<ItemGroupSwitch
							id={props.dialogData.getIn(['closed', itemGroup.get('name')]) ?
								'chevron-right' :
								'chevron-down'
							}
						/>
						<ItemGroupCount>({itemGroup.get('entries').size})</ItemGroupCount>
						<ItemGroupTitle>{itemGroup.get('title')}</ItemGroupTitle>
					</ItemGroupTop>
				</div>
				{itemGroup.get('entries').map(item => {
					let itemName = item.get('id');
					const selectItem = itemSelector(item, props);
					return (
						<Item
							closed={props.dialogData.getIn(['closed', itemGroup.get('name')])}
							key={itemName}
							onClick={selectItem}
							onDoubleClick={() => {
								selectItem();
								(props.nextAction && props.nextAction());
							}}
							active={itemName === props.dialogData.get('selectedItem')}>
							{
								item.getIn(['componentImage', 'customImageUri']) ?
								<PreviewImage image={resolveMediaURI(item.getIn(['componentImage', 'customImageUri']))}/> :
								<PreviewIcon id={item.getIn(['componentImage', 'iconName']) || 'base-function-function'}/>
							}
							<InfoBox>
								<Label>{item.get('title')}</Label>
								<Description>{item.get('description')}</Description>
							</InfoBox>
						</Item>
					);
				}).toArray()}
			</ItemGroup>
		).toArray()}
	</div>;
};

Palette.propTypes = {
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
	updateDialogData: PropTypes.func.isRequired,
	nextAction: PropTypes.func
};

export default Palette;
