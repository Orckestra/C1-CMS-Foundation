import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton, * as elements from 'console/components/presentation/ActionButton.js';
const getStyles = elements.getStyles;

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
			<elements.Button><elements.Label>{props.label}</elements.Label></elements.Button>
		);
	});

	it('should render a button with a style', () => {
		props.style = 'main';
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button buttonStyle='main'><elements.Label>{props.label}</elements.Label></elements.Button>
		);
	});

	it('should render a disabled button', () => {
		props.disabled = true;
		renderer.render(
			<ActionButton {...props}/>
		);
		return expect(renderer, 'to have rendered',
			<elements.Button disabled={true}><elements.Label>{props.label}</elements.Label></elements.Button>
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
				<elements.Label>{props.label}</elements.Label>
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

	describe('getStyles', () => {
		it('gets a style based on an id', () =>
			expect(getStyles, 'when called with', [{ buttonStyle: 'small' }], 'to satisfy', [
				[ '\n\t\tmin-width: 42px;\n\t' ]
			])
		);

		it('gets multiple styles if specified', () =>
			expect(getStyles, 'when called with', [{ buttonStyle: 'small main' }], 'to satisfy', [
				[ '\n\t\tmin-width: 42px;\n\t' ],
				[
					'\n\t\tborder: 1px solid ', '#22B980',
					';\n\t\tbackground-image: linear-gradient(to bottom, ', '#22B980', ' 0%, ', '#1ea371',
					' 100%);\n\t\tcolor: white;\n\t\tpadding-top: 4px;\n\t\tpadding-bottom: 4px;\n\t'
				]
			])
		);
	});
});
