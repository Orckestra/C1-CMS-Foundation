import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'console/state/store.js';
import ShownTab from 'console/components/container/ShownTab.js';
import DocumentPage from 'console/components/container/DocumentPage.js';
import 'console/console.scss!';
import 'react-select/scss/default.scss!';
import 'console/iconIndex.js';

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
const initialState = {};
const store = configureStore(initialState);

render(
	<Provider store={store}>
		<ShownTab {...pageProps}/>
	</Provider>,
	document.querySelector('body > div.entry')
);
