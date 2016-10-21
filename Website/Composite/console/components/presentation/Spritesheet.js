import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';

const isMime = /mimetype/;

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
		<div className="scrollbox full">
			<h1>General icons 24*24</h1>
			<div className="iconlist">
				{general.map(id =>
					<div className='cell' key={id}>
						<Icon id={id}/>
						<span>{id}</span>
					</div>
				)}
			</div>
			<h1>Referenced icons 24*24</h1>
			<div className="iconlist">
				{Object.keys(reference).map((id) =>
					<div className='cell' key={id}>
						<Icon id={id}/>
						<span>{id} ({reference[id]})</span>
					</div>
				)}
			</div>
			<h1>File format icons 24*24</h1>
			<div className="iconlist">
				{mimetype.map(id =>
					<div className='cell' key={id}>
						<Icon id={id}/>
						<span>{id}</span>
					</div>
				)}
			</div>
		</div>
	);
};

Spritesheet.propTypes = {
	pageDef: PropTypes.object.isRequired
};

export default Spritesheet;
