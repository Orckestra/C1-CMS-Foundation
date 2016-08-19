import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Icon from 'console/components/presentation/Icon.js';

describe('ActionButton', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			label: 'Label',
			action: sinon.spy()
		};
	});

	it('should render a button', () => {
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<button>{props.label}</button>
		);
	});

	it('should render a button with icon', () => {
		props.icon = 'test';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<button>
				<Icon id='test'/>
				{props.label}
			</button>
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
