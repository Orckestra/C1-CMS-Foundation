import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabBar, { Tab } from 'console/components/presentation/TabBar.js';
import styled from 'styled-components';

const StyledDiv = styled.div``;

describe('Tab', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			label: 'foo',
			index: 3
		};
	});

	it('renders a tab', () => {
		renderer.render(<Tab {...props}/>);
		return expect(renderer, 'to have rendered', <StyledDiv className='tab' style={{ left: '259px' }}>foo</StyledDiv>);
	});

	it('renders an active tab', () => {
		props.active = true;
		renderer.render(<Tab {...props}/>);
		return expect(renderer, 'to have rendered', <StyledDiv className='tab active' style={{ left: '259px' }}>foo</StyledDiv>);
	});
});

describe('TabBar', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tabs: [
				{ label: 'Foo', name: 'foo' },
				{ label: 'Bar', name: 'bar' },
				{ label: 'Wat', name: 'wat' }
			]
		};
	});

	it('renders a tab bar', () => {
		renderer.render(<TabBar {...props}/>);
		return expect(renderer, 'to have rendered', <StyledDiv className='tabbar'>
			<Tab key='foo' index={0} label='Foo'/>
			<Tab key='bar' index={1} label='Bar'/>
			<Tab key='wat' index={2} label='Wat'/>
		</StyledDiv>);
	});
});
