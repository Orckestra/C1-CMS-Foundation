import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'console/state/store.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import 'console/console.scss!';
import 'react-select/scss/default.scss!';
import 'console/iconIndex.js';


document.title = 'Orckestra CMS: ' + location.hostname;

/*
App structure:

Frame with menubar + explorer, contains split view - State: Selected perspective, open menus
Split view defaults to a single view - state: Shown views, splitter position
Tab view - state: open tabs, selected tab
	First tab is browser (default) state: complex? TBD
	Subsequent tabs can contain any page (incl. ConnectToolbarFrame) - state: As already done

*/
const initialState = {};
const store = configureStore(initialState);
function whenReadyRender() {
	if (document.readyState === 'complete') {
		render(
			<Provider store={store}>
				<ConnectDockPanel/>
			</Provider>,
			document.querySelector('body > div.entry')
		);
	}
}
document.onreadystatechange = whenReadyRender;
whenReadyRender();
