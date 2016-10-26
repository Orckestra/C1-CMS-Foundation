import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabBar, { Tab } from 'console/components/presentation/TabBar.js';

describe('Tab', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			name: 'foo'
		};
	});

	it('tenders a tab', () => {
		renderer.render(<Tab {...props}/>);
		return expect(renderer, 'to have rendered', <div className='tab' name='foo'/>);
	});
});

describe('TabBar', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tabs: [
				{ name: 'foo' },
				{ name: 'bar' },
				{ name: 'wat' }
			]
		};
	});

	it('renders a tab bar', () => {
		renderer.render(<TabBar {...props}/>);
		return expect(renderer, 'to have rendered', <div className='tabbar'>
			<Tab name='foo'/>
			<Tab name='bar'/>
			<Tab name='wat'/>
		</div>);
	});
});
