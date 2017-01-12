import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';

export const Browser = styled.div`
	background-color: ${colors.darkBackground};
	height: 100%;
	width: ${props => props.splitPosition}px;
	border-right: 1px solid ${colors.borderColor};
	overflow: auto;
`;

export const NodeGroup = styled.div`
	margin-left: 40px;
`;

export const Node = styled.div`
	position: relative;
`;

export const NodeName = styled.p`
	padding-left: 45px;
	margin: 10px 0;
	height: 20px;
`;
export const NodeOpen = styled(Icon)`
	height: 10px;
	width: 10px;
	position: absolute;
	top: 3px;
	left: 3px;
	color: ${props => props.open ? colors.buttonHighlightColor : colors.baseFontColor};
`;
export const NodeIcon = styled(Icon)`
	position: absolute;
	top: -2px;
	left: 20px;
	height: 18px;
	width: 18px;
`;

function getNodeIcon(node) {
	if (node.get('children')) {
		let base = node.get('iconBase') || 'data-interface';
		return base + (node.get('open') ? '-open' : '-closed');
	} else {
		return node.get('icon') || 'unknown';
	}
}

function renderNodeSubTree(node) {
	if (typeof node === 'string') return null;
	return [
		<Node key={node.get('name')}>
			{node.get('children') ? <NodeOpen id={node.get('open') ? 'chevron-down' : 'chevron-right'} open={node.get('open')}/> : null}
			<NodeIcon id={getNodeIcon(node)}/>
			<NodeName>{node.get('label')}</NodeName>
		</Node>,
		<NodeGroup key={node.get('name') + '_children'}>
			{node.get('children') ? node.get('children').map(renderNodeSubTree).toArray() : null}
		</NodeGroup>
	];
}

const BrowserPage = props => (
	<Browser splitPosition={400}>
		{props.tree.get('children').map(renderNodeSubTree).toArray()}
	</Browser>
);

BrowserPage.propTypes = {
	tree: ImmutablePropTypes.map
};

export default BrowserPage;
