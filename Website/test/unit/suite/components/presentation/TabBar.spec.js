import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import TabBar, { Tab, TabBarDiv, TabDiv, TabIcon } from 'console/components/presentation/TabBar.js';

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
		return expect(renderer, 'to have exactly rendered', <TabDiv index={3} className='tab'>foo</TabDiv>);
	});

	it('renders an active tab', () => {
		props.active = true;
		renderer.render(<Tab {...props}/>);
		return expect(renderer, 'to have rendered', <TabDiv index={3}>foo</TabDiv>);
	});

	it('renders a tab with icon', () => {
		props.icon = 'perspective-content';
		renderer.render(<Tab {...props}/>);
		return expect(renderer, 'to have rendered', (
			<TabDiv index={3}>
				<TabIcon id='perspective-content'/>
				foo
			</TabDiv>
		));
	});
});

describe('TabBar', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tabs: [
				{ label: 'Foo', name: 'foo' },
				{ icon: 'perspective-content', label: 'Bar', name: 'bar' },
				{ label: 'Wat', name: 'wat' }
			]
		};
	});

	it('renders a tab bar', () => {
		renderer.render(<TabBar {...props}/>);
		return expect(renderer, 'to have rendered', <TabBarDiv className='tabbar'>
			<Tab key='foo' index={0} label='Foo'/>
			<Tab icon='perspective-content' key='bar' index={1} label='Bar'/>
			<Tab key='wat' index={2} label='Wat'/>
		</TabBarDiv>);
	});

	it('passes on onClick function', () => {
		let outerClick = sinon.spy().named('outerClick');
		let innerClick1 = sinon.spy().named('innerSpy1');
		let innerClick2 = sinon.spy().named('innerSpy2');
		props.onClick = name => () => outerClick(name);
		props.tabs[0].onClick = innerClick1;
		props.tabs[2].onClick = innerClick2;
		renderer.render(<TabBar {...props}/>);
		return expect(renderer, 'to have rendered', <TabBarDiv className='tabbar'>
			<Tab key='foo' index={0} label='Foo' onClick={expect.it('to be a function').and('not to error')}/>
			<Tab icon='perspective-content' key='bar' index={1} label='Bar' onClick={expect.it('to be a function').and('not to error')}/>
			<Tab key='wat' index={2} label='Wat' onClick={expect.it('to be a function').and('not to error')}/>
		</TabBarDiv>)
		.then(() => Promise.all([
			expect(innerClick1, 'was called once'),
			expect(outerClick, 'to have calls satisfying', [{args: ['bar']}]),
			expect(innerClick2, 'was called once')
		]));
	});
});
