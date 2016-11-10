import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Palette from 'console/components/presentation/Palette.js';

describe('Palette', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			label: 'foo',
			index: 3
		};
	});

	it('renders a palette', () => {
		renderer.render(<Palette {...props}/>);
		return expect(renderer, 'to have rendered', <div></div>);
	});
});
