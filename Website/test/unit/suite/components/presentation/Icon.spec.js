import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Icon, { Svg } from 'console/components/presentation/Icon.js';

describe('Icon', () => {
	let renderer;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
	});

	it('renders an svg icon', () => {
		renderer.render(<Icon id='foo'/>);
		return expect(renderer, 'to have rendered', <Svg><use xlinkHref={'#icon-foo'}/></Svg>);
	});
});
