import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';


const DataFieldLabel = styled.label`
	display: inline-block;
	margin: 0;
	font-size: 12px;
	padding: 5px 0 4px 0;
	color: ${colors.fieldLabelColor};
	width: calc(100% - 56px);
`;



export default DataFieldLabel;
