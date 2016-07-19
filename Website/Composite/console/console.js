import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './state/store';
import DocumentPage from './components/container/DocumentPage';
import './console.scss!';
import './iconIndex'

let pageProps = {
	buttons: {
		save: {
			label: 'Save',
			icon: 'save'
		}
	},
	fieldsets: {
		'language-properties': {
			label: 'Language Properties',
			name: 'language-properties',
			fields: [
				'url-mapping-name',
				'test'
			]
		}
	},
	fields: {
		'url-mapping-name': {
			label: 'URL mapping name',
			help: 'Base name in URLs'
		},
		'test': {
			type: 'number',
			label: 'Number of beers',
			help: 'How drunk you want to get',
			value: 0
		}
	}
};

const store = configureStore();
window.store = store;

render(
	<Provider store={store}>
		<DocumentPage {...pageProps}/>
	</Provider>,
	document.querySelector('body > div.entry')
);
