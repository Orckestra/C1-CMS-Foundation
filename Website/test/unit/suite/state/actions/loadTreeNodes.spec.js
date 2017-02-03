import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import { SET_NODE } from 'console/state/reducers/pageTree.js';
import * as actions from 'console/state/actions/loadTreeNodes.js';
import WAMPClient from 'console/access/wampClient.js';
import Immutable from 'immutable';

describe('Tree nodes', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_TREE_NODES')
		.and('to have property', 'LOAD_TREE_NODES_DONE')
		.and('to have property', 'LOAD_TREE_NODES_FAILED')
	);

	describe('loadTreeNodes', () => {
		let dispatch, wampCall, loadTreeNodes, provider, rootNode, rawNodes;
		beforeEach(() => {
			loadTreeNodes = actions.loadTreeNodes;
			dispatch = sinon.spy().named('dispatch');
			rootNode = {
				name: 'testNodeRoot',
				childrenLoaded: false,
				open: false,
				children: ['testNode1', 'testNode2']
			};
			rawNodes = [
				{
					name: 'testNode1',
					label: 'Testing node #1',
					iconBase: 'test',
					children: ['subnode1', 'subnode2', 'subnode3']
				},
				{
					name: 'testNode2',
					label: 'Testing Node #2',
					icon: 'page'
				}
			];
			provider = { uri: 'mock.struct.node' };
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs(provider.uri, ['failNode']).returns(Promise.reject(new Error('test error')));
			wampCall.withArgs(provider.uri, ['testNode1', 'testNode2']).returns(Promise.resolve(rawNodes));
			wampCall.withArgs(provider.uri, ['testNoNode1', 'testNoNode2']).returns(Promise.resolve(null));
			WAMPClient.setMock(wampCall);
		});

		afterEach(() => {
			WAMPClient.reset();
		});

		it('creates a thunk that loads nodes and saves them to state', () => {
			return expect(() =>
				expect(loadTreeNodes, 'when called with', [provider, rootNode])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES, provider, node: rootNode }] },
					{ spy: dispatch, args: [{ type: SET_NODE, name: 'testNode1', node: rawNodes[0] }] },
					{ spy: dispatch, args: [{ type: SET_NODE, name: 'testNode2', node: rawNodes[1] }] },
					{ spy: dispatch, args: [{ type: SET_NODE, name: 'testNodeRoot', node: {
						name: 'testNodeRoot',
						childrenLoaded: true,
						open: true,
						children: ['testNode1', 'testNode2']
					} }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES_DONE, provider, node: rootNode }] }
				])
			);
		});

		it('handles no nodes being returned', () => {
			rootNode.children = ['testNoNode1', 'testNoNode2'];
			return expect(() =>
				expect(loadTreeNodes, 'when called with', [provider, rootNode])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES, provider, node: rootNode }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES_FAILED, provider, node: rootNode, message: 'No nodes returned' }] }
				])
			);
		});

		it('sends word of unhandled errors', () => {
			rootNode.children = ['failNode'];
			return expect(() =>
				expect(loadTreeNodes, 'when called with', [provider, rootNode])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES, provider, node: rootNode }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_TREE_NODES_FAILED, provider, node: rootNode, message: 'test error' }] }
				])
			);
		});
	});

	describe('loadRootNode', () => {
		let dispatch, getState, wampCall, loadRootNode, provider, rootName, rootNode, firstNodes, subNodes;
		beforeEach(() => {
			loadRootNode = actions.loadRootNode;
			dispatch = sinon.spy(action => {
				if (typeof action === 'function') {
					return action(dispatch);
				} else {
					return null;
				}
			}).named('dispatch');
			rootName = 'testNodeRoot';
			rootNode = {
				name: 'testNodeRoot',
				children: ['testNode1', 'testNode2']
			};
			firstNodes = [
				{
					name: 'testNode1',
					label: 'Testing node #1',
					iconBase: 'test',
					children: ['subnode1', 'subnode2', 'subnode3']
				},
				{
					name: 'testNode2',
					label: 'Testing Node #2',
					icon: 'page'
				}
			];
			subNodes = [
				{
					name: 'subnode1',
					label: 'Sub Node #1',
					icon: 'page'
				},
				{
					name: 'subnode2',
					label: 'Sub Node #2',
					icon: 'page'
				},
				{
					name: 'subnode3',
					label: 'Sub Node #3',
					icon: 'page'
				}
			];
			provider = { uri: 'mock.struct.node' };
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs(provider.uri, ['failNode']).returns(Promise.reject(new Error('test error')));
			wampCall.withArgs(provider.uri, ['testNodeRoot']).returns(Promise.resolve([rootNode]));
			wampCall.withArgs(provider.uri, ['testNode1', 'testNode2']).returns(Promise.resolve(firstNodes));
			wampCall.withArgs(provider.uri, ['subnode1', 'subnode2', 'subnode3']).returns(Promise.resolve(subNodes));
			wampCall.withArgs(provider.uri, ['testNoNode']).returns(Promise.resolve(null));
			WAMPClient.setMock(wampCall);
			let stateObj = Immutable.fromJS({
				pageTree: {
					testNodeRoot: rootNode,
					testNode1: firstNodes[0]
				}
			});
			getState = sinon.stub().named('getState').returns(stateObj);
		});

		afterEach(() => {
			WAMPClient.reset();
		});

		it('creates a thunk that loads a root node by name, and its children and first grandchildren', () => {
			return expect(() =>
				expect(loadRootNode, 'when called with', [provider, rootName])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch, getState])
				),
				'not to error')
			.then(() => Promise.all([
				expect(dispatch, 'to have no calls satisfying', { args: [{ type: actions.LOAD_TREE_NODES_FAILED }] }),
				expect([wampCall], 'to have calls satisfying', [
					{ args: [provider.uri, ['testNodeRoot']] },
					{ args: [provider.uri, ['testNode1', 'testNode2']] },
					{ args: [provider.uri, ['subnode1', 'subnode2', 'subnode3']] }
				])
			]));
		});

		it('handles no nodes being returned', () => {
			return expect(() =>
				expect(loadRootNode, 'when called with', [provider, 'testNoNode'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'not to error')
			.then(() =>
				expect(dispatch, 'to have calls satisfying', [
					{ args: [{ type: actions.LOAD_TREE_NODES, provider, nodeName: 'testNoNode' }] },
					{ args: [{ type: actions.LOAD_TREE_NODES_FAILED, provider, nodeName: 'testNoNode', message: 'Root node "testNoNode" not found' }] }
				])
			);
		});

		it('sends word of unhandled errors', () => {
			return expect(() =>
				expect(loadRootNode, 'when called with', [provider, 'failNode'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'not to error')
			.then(() =>
				expect(dispatch, 'to have calls satisfying', [
					{ args: [{ type: actions.LOAD_TREE_NODES, provider, nodeName: 'failNode' }] },
					{ args: [{ type: actions.LOAD_TREE_NODES_FAILED, provider, nodeName: 'failNode', message: 'test error' }] }
				])
			);
		});
	});
});
