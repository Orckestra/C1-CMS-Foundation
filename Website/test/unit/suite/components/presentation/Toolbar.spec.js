import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Toolbar, { ToolbarBox } from 'console/components/presentation/Toolbar.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import CheckboxGroup from 'console/components/presentation/CheckboxGroup.js';
import Select from 'console/components/presentation/Select.js';
import Immutable from 'immutable';

describe('Toolbar', () => {
	let renderer, props, actions;
	beforeEach(() => {
		actions = {
			first: () => {},
			second: () => {},
			third: () => {}
		};
		renderer = TestUtils.createRenderer();
		props = {
			name: 'toolbar',
			canSave: false,
			items: Immutable.List()
		};
	});

	describe('with buttons', () => {
		beforeEach(() => {
			props.items = Immutable.fromJS([
				{
					name: 'first',
					type: 'button',
					label: 'Label1',
					icon: 'save',
					action: actions.first
				},
				{
					name: 'second',
					type: 'button',
					label: 'Label2',
					action: actions.second
				},
				{
					name: 'third',
					type: 'button',
					label: 'Label3',
					disabled: true,
					action: actions.third
				}
			]);
		});

		it('renders them', () => {
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar'>
					<ActionButton label='Label1' action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
					<ActionButton label='Label3' action={actions.third} disabled={true}/>
				</ToolbarBox>
			);
		});

		it('does not render them where action is missing', () => {
			props.items = props.items.deleteIn([2], 'action');
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar'>
					<ActionButton label='Label1' action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
				</ToolbarBox>
			);
		});

		it('renders them where label is missing, but only if it has icon', () => {
			props.items = props.items.withMutations(items => {
				items.deleteIn([0, 'label']);
				items.deleteIn([2, 'label']);
			});
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar'>
					<ActionButton action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
				</ToolbarBox>
			);
		});
	});

	describe('with selector', () => {
		beforeEach(() => {
			props.items = Immutable.fromJS([
				{
					type: 'select',
					name: 'switchItUp',
					placeholder: 'Select date',
					options: [
						{ value: '2016-09-23' },
						{ value: '2016-09-22' },
						{ value: '2016-09-21', label: 'That day' },
						{ value: '2016-09-20' }
					]
				}
			]);
		});

		it('renders them', () => {
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar'>
					<Select placeholder='Select date' options={[
						{ value: '2016-09-23', label: '2016-09-23' },
						{ value: '2016-09-22', label: '2016-09-22' },
						{ value: '2016-09-21', label: 'That day' },
						{ value: '2016-09-20', label: '2016-09-20' }
					]} clearable={false} multi={false} simpleValue={true}/>
			</ToolbarBox>
			);
		});
	});

	describe('with checkbox groups', () => {
		beforeEach(() => {
			props.items = Immutable.fromJS([
				{
					type: 'checkboxGroup',
					name: 'first',
					options: [
						{ name: 'first/test1', label: 'One', value: 'One' },
						{ name: 'first/test2', label: 'Two', value: 'Two' },
						{ name: 'first/test3', label: 'Three', value: 'Three' },
						{ name: 'first/test4', label: 'Four', value: 'Four' },
						{ name: 'first/test5', label: 'Five', value: 'Five' }
					],
					value: ['One', 'Two', 'Three', 'Four']
				}
			]);
		});

		it('renders them', () => {
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar'>
					<CheckboxGroup
						name='first'
						options={[
							{ name: 'first/test1', label: 'One' },
							{ name: 'first/test2', label: 'Two' },
							{ name: 'first/test3', label: 'Three' },
							{ name: 'first/test4', label: 'Four' },
							{ name: 'first/test5', label: 'Five' }
						]}
						value={['One', 'Two', 'Three', 'Four']}
						/>
				</ToolbarBox>
			);
		});
	});

	describe('styles', () => {
		it('sets classNames according to style list', () => {
			props.style = 'light rightAligned';
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<ToolbarBox className='toolbar light rightAligned'/>
			);
		});
	});
});
