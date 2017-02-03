import WAMPClient from 'console/access/wampClient.js';
import { setNode } from 'console/state/reducers/pageTree.js';

const prefix = 'TREE_NODES.';
const loadPageDefActionType = prefix + 'LOAD';
export const LOAD_TREE_NODES = loadPageDefActionType + '_COMMENCE';
export const LOAD_TREE_NODES_DONE = loadPageDefActionType + '_DONE';
export const LOAD_TREE_NODES_FAILED = loadPageDefActionType + '_FAIL';

export function loadTreeNodes(provider, node) {
	return (dispatch) => {
		dispatch({ type: LOAD_TREE_NODES, provider, node });
		return WAMPClient.call(provider.uri, node.children)
		.then(nodes => {
			if (nodes) {
				nodes.forEach(childNode => {
					dispatch(setNode(childNode.name, childNode));
				});
				node.childrenLoaded = true;
				node.open = true;
				dispatch(setNode(node.name, node));
				dispatch({ type: LOAD_TREE_NODES_DONE, provider, node });
			} else {
				dispatch({ type: LOAD_TREE_NODES_FAILED, provider, node, message: 'No nodes returned' });
			}
		})
		.catch(err => {
			dispatch({ type: LOAD_TREE_NODES_FAILED, provider, node, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}

export function loadRootNode(provider, nodeName) {
	return (dispatch, getState) => {
		dispatch({ type: LOAD_TREE_NODES, provider, nodeName });
		return WAMPClient.call(provider.uri, [nodeName])
		.then(nodes => {
			if (!nodes) {
				return dispatch({
					type: LOAD_TREE_NODES_FAILED,
					provider,
					nodeName,
					message: 'Root node "' + nodeName + '" not found'
				});
			}
			let node = nodes[0];
			// loadTreeNodes will also save the parent node
			dispatch(loadTreeNodes(provider, node))
			.then(() =>
				dispatch({ type: LOAD_TREE_NODES_DONE, provider, nodeName })
			)
			.then(() => {
				// Open first child
				let firstChildName = getState().getIn(['pageTree', nodeName, 'children', 0]);
				let firstChild = getState().getIn(['pageTree', firstChildName]);
				return dispatch(loadTreeNodes(provider, firstChild.toJS()));
			});
		})
		.catch(err => {
			dispatch({ type: LOAD_TREE_NODES_FAILED, provider, nodeName, message: err.message, stack: err.stack });
			// console.error(err); // eslint-disable-line no-console
		});
	};
}
