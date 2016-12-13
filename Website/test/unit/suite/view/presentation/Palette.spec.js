import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Palette, { ItemGroup, ItemGroupTitle, Item, PreviewImage, PreviewIcon, Label, Description } from 'console/components/presentation/Palette.js';

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
							imageUri: { customImageUri: 'MediaArchive:40ef35a6-2ed9-4daa-a5db-c47ecc13e6d6' } // Media URI resolves to /media/ reference
						},
						{
							id: 'entry2',
							title: 'Second entry',
							description: 'Some other words',
							imageUri: { iconName: 'testicon', customImageUri: '/path/to/image2.png' }
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
							imageUri: { iconName: 'testicon' }
						},
						{
							id: 'entry4',
							title: 'Fourth entry',
							description: 'Words to die for',
							imageUri: {}
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
				<ItemGroupTitle>First group</ItemGroupTitle>
				<Item key='entry1' active={false}>
					<PreviewImage image='/media(MediaArchive:40ef35a6-2ed9-4daa-a5db-c47ecc13e6d6)?mw=100&mh=100'/>
					<Label>First entry</Label>
					<Description>All manner of words</Description>
				</Item>
				<Item key='entry2' active={true}>
					<PreviewImage image='/media(/path/to/image2.png)?mw=100&mh=100'/>
					<Label>Second entry</Label>
					<Description>Some other words</Description>
				</Item>
			</ItemGroup>
			<ItemGroup key='group2'>
				<ItemGroupTitle>Second group</ItemGroupTitle>
				<Item key='entry3' active={false}>
					<PreviewIcon id='testicon'/>
					<Label>Third entry</Label>
					<Description>Words to live by</Description>
				</Item>
				<Item key='entry4' active={false}>
					<PreviewIcon id='base-function-function'/>
					<Label>Fourth entry</Label>
					<Description>Words to die for</Description>
				</Item>
			</ItemGroup>
		</div>);
	});
});
