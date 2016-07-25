import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabPage from '../../../../../Composite/console/components/presentation/TabPage';

const TestComponent = props => (<div {...props}/>);

describe('TabPage', () => {
	let renderer, name;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		name = 'testpage';
	});

	it('should render the type it\'s given', () => {
		renderer.render(<TabPage name={name} Type={TestComponent}/>);
		expect(renderer, 'to have rendered', <TestComponent name={name}/>);
	});

	it('should render an empty element if given no name', () => {
		renderer.render(<TabPage Type={TestComponent}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should render an empty element if given no type', () => {
		renderer.render(<TabPage name={name}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});

	it('should render an empty element if given neither name or type', () => {
		renderer.render(<TabPage/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});
});
