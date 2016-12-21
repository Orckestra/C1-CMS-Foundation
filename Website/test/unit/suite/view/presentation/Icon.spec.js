import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Icon from 'console/components/presentation/Icon.js';
import styled from 'styled-components';

const StyledSvg = styled.svg``;

describe('Icon', () => {
	let renderer;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
	});

	it('renders an svg icon', () => {
		renderer.render(<Icon id='foo'/>);
		return expect(renderer, 'to have rendered', <StyledSvg><use xlinkHref={'#icon-foo'}/></StyledSvg>);
	});
});
