import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'console/state/store.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import { injectGlobal } from 'styled-components';
import 'console/iconIndex.js';

import colors from 'console/components/colors.js';

injectGlobal`
*:focus {
	outline: 0;
}

::-webkit-scrollbar {
  width: 13px;
  height: 13px;
  background: ${colors.scrollbarTrackColor};
}

::-webkit-scrollbar-thumb {
  background: ${colors.scrollbarThumbColor};
  border: 3px solid ${colors.scrollbarTrackColor};
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${colors.buttonHighlightColor};
}

html, body {
	margin: 0;
	padding: 0;
	overflow: hidden;
	height: 100%;
	width: 100%;
}

div.entry, div.page {
	width: inherit;
	height: inherit;
}

body, input, textarea, select, button {
	font-size: 12px;
	font-family: "Segoe UI", Tahoma, sans-serif;
	color: ${colors.baseFontColor};
}
`;


document.title = 'Orckestra CMS: ' + location.hostname;

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
