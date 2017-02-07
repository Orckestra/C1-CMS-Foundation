import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import ComboButton, { ButtonWrapper, TopButton, MenuButton, DropdownIcon, DropdownMenu, DropdownItem } from 'console/components/presentation/ComboButton.js';
import { ButtonIcon, ButtonLabel } from 'console/components/presentation/Button.js';

describe('ComboButton', () => {
	let renderer, props, outerAction, innerAction;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		outerAction = sinon.spy().named('addHomeAction');
		innerAction = sinon.spy().named('addBlogAction');
		props = {
			name: 'add',
			icon: 'page-add-page',
			buttons: [
				{
					name: 'addHome',
					label: 'Add Home',
					action: outerAction
				},
				{
					name: 'addBlog',
					label: 'Add Blog',
					action: innerAction
				}
			]
		};
	});

	it('renders a button', () => {
		renderer.render(<ComboButton {...props}/>);
		return expect(renderer, 'to have rendered', (
			<ButtonWrapper>
				<TopButton id='add'>
					<ButtonIcon id='page-add-page'/>
					<ButtonLabel>Add Home</ButtonLabel>
				</TopButton>
				<MenuButton id='add_switch'>
					<DropdownIcon id='chevron-down'/>
				</MenuButton>
				<DropdownMenu id='add_menu'>
					<DropdownItem key='addBlog'>Add Blog</DropdownItem>
				</DropdownMenu>
			</ButtonWrapper>
		));
	});

	it('handles no icon', () => {
		delete props.icon;
		renderer.render(<ComboButton {...props}/>);
		return expect(renderer, 'queried for', <TopButton id='add'/>,
			'to have exactly rendered', (
				<TopButton id='add' onClick={expect.it('to be a function')}>
					<ButtonLabel>Add Home</ButtonLabel>
				</TopButton>
			)
		);
	});

	it('can open and close its menu', () => {
		let component = TestUtils.renderIntoDocument(<ComboButton {...props}/>);
		return expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={false}/>
		)
		.then(() => expect(component.clickHandler, 'when called with', [{ target: component.dropdownButton }]))
		.then(() => expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={true}/>
		))
		.then(() => expect(component.clickHandler, 'when called with', [{ target: component.dropdownButton }]))
		.then(() => expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={false}/>
		));
	});

	it('can close menu by click outside', () => {
		let component = TestUtils.renderIntoDocument(<ComboButton {...props}/>);
		return expect(component.clickHandler, 'when called with', [{ target: document.body }])
		.then(() => expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={false}/>
		))
		.then(() => expect(component.clickHandler, 'when called with', [{ target: component.dropdownButton }]))
		.then(() => expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={true}/>
		))
		.then(() => expect(component.clickHandler, 'when called with', [{ target: document.body }]))
		.then(() => expect(component,
			'queried for', <DropdownMenu id='add_menu'/>,
			'to have rendered', <DropdownMenu open={false}/>
		));
	});

	it('can fire action from button', () => {
		let component = TestUtils.renderIntoDocument(<ComboButton {...props}/>);
		return expect(component,
			'with event', 'click',
			'on', <TopButton id='add'/>
		)
		.then(() => Promise.all([
			expect(outerAction, 'was called'),
			expect(innerAction, 'was not called')
		]));
	});

	it('can fire action from menu', () => {
		let component = TestUtils.renderIntoDocument(<ComboButton {...props}/>);
		return expect(component.clickHandler, 'when called with', [{ target: component.dropdownButton }])
		.then(() => expect(component,
			'with event', 'click',
			'on', <DropdownItem id='addBlog'/>
		))
		.then(() => Promise.all([
			expect(outerAction, 'was not called'),
			expect(innerAction, 'was called')
		]));
	});
});
