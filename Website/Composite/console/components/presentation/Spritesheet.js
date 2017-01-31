import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';
import ScrollBox from 'console/components/presentation/ScrollBox.js';
import styled from 'styled-components';
import colors from 'console/components/colors.js';


const isMime = /mimetype/;

const IconList = styled.div`
	&:after {
		content: '';
		display: block;
		clear: both;
	}
`;

const IconCell = styled.div`
	float: left;
	height: 24px;
	width: 380px;
	margin-bottom: 10px;
	color: #999;
`;

const IconLabel = styled.span`
	line-height: 24px;
	margin-left: 15px;
	vertical-align: 10px;
	color: ${colors.baseFontColor};
`;

const Spritesheet = () => {
	let { general, reference, mimetype } = Array.from(document.querySelectorAll('svg > symbol'))
		.reduce((current, symbol) => {
			let id = symbol.id.substr(5); // Cut off leading 'icon-'
			if (isMime.test(id)) {
				current.mimetype.push(id);
			} else {
				if (symbol.querySelector('use')) {
					let linkID = symbol.querySelector('use').getAttribute('xlink:href').substr(6);
					current.reference[id] = linkID;
				} else {
					current.general.push(id);
				}
			}
			return current;
		}, { general: [], reference: {}, mimetype: [] });
	return (
		<ScrollBox>
			<h1>General icons 24*24</h1>
			<IconList className="iconlist">
				{general.map(id =>
					<IconCell key={id}>
						<Icon id={id}/>
						<IconLabel>{id}</IconLabel>
					</IconCell>
				)}
			</IconList>
			<h1>Referenced icons 24*24</h1>
			<IconList className="iconlist">
				{Object.keys(reference).map((id) =>
					<IconCell key={id}>
						<Icon id={id}/>
						<IconLabel>{id} ({reference[id]})</IconLabel>
					</IconCell>
				)}
			</IconList>
			<h1>File format icons 24*24</h1>
			<IconList className="iconlist">
				{mimetype.map(id =>
					<IconCell key={id}>
						<Icon id={id}/>
						<IconLabel>{id}</IconLabel>
					</IconCell>
				)}
			</IconList>
		</ScrollBox>
	);
};

Spritesheet.propTypes = {
	pageDef: PropTypes.object.isRequired
};

export default Spritesheet;
