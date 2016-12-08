import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';

const style = css`
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
		border-top: 1px solid ${colors.borderColor};
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

export function scrollboxStyle(comp) {
	return styled(comp)`${style}`;
}

const ScrollBox = styled.div`${style}`;

export default ScrollBox;
