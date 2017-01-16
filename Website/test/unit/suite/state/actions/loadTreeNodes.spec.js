import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('Tree nodes', () => {
	let SET_NODE, WAMPClient, actions;
	before(done => {
		loadModules([
			{
				module: 'console/state/reducers/pageTree.js',
				moduleCb: m => { SET_NODE = m.SET_NODE; }
			},
			{
				module: 'console/state/actions/loadTreeNodes.js',
				moduleCb: m => { actions = m; }
			},
			{
				module: 'console/access/wampClient.js',
				moduleCb: m => { WAMPClient = m.default; }
			}
		], () => done());
	});

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
	});
});
