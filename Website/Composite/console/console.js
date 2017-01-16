import 'systemjs-hot-reloader/default-listener';

import wampTest from 'console/access/wampTest.js';
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
		content: {
			name: 'content',
			icon: 'perspective-content',
			label: 'Content',
			rootPage: 'content-explorer'
		},
		media: {
			name: 'media',
			icon: 'perspective-media',
			label: 'Media',
			rootPage: 'media-explorer'
		},
		data: {
			name: 'data',
			icon: 'perspective-datas',
			label: 'Data',
			rootPage: 'data-explorer'
		},
		layout: {
			name: 'layout',
			icon: 'perspective-design',
			label: 'Layout',
			rootPage: 'layout-explorer'
		},
		functions: {
			name: 'functions',
			icon: 'perspective-functions',
			label: 'Functions',
			rootPage: 'functions-explorer'
		},
		system: {
			name: 'system',
			icon: 'perspective-system',
			label: 'System',
			rootPage: 'system-explorer'
		}
	},
	pageTree: {
		contentRoot: {
			name: 'contentRoot',
			children: ['websites', 'other', 'stuff']
		},
		websites: {
			name: 'websites',
			iconBase: 'page-root',
			label: 'Websites',
			open: true,
			childrenLoaded: true,
			children: ['venusRoot']
		},
		venusRoot: {
			name: 'venusRoot',
			label: 'Venus',
			icon: 'page',
			childrenLoaded: true,
			open: true,
			children: ['sub1', 'sub2']
		},
		sub1: {
			name: 'sub1',
			label: 'Sub-Page 1',
			childrenLoaded: true,
			open: false,
			children: ['sub11']
		},
		sub11: {
			name: 'sub11',
			label: 'Sub-Page 1.1'
		},
		sub2: {
			name: 'sub2',
			label: 'Sub-Page 2'
		},
		other: {
			name: 'other',
			label: 'Other',
			open: false,
			childrenLoaded: false,
			children: ['foo', 'bar']
		},
		stuff: {
			name: 'stuff',
			label: 'Stuff',
			icon: 'page'
		}
	}
};
function whenReadyRender() {
	if (document.readyState === 'complete') {
		let Root = location.search ? ConnectDockPanel : ConnectPerspectives;
		wampTest
		.then(() => {
			const store = configureStore(initialState);
			render(
				<Provider store={store}>
					<Root/>
				</Provider>,
				document.querySelector('body > div.entry')
			);
		})
		.catch(err => { throw err; });
	}
}
document.addEventListener('readystatechange', whenReadyRender);
whenReadyRender();
