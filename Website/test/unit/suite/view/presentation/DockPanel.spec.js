import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestComponent from 'unittest/helpers/TestComponent.js';
import DockPanel from 'console/components/presentation/DockPanel.js';
import Immutable from 'immutable';

describe('DockPanel', () => {
	let renderer, pageDef, pageTypes;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDef = Immutable.fromJS({ name: 'testpage', type: 'test' });
		pageTypes = {
			test: TestComponent
		};
	});

	it('should render the type it\'s given', () => {
		renderer.render(<DockPanel pageDef={pageDef} pageTypes={pageTypes}/>);
		expect(renderer, 'to have rendered', <TestComponent pageDef={pageDef.toJS()}/>);
	});

	it('should render an empty element if given no pageDef', () => {
		renderer.render(<DockPanel pageDef={undefined} pageTypes={pageTypes}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should error if referencing an invalid page type', () => {
		expect(() => {
			renderer.render(<DockPanel pageDef={{ name: 'testpage', type: 'wrongtype' }} pageTypes={pageTypes}/>);
		}, 'to throw');
	});
});
