import WAMPClient from 'console/access/wampClient.js';
import { setNode } from 'console/state/reducers/pageTree.js';

const prefix = 'TREE_NODES.';
const loadPageDefActionType = prefix + 'LOAD';
export const LOAD_TREE_NODES = loadPageDefActionType + '_COMMENCE';
export const LOAD_TREE_NODES_DONE = loadPageDefActionType + '_DONE';
export const LOAD_TREE_NODES_FAILED = loadPageDefActionType + '_FAIL';

export function loadTreeNodes(provider, nodeNames) {
	return (dispatch) => {
		let uri = provider.get('uri');
		dispatch({ type: LOAD_TREE_NODES, nodeNames });
		return WAMPClient.call(uri, nodeNames);
	};
}
