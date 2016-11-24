// TODO: Remove this when proper services available.
import { waitFor } from 'console/mocks/mockServer.js';

import Wampy from 'wampy';
let currentClients = {};

function getClient(realm) {
	// TODO: Rip out the whole waiting rigmarole when not relying on mock services...
	return waitFor()
	.then(() => {
		if (currentClients[realm]) {
			return Promise.resolve(currentClients[realm]);
		} else {
			return new Promise((resolve, reject) => {
				let url = new URL('/Composite/api/Router', location.href);
				url.protocol = 'ws:';
				const client = new Wampy(url.href, {
					realm,
					onConnect: () => {
						currentClients[realm] = client;
						resolve(client);
					},
					onError: err => reject(err)
				});
			});
		}
	});
}

function close(realm) {
	if (currentClients[realm]) {
		currentClients[realm].disconnect();
		delete currentClients[realm];
	}
}

function closeAll() {
	Object.keys(currentClients).forEach(realm => close(realm));
}
window.addEventListener('beforeunload', closeAll);

const WAMPClient = {
	call: (uri, ...args) => {
		return getClient('realm1')
		.then(client =>
			new Promise((resolve, reject) =>
				client.call(uri, args, { onSuccess: (_, result) => resolve(result), onError: reject })
			)
		);
	}
};

export default WAMPClient;
