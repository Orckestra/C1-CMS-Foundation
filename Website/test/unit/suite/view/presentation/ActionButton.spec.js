import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Icon from 'console/components/presentation/Icon.js';
import styled from 'styled-components';

const StyledButton = styled.button``;

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
			<StyledButton>{props.label}</StyledButton>
		);
	});

	it('should render a button with a class', () => {
		props.style = 'main';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<StyledButton className='main'>{props.label}</StyledButton>
		);
	});

	it('should render a disabled button', () => {
		props.disabled = true;
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<StyledButton disabled={true}>{props.label}</StyledButton>
		);
	});

	it('should render a button with icon', () => {
		props.icon = 'test';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<StyledButton>
				<Icon id='test'/>
				{props.label}
			</StyledButton>
		);
	});
	it('should render a button with icon and no label', () => {
		props.icon = 'test';
		delete props.label;
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<StyledButton>
				<Icon id='test'/>
			</StyledButton>
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
