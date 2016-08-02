import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/store';
import ShownTab from './components/container/ShownTab';
import DocumentPage from './components/container/DocumentPage';
import './console.scss!';
import './iconIndex';

let pageProps = {
	pageTypes: {
		document: DocumentPage
	}
};

/*
App structure:

Frame with menubar + explorer, contains split view - State: Selected perspective, open menus
Split view defaults to a single view - state: Shown views, splitter position
Tab view - state: open tabs, selected tab
	First tab is browser (default) state: complex? TBD
	Subsequent tabs can contain any page (incl. DocumentPage) - state: As already done

*/
const initialState = {
	pages: {
		pages: ['edit-language'],
		currentPage: 'edit-language'
	}
};
const store = configureStore(initialState);

render(
	<Provider store={store}>
		<ShownTab {...pageProps}/>
	</Provider>,
	document.querySelector('body > div.entry')
);
