import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import sinon from 'sinon';
import BrowserPage, * as b from 'console/components/presentation/BrowserPage.js';
import Splitter from 'console/components/presentation/Splitter.js';

describe('BrowserPage', () => {
	let renderer, props, actions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		actions = {
			openNode: () => {},
			closeNode: () => {},
			loadChildren: () => () => () => {},
			selectNode: () => {},
			updateSplitPosition: () => {}
		};
		props = {
			tree: Immutable.fromJS({
				name: 'testRoot',
				children: [
					{
						name: 'test1',
						label: 'Node 1',
						iconBase: 'test',
						open: true,
						childrenLoaded: true,
						children: [
							{
								name: 'test11',
								label: 'Subnode 1.1'
							}
						]
					},
					{
						name: 'test2',
						label: 'Node 2',
						iconBase: 'test',
						children: ['notloaded1', 'notloaded2']
					},
					{
						name: 'test3',
						label: 'Node 3',
						icon: 'test'
					}
				]
			}),
			selectedNode: 'test2',
			tabDef: Immutable.fromJS({
				provider: {
					protocol: 'wamp',
					uri: 'test.nothing'
				}
			}),
			splitPosition: 350,
			actions: {
				openNode: () => actions.openNode,
				closeNode: () => actions.closeNode,
				loadChildren: () => () => () => actions.loadChildren,
				selectNode: () => actions.selectNode,
				updatePosition: () => actions.updateSplitPosition
			}
		};
	});

	it('renders a browser', () => {
		renderer.render(<BrowserPage {...props}/>);
		return expect(renderer, 'to have rendered', (
			<b.Wrapper>
				<b.Browser splitPosition={350}>
					<b.TreeNode key='test1' node={props.tree.getIn(['children', 0])} actions={props.actions}/>
					<b.TreeNode key='test2' node={props.tree.getIn(['children', 1])} actions={props.actions}/>
					<b.TreeNode key='test3' node={props.tree.getIn(['children', 2])} actions={props.actions}/>
				</b.Browser>
				<b.Preview/>
				<Splitter/>
			</b.Wrapper>
		));
	});

	it('renders tree node with children', () => {
		renderer.render(<b.TreeNode key='test1' node={props.tree.getIn(['children', 0])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<b.Node>
				<b.NodeOpen id='chevron-down'/>
				<b.NodeLabel>
					<b.NodeIcon id='test-open'/>
					<b.NodeName>
						Node 1
					</b.NodeName>
				</b.NodeLabel>
				<b.NodeGroup>
					<b.TreeNode  key='test11' node={props.tree.getIn(['children', 0, 'children', 0])} actions={props.actions}/>
				</b.NodeGroup>
			</b.Node>
		));
	});

	it('renders closed tree node with unloaded children', () => {
		renderer.render(<b.TreeNode key='test2' node={props.tree.getIn(['children', 1])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<b.Node>
				<b.NodeOpen id='chevron-right'/>
				<b.NodeLabel>
					<b.NodeIcon id='test-closed'/>
					<b.NodeName>
						Node 2
					</b.NodeName>
				</b.NodeLabel>
			</b.Node>
		));
	});

	it('renders leaf tree node', () => {
		renderer.render(<b.TreeNode key='test3' node={props.tree.getIn(['children', 2])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<b.Node>
				<b.NodeLabel>
					<b.NodeIcon id='test'/>
					<b.NodeName>
						Node 3
					</b.NodeName>
				</b.NodeLabel>
			</b.Node>
		));
	});

	it('renders leaf tree node without icon', () => {
		renderer.render(<b.TreeNode  key='test11' node={props.tree.getIn(['children', 0, 'children', 0])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<b.Node>
				<b.NodeLabel>
					<b.NodeIcon id='data-interface-closed'/>
					<b.NodeName>
						Subnode 1.1
					</b.NodeName>
				</b.NodeLabel>
			</b.Node>
		));
	});

	describe('node opener functions', () => {
		let getOpener = b.getNodeOpenToggler, actions, node;
		beforeEach(() => {
			node = Immutable.fromJS({
				name: 'test',
				children: ['foo', 'bar']
			});
			actions = {
				openNode: sinon.spy().named('openNode'),
				closeNode: sinon.spy().named('closeNode'),
				loadChildren: sinon.spy().named('loadChildren')
			};
		});

		it('loads children if unloaded', () =>
			expect(getOpener, 'when called with', [node, actions], 'when called')
			.then(() => expect(actions.loadChildren, 'was called'))
		);

		it('opens node when loaded', () =>
			expect(getOpener, 'when called with', [node.set('childrenLoaded', true), actions], 'when called')
			.then(() => expect(actions.openNode, 'was called'))
		);

		it('closes open, loaded node', () =>
			expect(getOpener, 'when called with', [node.set('childrenLoaded', true).set('open', true), actions], 'when called')
			.then(() => expect(actions.closeNode, 'was called'))
		);
	});
});
