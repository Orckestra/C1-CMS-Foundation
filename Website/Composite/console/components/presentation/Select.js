import ReactSelect from 'react-select';
import styled, {injectGlobal } from 'styled-components';
import colors from 'console/components/colors.js';
import selectStylesheet from 'react-select/dist/react-select.css!text';

injectGlobal`${selectStylesheet}`;

// This stylesheet is as complex as it is to override the built-in theme of react-select.
const Select = styled(ReactSelect)`
	vertical-align: middle;
	display: inline-block;
	width: calc(100% - 34px);
	margin: 2px 1px 4px 2px;

	.Select-placeholder {
		line-height: 30px;
	}

	.Select-input {
		height: 30px;
	}
	.Select-input input {
		border: 0 none transparent;
		margin: 0;
		padding: 5px 0 9px;
	}

	.Select-control {
		border: 1px solid #ccc;
		border-radius: 5px;
		height: 20px;
	}
	.Select-control .Select-value {
		line-height: 30px;
		color: ${colors.baseFontColor};
	}
	&.is-focused .Select-control,
	&.is-focused:not(.is-open) .Select-control {
		border-color: ${colors.fieldFocusColor};
		box-shadow: none;
	}

	.Select-arrow {
		border: 0 none transparent;
	}
	.Select-arrow:before, .Select-arrow:after {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}
	.Select-arrow:after {
		top: 14px;
		right: 11px;
		border-width: 4px 4px 0 4px;
		border-color: white transparent transparent transparent;
	}
	.Select-arrow:before {
		top: 14px;
		right: 10px;
		border-width: 5px 5px 0 5px;
		border-color: ${colors.fieldFocusColor} transparent transparent transparent;
	}
	&.is-open .Select-arrow:after {
		top: 15px;
		border-width: 0px 4px 4px 4px;
		border-color: transparent transparent white transparent;
	}
	&.is-open .Select-arrow:before {
		top: 14px;
		border-width: 0px 5px 5px 5px;
		border-color: transparent transparent ${colors.buttonShadingColor} transparent;
	}

	.Select-menu-outer {
		position: absolute;
		border: 1px solid ${colors.borderColor};
		border-radius: 5px;
		margin: 1px 1px 7px 0;
		background-color: white;
		width: calc(100% - 0px);
		overflow: hidden;
		z-index: 10;
	}
	.Select-menu-outer .Select-option {
		padding: 7px 8px;
	}
	.Select-menu-outer .Select-option.is-focused {
		color: inherit;
		background-color: inherit;
	}
	.Select-menu-outer .Select-option:hover {
		background-color: ${colors.fieldFocusColor};
		color: white;
	}

	.Select-menu-outer .Select-option .is-selected {
		background-color: inherit;
	}

	.toolbar & {
		width: 150px;
		margin: 2px 10px 2px 0;
		vertical-align: -15px;
	}

	.toolbar & .Select-input {
		line-height: 34px;
		height: 34px;
	}
	.toolbar & .Select-placeholder {
		line-height: 34px;
	}
	.toolbar & .Select-control {
		border-radius: 4px;
	}
	.toolbar & .Select-arrow:after {
		top: 15px;
	}
	.toolbar & .Select-arrow:before {
		top: 15px;
	}
	.toolbar &.is-open .Select-arrow:after {
		top: 16px;
	}
	.toolbar &.is-open .Select-arrow:before {
		top: 15px;
	}

	.toolbar + .toolbar .Select {
		vertical-align: -12px;
	}
	.toolbar + .toolbar .Select-input {
		height: 28px;
	}
	.toolbar + .toolbar .Select-arrow:after {
		top: 13px;
	}
	.toolbar + .toolbar .Select-arrow:before {
		top: 13px;
	}
	.toolbar + .toolbar &.is-open .Select-arrow:after {
		top: 14px;
	}
	.toolbar + .toolbar &.is-open .Select-arrow:before {
		top: 13px;
	}
`;

export default Select;
