import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';
import Splitter from 'console/components/presentation/Splitter.js';
import ScrollBox from 'console/components/presentation/ScrollBox.js';

export const Wrapper = styled(ScrollBox).withConfig({ displayName: 'Wrapper' })`
	padding: 0;
`;

export const Browser = styled.div.withConfig({ displayName: 'Browser' })`
	background-color: ${colors.darkBackground};
	height: 100%;
	width: ${props => props.splitPosition}px;
	box-sizing: border-box;
	border-right: 1px solid ${colors.borderColor};
	overflow: auto;
	padding-top: 5px;
	cursor: default;
`;

export const Preview = styled.div.withConfig({ displayName: 'Preview' })`
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: calc(100% - ${props => props.splitPosition}px);
	box-sizing: border-box;
	background-color: ${colors.darkBackground};
`;

export const NodeGroup = styled.div.withConfig({ displayName: 'NodeGroup' })`
	margin-left: 25px;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -5px;
		bottom: 0;
		left: -1px;
		width: 0;
		border-left: 1px solid ${colors.browserLines};
	}
`;

export const Node = styled.div.withConfig({ displayName: 'Node' })`
	position: relative;
	margin-left: 5px;


	&:not(.top):before {
		content: "";
		display: block;
		width: 18px;
		height: 0;
		border-top: 1px solid  ${colors.browserLines};
		margin-top: -1px;
		position: absolute;
		top: 13px;
		left: -6px;
	}

	&:not(.top):last-child:before {
		background: ${colors.darkBackground};
		height: auto;
		top: 13px;
		bottom: 0;
	}
`;

export const NodeLabel = styled.div.withConfig({ displayName: 'NodeLabel' })`
	margin: 5px 0 0;
	margin-left: 40px;
`;

export const NodeName = styled.p.withConfig({ displayName: 'NodeName' })`
	margin: 0;
	margin-left: 5px;
	padding: 5px;
	height: 16px;
	width: min-content;
	border-radius: 3px;

	${props => props.selected ?
		css`
			color: white;
			background-color: ${colors.buttonHighlightColor};
		` :
		''
	}
`;
export const NodeOpen = styled(Icon).withConfig({ displayName: 'NodeOpen' })`
	height: 10px;
	width: 10px;
	position: absolute;
	top: 5px;
	left: 3px;
	padding: 3px;
	color: ${props => props.open ? colors.buttonHighlightColor : colors.baseFontColor};
	background-color: ${colors.darkBackground};
`;
export const NodeIcon = styled(Icon).withConfig({ displayName: 'NodeIcon' })`
	position: absolute;
	top: 3px;
	left: 20px;
	height: 18px;
	width: 18px;

	${props => props.selected ?
		css`
			color: ${colors.buttonHighlightColor};
		` :
		''
	}
`;

function getNodeIcon(node) {
	if (node.get('icon')) {
		return node.get('icon');
	} else {
		let base = node.get('iconBase') || 'data-interface';
		return base + (node.get('open') ? '-open' : '-closed');
	}
}

export function getNodeOpenToggler(node, actions) {
	if (node.get('open') && node.get('childrenLoaded')) {
		return () => actions.closeNode(node.get('name'));
	} else {
		if (node.get('childrenLoaded')) {
			return () => actions.openNode(node.get('name'));
		} else {
			return () => actions.loadChildren(node.toJS());
		}
	}
}

export const TreeNode = props => (
	<Node className={props.className}>
		{props.node.get('children') ? (
			<NodeOpen
				onClick={getNodeOpenToggler(props.node, props.actions)}
				id={props.node.get('open') ? 'chevron-down' : 'chevron-right'}
				open={props.node.get('open')}/>
			) : null}
		<NodeLabel onClick={() => props.actions.selectNode(props.node.get('name'))}>
			<NodeIcon id={getNodeIcon(props.node)} selected={props.selectedNode === props.node.get('name')}/>
			<NodeName selected={props.selectedNode === props.node.get('name')}>{props.node.get('label')}</NodeName>
		</NodeLabel>
		{props.node.get('childrenLoaded') && props.node.get('open') ?
			<NodeGroup className="nodeChildren">
				{props.node.get('children').map(node => (
					<TreeNode key={node.get('name')} actions={props.actions} node={node} selectedNode={props.selectedNode}/>
				)).toArray()}
			</NodeGroup>
			: null}
	</Node>
);

TreeNode.propTypes = {
	node: ImmutablePropTypes.map.isRequired,
	className: PropTypes.string,
	selectedNode: PropTypes.string,
	actions: PropTypes.shape({
		openNode: PropTypes.func.isRequired,
		closeNode: PropTypes.func.isRequired,
		loadChildren: PropTypes.func.isRequired
	}).isRequired
};

const BrowserPage = props => {
	let actions = Object.assign({}, props.actions);
	actions.loadChildren = actions.loadChildren(props.tabDef.get('provider').toJS());
	return (
		<Wrapper>
			<Browser splitPosition={props.splitPosition}>
				{props.tree.get('children') ?
				props.tree.get('children').map(node => (
					<TreeNode key={node.get('name')} actions={actions} className='top' node={node} selectedNode={props.selectedNode}/>
				)).toArray() :
				null}
			</Browser>
			<Preview splitPosition={props.splitPosition}/>
			<Splitter splitPosition={props.splitPosition} updatePosition={props.actions.updatePosition}/>
		</Wrapper>
	);
};

BrowserPage.propTypes = {
	tabDef: ImmutablePropTypes.map,
	tree: ImmutablePropTypes.map,
	selectedNode: PropTypes.string,
	splitPosition: PropTypes.number.isRequired,
	actions: PropTypes.shape({
		openNode: PropTypes.func.isRequired,
		closeNode: PropTypes.func.isRequired,
		loadChildren: PropTypes.func.isRequired,
		updatePosition: PropTypes.func.isRequired
	})
};

export default BrowserPage;
