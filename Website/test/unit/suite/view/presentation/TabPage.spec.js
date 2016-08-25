import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestComponent from 'unittest/helpers/TestComponent.js';
import TabPage from 'console/components/presentation/TabPage.js';

describe('TabPage', () => {
	let renderer, name, pageDefs, pageTypes;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDefs = { testpage: { type: 'test' }};
		pageTypes = {
			test: TestComponent
		};
		name = 'testpage';
	});

	it('should render the type it\'s given', () => {
		renderer.render(<TabPage name={name} pageDefs={pageDefs} pageTypes={pageTypes}/>);
		expect(renderer, 'to have rendered', <TestComponent name={name}/>);
	});

	it('should render an empty element if given no name', () => {
		renderer.render(<TabPage pageDefs={pageDefs} pageTypes={pageTypes}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should render an empty element if name not found in pageDefs', () => {
		renderer.render(<TabPage name="wrongname" pageDefs={pageDefs} pageTypes={pageTypes}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should error if referencing an invalid page type', () => {
		expect(() => {
			renderer.render(<TabPage name={name} pageDefs={{ testpage: { type: 'wrongtype' }}} pageTypes={pageTypes}/>);
		}, 'to throw');
	});
});