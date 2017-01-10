import 'systemjs-hot-reloader/default-listener';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'console/state/store.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import ConnectPerspectives from 'console/components/container/ConnectPerspectives.js';
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

const initialState = {
	perspectiveDefs: {
		'console-search': {
			name: 'console-search',
			icon: 'magnifier',
			label: 'Search',
			rootPage: 'search'
		},
		content: {
			name: 'content',
			icon: 'perspective-content',
			label: 'Content',
			rootPage: 'content-browser'
		},
		media: {
			name: 'media',
			icon: 'perspective-media',
			label: 'Media',
			rootPage: 'media-browser'
		},
		data: {
			name: 'data',
			icon: 'perspective-datas',
			label: 'Data',
			rootPage: 'data-browser'
		},
		layout: {
			name: 'layout',
			icon: 'perspective-design',
			label: 'Layout',
			rootPage: 'layout-browser'
		},
		functions: {
			name: 'functions',
			icon: 'perspective-functions',
			label: 'Functions',
			rootPage: 'functions-browser'
		},
		system: {
			name: 'system',
			icon: 'perspective-system',
			label: 'System',
			rootPage: 'system-browser'
		}
	}
};
const store = configureStore(initialState);
function whenReadyRender() {
	if (document.readyState === 'complete') {
		let Root = location.search ? ConnectDockPanel : ConnectPerspectives;
		render(
			<Provider store={store}>
				<Root/>
			</Provider>,
			document.querySelector('body > div.entry')
		);
	}
}
document.addEventListener('readystatechange', whenReadyRender);
whenReadyRender();
