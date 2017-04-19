import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestComponent from 'unittest/helpers/TestComponent.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import Immutable from 'immutable';

describe('SwitchPanel', () => {
	let renderer, pageDef, showType, panelTypes;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		showType = 'test';
		pageDef = Immutable.fromJS({ name: 'testpage', type: 'test' });
		panelTypes = {
			test: TestComponent
		};
	});

	it('should render the type it\'s given', () => {
		renderer.render(<SwitchPanel showType={showType} pageDef={pageDef} panelTypes={panelTypes}/>);
		expect(renderer, 'to have rendered', <TestComponent pageDef={pageDef.toJS()}/>);
	});

	it('should render an empty element if given no showType', () => {
		renderer.render(<SwitchPanel pageDef={undefined} panelTypes={panelTypes}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should error if referencing an invalid page type', () => {
		expect(() => {
			renderer.render(<SwitchPanel showType='wrongtype' pageDef={{ name: 'testpage', type: 'wrongtype' }} panelTypes={panelTypes}/>);
		}, 'to throw');
	});
});
