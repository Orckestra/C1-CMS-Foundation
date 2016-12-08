import Wampy from 'wampy';
let currentClients = {};

function getClient(realm) {
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
				client.call(uri, args, { onSuccess: (r1, r2) => {
					// Unpick the way Wampy passes data: (see https://github.com/KSDaemon/wampy.js/blob/dev/Migrating.md)
					if (r1 && r1.length === 0) {
						// RPC returned non-array
						resolve(r2);
					} else {
						// RPC returned array
						resolve(r1);
					}
				}, onError: reject })
			)
		);
	}
};

export default WAMPClient;
