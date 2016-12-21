import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchPage from 'console/components/presentation/SearchPage.js';
import Immutable from 'immutable';


describe('SearchPage', () => {
	let renderer, pageDef;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDef = Immutable.fromJS({
			name: 'search',
			label: 'Search',
			type: 'search',
			searchProvider: 'searchProvider',
			providers: {
				searchProvider: {
					name: 'searchProvider',
					protocol: 'wamp',
					uri: 'content.search' // TBD
				}
			}
		});
	});

	it('should render an empty element', () => {
		renderer.render(<SearchPage pageDef={pageDef}/>);
		expect(renderer, 'to have exactly rendered', <div/>);
	});
});
