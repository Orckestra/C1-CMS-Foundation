import { createSelector } from 'reselect';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import Immutable from 'immutable';

const allNodesSelector = state => state.get('pageTree');

function getNodeAndLoadedChildren(name, allNodes) {
	let node = allNodes.get(name);
	if (node.get('childrenLoaded') && node.get('children') && node.get('open')) {
		node = node.set(
			'children',
			node
				.get('children')
				.map(
					childName => getNodeAndLoadedChildren(childName, allNodes)
				)
		);
	}
	return node;
}

export const currentTreeSelector = createSelector(
	allNodesSelector,
	currentPageSelector,
	(nodes, pageDef) => {
		let root = nodes.get(pageDef.get('rootNode') || '');
		if (root) {
			root = root.set('children', root.get('children').map(nodeName => getNodeAndLoadedChildren(nodeName, nodes)));
			return root;
		} else {
			return Immutable.Map();
		}
	}
);
