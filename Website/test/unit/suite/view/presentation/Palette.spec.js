import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Palette, { ItemGroup, ItemGroupTop, ItemGroupTitle, Item, PreviewImage, PreviewIcon, InfoBox, Label, Description } from 'console/components/presentation/Palette.js';

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
			paneDef: Immutable.Map({
				name: 'testdpalette'
			}),
			dialogName: 'testdialog',
			dialogData: Immutable.Map({ selectedItem: 'entry2' }),
			dispatch: () => {}
		};
	});

	it('renders a palette', () => {
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'to have rendered', <div>
			<ItemGroup key='group1'>
				<div>
					<ItemGroupTop>
						<ItemGroupTitle>First group</ItemGroupTitle>
					</ItemGroupTop>
				</div>
				<Item key='entry1' active={false}>
					<PreviewImage image='/path/to/image1.png'/>
					<InfoBox>
						<Label>First entry</Label>
						<Description>All manner of words</Description>
					</InfoBox>
				</Item>
				<Item key='entry2' active={true}>
					<PreviewImage image='/path/to/image2.png'/>
					<InfoBox>
						<Label>Second entry</Label>
						<Description>Some other words</Description>
					</InfoBox>
				</Item>
			</ItemGroup>
			<ItemGroup key='group2'>
				<div>
					<ItemGroupTop>
						<ItemGroupTitle>Second group</ItemGroupTitle>
					</ItemGroupTop>
				</div>
				<Item key='entry3' active={false}>
					<PreviewIcon id='testicon'/>
					<InfoBox>
						<Label>Third entry</Label>
						<Description>Words to live by</Description>
					</InfoBox>
				</Item>
				<Item key='entry4' active={false}>
					<PreviewIcon id='base-function-function'/>
					<InfoBox>
						<Label>Fourth entry</Label>
						<Description>Words to die for</Description>
					</InfoBox>
				</Item>
			</ItemGroup>
		</div>);
	});
});
