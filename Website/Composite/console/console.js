import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/store';
import DocumentPage from './components/container/DocumentPage';
import './console.scss!';
import './iconIndex';

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
			fields: [
				'language-properties.url-mapping-name',
				'language-properties.test'
			]
		}
	},
	dataFields: {
		'language-properties.url-mapping-name': {
			label: 'URL mapping name',
			help: 'Base name in URLs'
		},
		'language-properties.test': {
			type: 'number',
			label: 'Number of beers',
			help: 'How drunk you want to get',
			defaultValue: 0
		}
	}
};

/*
App structure:

Frame with menubar + explorer, contains split view - State: Selected perspective, open menus
Split view defaults to a single view - state: Shown views, splitter position
Tab view - state: open tabs, selected tab
	First tab is browser (default)- state: complex? TBD
	Subsequent tabs can contain any page (incl. DocumentPage) - state: As already done



*/

const store = configureStore();

render(
	<Provider store={store}>
		<DocumentPage {...pageProps}/>
	</Provider>,
	document.querySelector('body > div.entry')
);
