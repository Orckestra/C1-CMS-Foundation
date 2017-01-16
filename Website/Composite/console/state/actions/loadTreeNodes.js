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
				nodes.forEach(node => {
					dispatch(setNode(node.name, node));
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
			//console.error(err); // eslint-disable-line no-console
		});
	};
}
