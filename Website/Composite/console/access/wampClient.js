import Wampy from 'wampy';
let currentClients = {};

export function getClient(realm) {
	if (currentClients[realm]) {
		return new Promise.resolve(currentClients[realm].session);
	} else {
		return new Promise((resolve, reject) => {
			let url = new URL('/Composite/api/Router', location.href);
			url.protocol = 'ws:';
			const client = new Wampy(url.href, {
				realm,
				onConnect: () => resolve(client),
				onError: err => reject(err)
			});
		});
	}
}

export function close(realm, reason = null, message = null) {
	if (currentClients[realm]) {
		currentClients[realm].disconnect(reason, message);
		delete currentClients[realm];
	}
}

export default getClient;
