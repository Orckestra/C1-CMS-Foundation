import React from 'react';
import { render } from 'react-dom';
import Page from './Page.js';

let pageState = {
	buttons: [
		{ label: 'Save', action: 'actionkey' }
	],
	fieldsets: [
		{
			label: 'Language Properties',
			fields: [
				{
					type: 'text',
					name: 'url-mapping-name',
					label: 'URL mapping name',
					help: 'URL mapping name'
				}
			]
		}
	]
};

render(
	<Page/>,
	document.querySelector('body > div.entry')
);
