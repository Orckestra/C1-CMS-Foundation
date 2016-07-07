import React from 'react';

const HelpIcon = ({text}) => {
	let helper;

	function showHelper() {
		helper.style.visibility = 'visible';
		helper.style.opacity = 1;
	}

	function hideHelper() {
		setTimeout(() => {
			helper.style.visibility = '';
			helper.style.opacity = '';
		}, 2000);
	}

	return (
		<span className="helperIcon"
			onClick={showHelper}
			onMouseOut={hideHelper}>
			<div ref={comp => { helper = comp; }} className="helper">{text}</div>
		</span>
	)
}

export default HelpIcon;
