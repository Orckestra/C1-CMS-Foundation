import React, { PropTypes } from 'react';
import styled from 'styled-components';


const DataFieldWrapper = styled.div`
	position: relative;
	
	&::after {
		display: block;
		content: "";
		clear: both;
	 }
`;



export default DataFieldWrapper;
