import expect from 'unittest/helpers/expect.js';
import pageTree, * as actions from 'console/state/reducers/pageTree.js';
import Immutable from 'immutable';

describe('Page tree', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let state = pageTree(undefined, {});
		return expect(state, 'to equal', Immutable.fromJS({}));
	});

	it('outputs the same state object if no action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = pageTree(oldState, {});
		return expect(newState, 'to be', oldState);
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'SET_NODE', 'PAGE_TREE.SET_NODE')
		.and('to have property', 'OPEN_NODE', 'PAGE_TREE.OPEN_NODE')
		.and('to have property', 'CLOSE_NODE', 'PAGE_TREE.CLOSE_NODE')
	);

	describe('Set node', () => {
		let setNode = actions.setNode;

		it('creates action for setting a tree node', () => {
			let action = setNode('testnode', { name: 'testnode', children: [] });
			return expect(action, 'to be an action of type', actions.SET_NODE)
			.and('to have property', 'name', 'testnode')
			.and('to have property', 'node', { name: 'testnode', children: [] });
		});
	});

	describe('Open node', () => {
		let openNode = actions.openNode;

		it('creates action for opening a tree node', () => {
			let action = openNode('testnode');
			return expect(action, 'to be an action of type', actions.OPEN_NODE)
			.and('to have property', 'name', 'testnode');
		});
	});

	describe('Close node', () => {
		let closeNode = actions.closeNode;

		it('creates action for opening a tree node', () => {
			let action = closeNode('testnode');
			return expect(action, 'to be an action of type', actions.CLOSE_NODE)
			.and('to have property', 'name', 'testnode');
		});
	});

	describe('Action responses', () => {
		let oldState;
		beforeEach(() => {
			oldState = Immutable.fromJS({
				values: {
					thing: 'do not touch'
				}
			});
		});

		describe('Set node', () => {
			it('writes a node to the node list', () => {
				let newState = pageTree(oldState, {
					type: actions.SET_NODE,
					name: 'testnode',
					node: {
						foo: 'test'
					}
				});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', Immutable.fromJS({
					testnode: {
						foo: 'test'
					}
				}));
			});
		});

		describe('Open node', () => {
			beforeEach(() => {
				oldState = oldState.set('testnode', Immutable.fromJS({ name: 'testnode' }));
			});

			it('opens an existing node', () => {
				let newState = pageTree(oldState, {
					type: actions.OPEN_NODE,
					name: 'testnode'
				});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', { testnode: { open: true }});
			});

			it('does nothing if node does not exist', () => {
				let newState = pageTree(oldState, {
					type: actions.OPEN_NODE,
					name: 'notanode'
				});
				return expect(newState, 'to be', oldState);
			});
		});

		describe('Close node', () => {
			beforeEach(() => {
				oldState = oldState.set('testnode', Immutable.fromJS({ name: 'testnode' }));
			});

			it('closes an existing node', () => {
				let newState = pageTree(oldState, {
					type: actions.CLOSE_NODE,
					name: 'testnode'
				});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', { testnode: { open: false }});
			});

			it('does nothing if node does not exist', () => {
				let newState = pageTree(oldState, {
					type: actions.CLOSE_NODE,
					name: 'notanode'
				});
				return expect(newState, 'to be', oldState);
			});
		});
	});
});
