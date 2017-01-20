import Wampy from 'wampy';
let currentClients = {};

function getClient(realm) {
	if (currentClients[realm]) {
		return Promise.resolve(currentClients[realm]);
	} else {
		return new Promise((resolve, reject) => {
			let url = new URL('/Composite/api/Router', location.href);
			url.protocol = url.protocol.replace('http', 'ws');
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
		return getClient('realm')
		.then(client =>
			new Promise((resolve, reject) =>
				client.call(uri, args, { onSuccess: result => {
					// Unpick the way Wampy passes data: (see https://github.com/KSDaemon/wampy.js/blob/dev/Migrating.md)
					if (Array.isArray(result) && result.length === 1) {
						// RPC returned non-array
						resolve(result[0]);
					} else {
						// RPC returned array
						resolve(result);
					}
				}, onError: reject })
			)
		);
	},
	subscribe: (uri, handler) => {
		return getClient('realm')
		.then(client =>
			new Promise((resolve, reject) => {
				client.subscribe(uri, {
					onSuccess: (...args) => resolve(args),
					onError: (message, details) => reject({message, details}),
					onEvent: handler // Potentially needs argument unwrapping
				});
			})
		);
	}
};

export default WAMPClient;
