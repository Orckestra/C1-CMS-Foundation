import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabPage from '../../../../../Composite/console/components/presentation/TabPage';

const TestComponent = props => (<div {...props}/>);

describe('TabPage', () => {
	let renderer, name, pageDefs;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDefs = { testpage: {type: TestComponent }};
		name = 'testpage';
	});

	it('should render the type it\'s given', () => {
		renderer.render(<TabPage name={name} pageDefs={pageDefs}/>);
		expect(renderer, 'to have rendered', <TestComponent name={name}/>);
	});

	it('should render an empty element if given no name', () => {
		renderer.render(<TabPage pageDefs={pageDefs}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should render an empty element if name not found in pageDefs', () => {
		renderer.render(<TabPage name="wrongname" pageDefs={pageDefs}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});
});
