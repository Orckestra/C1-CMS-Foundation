import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import BrowserPage, * as uiElements from 'console/components/presentation/BrowserPage.js';

describe('BrowserPage', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tree: Immutable.fromJS({
				name: 'testRoot',
				children: [
					{
						name: 'test1',
						icon: 'test',
						children: [
							{
								name: 'test11'
							}
						]
					},
					{
						name: 'test2',
						children: ['notloaded1', 'notloaded2']
					},
					{
						name: 'test3',
						children: ['test31']
					}
				]
			})
		};
	});

	it('renders a browser', () => {
		renderer.render(<BrowserPage {...props}/>);
		return expect(renderer, 'to have rendered', <uiElements.Browser>
			<uiElements.TreeNode/>
			<uiElements.TreeNode/>
			<uiElements.TreeNode/>
		</uiElements.Browser>);
	});
});
