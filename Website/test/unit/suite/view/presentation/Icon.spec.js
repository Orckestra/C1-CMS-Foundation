import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Icon from 'console/components/presentation/Icon.js';

describe('Icon', () => {
	let renderer;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
	});

	it('renders an svg icon', () => {
		renderer.render(<Icon id='foo'/>);
		return expect(renderer, 'to have rendered', <svg><use xlinkHref={'#icon-foo'}/></svg>);
	});
});
