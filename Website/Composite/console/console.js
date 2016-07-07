import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import Page from './Page';
import './console.scss!';
import './iconIndex'

let pageProps = {
	buttons: [
		{
			label: 'Save',
			action: data => console.log('actionkey', data),
			icon: { id :'save' }
		}
	],
	fieldsets: [
		{
			label: 'Language Properties',
			name: 'language-properties',
			fields: [
				{
					type: 'text',
					name: 'url-mapping-name',
					label: 'URL mapping name',
					help: 'Base name in URLs'
				},
				{
					type: 'number',
					name: 'test',
					label: 'Number of beers',
					help: 'How drunk you want to get',
					initialValue: 0
				}
			]
		}
	]
};

render(
	<Page {...pageProps}/>,
	document.querySelector('body > div.entry')
);
