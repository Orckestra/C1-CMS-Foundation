import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Toolbar from 'console/components/presentation/Toolbar.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Select from 'react-select';

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
			items: {}
		};
	});

	describe('with buttons', () => {
		beforeEach(() => {
			props.items = {
				first: {
					type: 'button',
					label: 'Label1',
					icon: 'save',
					action: actions.first
				},
				second: {
					type: 'button',
					label: 'Label2',
					action: actions.second
				},
				third: {
					type: 'button',
					label: 'Label3',
					saveButton: true,
					action: actions.third
				}
			};
		});

		it('renders them', () => {
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<div className='toolbar'>
					<ActionButton label='Label1' action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
					<ActionButton label='Label3' action={actions.third} disabled={true}/>
				</div>
			);
		});

		it('does not render them where action is missing', () => {
			delete props.items.third.action;
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<div className='toolbar'>
					<ActionButton label='Label1' action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
				</div>
			);
		});

		it('renders them where label is missing, but only if it has icon', () => {
			delete props.items.first.label;
			delete props.items.third.label;
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<div className='toolbar'>
					<ActionButton action={actions.first} icon='save'/>
					<ActionButton label='Label2' action={actions.second}/>
				</div>
			);
		});
	});

	describe('with selector', () => {
		beforeEach(() => {
			props.items = {
				first: {
					type: 'select',
					placeholder: 'Select date',
					options: [
						{ value: '2016-09-23' },
						{ value: '2016-09-22' },
						{ value: '2016-09-21', label: 'That day' },
						{ value: '2016-09-20' }
					]
				}
			};
		});

		it('renders them', () => {
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<div className='toolbar'>
					<Select placeholder='Select date' options={[
						{ value: '2016-09-23', label: '2016-09-23' },
						{ value: '2016-09-22', label: '2016-09-22' },
						{ value: '2016-09-21', label: 'That day' },
						{ value: '2016-09-20', label: '2016-09-20' }
					]}/>
				</div>
			);
		});
	});

	describe('styles', () => {
		it('sets classNames according to style list', () => {
			props.style = 'light rightAligned';
			renderer.render(<Toolbar {...props}/>);
			return expect(renderer, 'to have rendered',
				<div className='toolbar light rightAligned'/>
			);
		});
	});
});
