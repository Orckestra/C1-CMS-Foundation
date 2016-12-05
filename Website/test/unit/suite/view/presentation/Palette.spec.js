import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Palette, { Dialog, DialogTitle, ItemGroup, ItemGroupTitle, Item, Preview, Label, Description } from 'console/components/presentation/Palette.js';

describe('Palette', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			index: 3,
			itemGroups: Immutable.fromJS([
				{
					name: 'group1',
					label: 'First group',
					entries: [
						{
							name: 'entry1',
							label: 'First entry',
							description: 'All manner of words',
							previewImageUrl: '/path/to/image1.png'
						},
						{
							name: 'entry2',
							label: 'Second entry',
							description: 'Some other words',
							previewImageUrl: '/path/to/image2.png'
						}
					]
				},
				{
					name: 'group2',
					label: 'Second group',
					entries: [
						{
							name: 'entry3',
							label: 'Third entry',
							description: 'Words to live by',
							previewImageUrl: '/path/to/image3.png'
						},
						{
							name: 'entry4',
							label: 'Fourth entry',
							description: 'Words to die for',
							previewImageUrl: '/path/to/image4.png'
						}
					]
				}
			]),
			dialogDef: Immutable.Map({
				name: 'testdialog',
				headline: 'foo'
			}),
			dialogData: Immutable.Map({ selectedItem: 'entry2' }),
			dispatch: () => {}
		};
	});

	it('renders a palette', () => {
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'to have rendered', <Dialog>
			<DialogTitle>foo</DialogTitle>
			<ItemGroup key='group1'>
				<ItemGroupTitle>First group</ItemGroupTitle>
				<Item key='entry1' active={false}>
					<Preview image='/path/to/image1.png'/>
					<Label>First entry</Label>
					<Description>All manner of words</Description>
				</Item>
				<Item key='entry2' active={true}>
					<Preview image='/path/to/image2.png'/>
					<Label>Second entry</Label>
					<Description>Some other words</Description>
				</Item>
			</ItemGroup>
			<ItemGroup key='group2'>
				<ItemGroupTitle>Second group</ItemGroupTitle>
				<Item key='entry3' active={false}>
					<Preview image='/path/to/image3.png'/>
					<Label>Third entry</Label>
					<Description>Words to live by</Description>
				</Item>
				<Item key='entry4' active={false}>
					<Preview image='/path/to/image4.png'/>
					<Label>Fourth entry</Label>
					<Description>Words to die for</Description>
				</Item>
			</ItemGroup>
		</Dialog>);
	});
});
