import React, { PropTypes } from 'react';
import DataField from 'console/components/presentation/DataField.js';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';

const FieldsetStyle = styled.fieldset`
	float: left;
	position: relative;
	border: 1px solid ${colors.borderColor};
	border-radius: 4px;
	margin: 35px 23px 20px 0;
	padding: 8px 17px 25px;
	width: 394px;
	background-color: ${colors.fieldsetBackgroundColor};
`;
const Legend = styled.legend`
	position: absolute;
	top: -36px;
	left: -1px;
	padding: 0;
	background: transparent;
	color: ${colors.fieldsetLegendColor};
	font-family: 'Roboto Condensed', sans-serif;
	font-style: italic;
	font-size: 14px;
	text-transform: uppercase;
`;

const Fieldset = ({ label, fields }) => (
	<FieldsetStyle>
		{label ? <Legend>{label}</Legend> : null}
		{
			fields.map(field => (
				<DataField key={field.get('name')} name={field.get('name')} {...field.toObject()}/>
			)).toArray()
		}
	</FieldsetStyle>
);

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
};

export default Fieldset;
