import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Icon from '../../../../../Composite/console/components/presentation/Icon';

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
