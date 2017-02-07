import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from 'console/components/presentation/ActionButton.js';
import * as elements from 'console/components/presentation/Button.js';

describe('ActionButton', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			label: 'Label',
			disabled: false,
			action: sinon.spy()
		};
	});

	it('should render a button', () => {
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button><elements.ButtonLabel>{props.label}</elements.ButtonLabel></elements.Button>
		);
	});

	it('should render a button with a style', () => {
		props.style = 'main';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button buttonStyle='main'><elements.ButtonLabel>{props.label}</elements.ButtonLabel></elements.Button>
		);
	});

	it('should render a disabled button', () => {
		props.disabled = true;
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button disabled={true}><elements.ButtonLabel>{props.label}</elements.ButtonLabel></elements.Button>
		);
	});

	it('should render a button with icon', () => {
		props.icon = 'test';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button>
				<elements.ButtonIcon id='test'/>
				<elements.ButtonLabel>{props.label}</elements.ButtonLabel>
			</elements.Button>
		);
	});
	it('should render a button with icon and no label', () => {
		props.icon = 'test';
		delete props.label;
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button>
				<elements.ButtonIcon id='test'/>
			</elements.Button>
		);
	});

	it('should call handler when clicked', () => {
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'with event', 'click')
			.then(() => {
				return expect(props.action, 'was called once');
			});
	});
});
