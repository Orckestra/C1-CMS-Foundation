import Wampy from 'wampy';
import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { getBaseUrl } from './utils.js';

const Warning = styled.div`
	max-width: 400px;
	max-height: 200px;
	text-align: center;
	padding: 40px;
	margin: 50px auto;
	border: 3px solid red;
	border-radius: 5px;
	background-color: salmon;
`;

const test = new Promise((resolve, reject) => {

	let url = new URL(getBaseUrl() + '/Composite/api/Router', location.href);
	let isConnected = false;
	url.protocol = url.protocol.replace('http', 'ws');
	const client = new Wampy(url.href, {
		realm: 'realm',
		maxRetries: 0,
		onConnect: () => {
			resolve();
			isConnected = true;
			client.disconnect();
		},
		onError: err => {
			if (!isConnected) { //FF throw error on disconnect and on server restarted
				render(
					<Warning>
						<h1>Problem establishing WebSocket connection to server</h1>
						<p>
							There is an issue with connecting to the server – this
							could indicate that the web server does not support
							WebSocket requests.
						</p>
						<p>
							For more information,<span> </span>
							<a href="http://docs.composite.net/Getting-started/Setup-check-failures?errors=websockets" target="_blank">
								please read more about WebSocket requirements.
							</a>
						</p>
					</Warning>,
					document.querySelector('body > div.entry')
				);
				reject(err);
			}
		}
	});
});

export default test;
