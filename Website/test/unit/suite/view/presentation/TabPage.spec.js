import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestComponent from 'unittest/helpers/TestComponent.js';
import TabPage from 'console/components/presentation/TabPage.js';

describe('TabPage', () => {
	let renderer, pageDef, pageTypes;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDef = { name: 'testpage', type: 'test' };
		pageTypes = {
			test: TestComponent
		};
	});

	it('should render the type it\'s given', () => {
		renderer.render(<TabPage pageDef={pageDef} pageTypes={pageTypes}/>);
		expect(renderer, 'to have rendered', <TestComponent pageDef={pageDef}/>);
	});

	it('should render an empty element if given no pageDef', () => {
		renderer.render(<TabPage pageDef={undefined} pageTypes={pageTypes}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should error if referencing an invalid page type', () => {
		expect(() => {
			renderer.render(<TabPage pageDef={{ name: 'testpage', type: 'wrongtype' }} pageTypes={pageTypes}/>);
		}, 'to throw');
	});
});
