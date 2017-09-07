import React, { PropTypes } from 'react';
import styled from 'styled-components';


const DataFieldWrapper = styled.div`
	position: relative;
	margin-bottom: 4px;

	&::after {
		display: block;
		content: "";
		clear: both;
	 }
`;



export default DataFieldWrapper;
