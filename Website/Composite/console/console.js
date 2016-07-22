import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/store';
import DocumentPage from './components/container/DocumentPage';
import './console.scss!';
import './iconIndex';

let pageProps = {
	pages: {
		'edit-language': {
			fieldsets: [
				'edit-language/properties'
			],
			actions: [
				'updateField',
				'save'
			]
		}
	},
	buttons: {
		'edit-language/save': {
			label: 'Save',
			icon: 'save'
		}
	},
	fieldsets: {
		'edit-language/properties': {
			label: 'Language Properties',
			fields: [
				'edit-language/properties/url-mapping-name',
				'edit-language/properties/test'
			]
		}
	},
	dataFields: {
		'edit-language/properties/url-mapping-name': {
			label: 'URL mapping name',
			help: 'Base name in URLs'
		},
		'edit-language/properties/test': {
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
		<DocumentPage name='edit-language' {...pageProps}/>
	</Provider>,
	document.querySelector('body > div.entry')
);
