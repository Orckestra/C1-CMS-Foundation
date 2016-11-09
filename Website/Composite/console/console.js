import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'console/state/store.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import 'react-select/scss/default.scss!';
import 'fixed-data-table-2/dist/fixed-data-table.css!scss';
import 'console/console.scss!';
import 'console/iconIndex.js';

document.title = 'Orckestra CMS: ' + location.hostname;

const initialState = {
	pageDefs: {
		'svg-sprites': {
			name: 'svg-sprites',
			label: 'SVG Spritesheet',
			type: 'spritesheet'
		}
	}
};
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
