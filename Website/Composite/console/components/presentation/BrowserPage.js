import React, { PropTypes } from 'react';
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
	padding-top: 5px;
`;

export const NodeGroup = styled.div`
	margin-left: 25px;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -8px;
		bottom: 0;
		left: -5px;
		width: 0;
		border-left: 1px solid ${colors.browserLines};
	}
`;

export const Node = styled.div`
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
		top: 8px;
		left: -10px;
	}

	&:not(.top):last-child:before {
		background: ${colors.darkBackground};
		height: auto;
		top: 10px;
		bottom: 0;
	}
`;

export const NodeLabel = styled.div``;
export const NodeName = styled.p`
	padding-left: 45px;
	margin: 10px 0;
	height: 20px;
`;
export const NodeOpen = styled(Icon)`
	height: 10px;
	width: 10px;
	position: absolute;
	top: 0px;
	left: 0px;
	padding: 3px;
	color: ${props => props.open ? colors.buttonHighlightColor : colors.baseFontColor};
	background-color: ${colors.darkBackground};
`;
export const NodeIcon = styled(Icon)`
	position: absolute;
	top: -2px;
	left: 20px;
	height: 18px;
	width: 18px;
`;

function getNodeIcon(node) {
	if (node.get('icon')) {
		return node.get('icon');
	} else {
		let base = node.get('iconBase') || 'data-interface';
		return base + (node.get('open') ? '-open' : '-closed');
	}
}

export const TreeNode = props => (
	<Node className={props.className}>
		{props.node.get('children') ? (
			props.node.get('open') ?
				<NodeOpen
					onClick={() => props.actions.closeNode(props.node.get('name'))}
					id='chevron-down'
					open={true}/> :
				<NodeOpen
					onClick={props.node.get('childrenLoaded') ?
						() => props.actions.openNode(props.node.get('name')) :
						() => props.actions.loadChildren(props.node.toJS())
					}
					id='chevron-right'
					open={false}/>
			) :
			null}
		<NodeLabel>
			<NodeIcon id={getNodeIcon(props.node)}/>
			<NodeName>{props.node.get('label')}</NodeName>
		</NodeLabel>
		{props.node.get('childrenLoaded') && props.node.get('open') ?
			<NodeGroup className="nodeChildren">
				{props.node.get('children').map(node => (
					<TreeNode key={node.get('name')} actions={props.actions} node={node}/>
				)).toArray()}
			</NodeGroup>
			: null}
	</Node>
);

TreeNode.propTypes = {
	node: ImmutablePropTypes.map.isRequired,
	className: PropTypes.string,
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
		<Browser splitPosition={400}>
			{props.tree.get('children') ?
				props.tree.get('children').map(node => (
					<TreeNode key={node.get('name')} actions={actions} className='top' node={node}/>
				)).toArray() :
				null}
		</Browser>
	);
};

BrowserPage.propTypes = {
	tabDef: ImmutablePropTypes.map,
	tree: ImmutablePropTypes.map,
	actions: PropTypes.shape({
		openNode: PropTypes.func.isRequired,
		closeNode: PropTypes.func.isRequired,
		loadChildren: PropTypes.func.isRequired
	})
};

export default BrowserPage;
