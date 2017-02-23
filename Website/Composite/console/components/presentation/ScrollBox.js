import styled from 'styled-components';

const ScrollBox = styled.div.withConfig({ displayName: 'ScrollBox' })`
	display: block;
	padding: 30px 30px 20px 40px;
	width: 100%;
	box-sizing: border-box;
	overflow: auto;
	position: relative;
	height: 100%;

	&::after {
		content: '';
		display: block;
		clear: both;
	}

	.toolbar + & {
		height: calc(100% - 71px);
	}

	.toolbar + .toolbar + & {
		height: calc(100% - 136px);
	}

	.toolbar + .tabbar + & {
		height: calc(100% - 72px);
	}

	.toolbar + .toolbar + .tabbar + & {
		height: calc(100% - 137px);
	}
`;

export default ScrollBox;
