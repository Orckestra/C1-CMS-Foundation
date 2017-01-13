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
		let dispatch, wampCall, loadTreeNodes;
		beforeEach(() => {
			loadTreeNodes = actions.loadTreeNodes;
			dispatch = sinon.spy().named('dispatch');
			let rawNodes = [
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
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs('mock.struct.node', ['failNode']).returns(Promise.reject(new Error('test error')));
			wampCall.withArgs('mock.struct.node', ['testNode1', 'testNode2']).returns(Promise.resolve(rawNodes));
			WAMPClient.setMock(wampCall);
		});

		afterEach(() => {
			WAMPClient.reset();
		});

		it('creates a thunk that loads nodes and saves them to state', () => {
			return expect(() =>
				expect(loadTreeNodes, 'when called with', ['testNode11'])
				.then(thunk =>
					expect(thunk, 'to be a function')
				),
				'not to error');
		});
	});
});
