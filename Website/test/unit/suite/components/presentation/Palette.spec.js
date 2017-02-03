import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import sinon from 'sinon';
import Palette, * as p from 'console/components/presentation/Palette.js';

describe('Palette', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			index: 3,
			itemGroups: Immutable.fromJS([
				{
					name: 'group1',
					title: 'First group',
					entries: [
						{
							id: 'entry1',
							title: 'First entry',
							description: 'All manner of words',
							componentImage: { customImageUri: '/path/to/image1.png' } // Media URI resolves to /media/ reference
						},
						{
							id: 'entry2',
							title: 'Second entry',
							description: 'Some other words',
							componentImage: { iconName: 'testicon', customImageUri: '/path/to/image2.png' }
						}
					]
				},
				{
					name: 'group2',
					title: 'Second group',
					entries: [
						{
							id: 'entry3',
							title: 'Third entry',
							description: 'Words to live by',
							componentImage: { iconName: 'testicon' }
						},
						{
							id: 'entry4',
							title: 'Fourth entry',
							description: 'Words to die for',
							componentImage: {}
						}
					]
				}
			]),
			paneDef: Immutable.fromJS({
				name: 'testpalette',
				select: {},
				noItemsText: 'Testing no items'
			}),
			dialogData: Immutable.fromJS({ selectedItem: 'entry2', closed: { group2: true } }),
			updateDialogData: sinon.spy().named('updateDialogData'),
			nextAction: sinon.spy().named('nextAction')
		};
	});

	it('renders an empty palette', () => {
		props.itemGroups = Immutable.List();
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'to have exactly rendered', <div>
			<p.NoComponentsLabel>
				<p.NoComponentsIcon/><br/>
				Testing no items
			</p.NoComponentsLabel>
		</div>);
	});

	it('renders a palette', () => {
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'to have rendered', <div>
			<p.ItemGroup key='group1'>
				<div>
					<p.ItemGroupTop>
						<p.ItemGroupTitle>First group</p.ItemGroupTitle>
					</p.ItemGroupTop>
				</div>
				<p.Item key='entry1' active={false}>
					<p.InfoBox>
						<p.Label>First entry</p.Label>
						<p.Description>All manner of words</p.Description>
					</p.InfoBox>
				</p.Item>
				<p.Item key='entry2' active={true}>
					<p.PreviewImage image='/path/to/image2.png'/>
					<p.InfoBox>
						<p.Label>Second entry</p.Label>
						<p.Description>Some other words</p.Description>
					</p.InfoBox>
				</p.Item>
			</p.ItemGroup>
			<p.ItemGroup key='group2'>
				<div>
					<p.ItemGroupTop>
						<p.ItemGroupTitle>Second group</p.ItemGroupTitle>
					</p.ItemGroupTop>
				</div>
				<p.Item key='entry3' active={false} closed>
					<p.InfoBox>
						<p.Label>Third entry</p.Label>
						<p.Description>Words to live by</p.Description>
					</p.InfoBox>
				</p.Item>
				<p.Item key='entry4' active={false} closed>
					<p.PreviewIcon id='base-function-function'/>
					<p.InfoBox>
						<p.Label>Fourth entry</p.Label>
						<p.Description>Words to die for</p.Description>
					</p.InfoBox>
				</p.Item>
			</p.ItemGroup>
		</div>);
	});

	it('can select on finish with a double click', () => {
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'with event', 'doubleClick', 'on', <p.Item id='entry2'/>)
		.then(() => Promise.all([
			expect(props.updateDialogData, 'to have calls satisfying', [
				{args: [Immutable.fromJS({ selectedItem: 'entry2' })]}
			]),
			expect(props.nextAction, 'was called')
		]));
	});

	it('can select items', () => {
		let useProv = sinon.spy().named('updateDialogData');
		return expect(p.itemSelector(
			Immutable.fromJS({
				id: 'test',
				componentDefinition: 'testDef'
			}),
			{
				dialogData: Immutable.Map(),
				paneDef: Immutable.fromJS({ select: { test: 'provider' }}),
				updateDialogData: useProv
			}
		), 'to be a function')
		.and('when called')
		.then(() => Promise.all([
			expect(useProv, 'to have calls satisfying', [
				{ args: [Immutable.fromJS({
					selectedItem: 'test',
					selectedData: 'testDef'
				})] }
			])
		]));
	});

	it('can open item groups', () => {
		let useProv = sinon.spy().named('updateDialogData');
		return expect(p.toggleGroupOpen(
			Immutable.fromJS({
				name: 'test'
			}),
			{
				dialogData: Immutable.fromJS({
					closed: {
						test: true
					}
				}),
				paneDef: Immutable.fromJS({ select: { test: 'provider' }}),
				updateDialogData: useProv
			}
		), 'to be a function')
		.and('when called')
		.then(() => Promise.all([
			expect(useProv, 'to have calls satisfying', [
				{ args: [Immutable.fromJS({
					closed: {
						test: false
					}
				})] }
			])
		]));
	});

	it('can close item groups', () => {
		let useProv = sinon.spy().named('updateDialogData');
		return expect(p.toggleGroupOpen(
			Immutable.fromJS({
				name: 'test'
			}),
			{
				dialogData: Immutable.fromJS({
					closed: {
						test: false
					}
				}),
				paneDef: Immutable.fromJS({ select: { test: 'provider' }}),
				updateDialogData: useProv
			}
		), 'to be a function')
		.and('when called')
		.then(() => Promise.all([
			expect(useProv, 'to have calls satisfying', [
				{ args: [Immutable.fromJS({
					closed: {
						test: true
					}
				})] }
			])
		]));
	});

	it('can close the first item group', () => {
		let useProv = sinon.spy().named('updateDialogData');
		return expect(p.toggleGroupOpen(
			Immutable.fromJS({
				name: 'test'
			}),
			{
				dialogData: Immutable.fromJS({
				}),
				paneDef: Immutable.fromJS({ select: { test: 'provider' }}),
				updateDialogData: useProv
			}
		), 'to be a function')
		.and('when called')
		.then(() => Promise.all([
			expect(useProv, 'to have calls satisfying', [
				{ args: [Immutable.fromJS({
					closed: {
						test: true
					}
				})] }
			])
		]));
	});
});
