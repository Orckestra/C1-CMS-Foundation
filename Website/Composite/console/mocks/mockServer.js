import Wampy from 'wampy';
import pageFetcher from 'console/mocks/services/pageMock.js';
import { valueFetcher, valuePutter } from 'console/mocks/services/valueMock.js';

let url = new URL('/Composite/api/Router', location.href);
url.protocol = 'ws:';

function RPCWrapper (handler) {
	return (args) => [{}, [handler(...args)]]; // Mock RPCs will now behave like WampSharp RPCs
}

// XXX: This is nasty. Happily it's also temporary.
let unblock;
const wait = new Promise(resolve => {
	unblock = () => resolve(true);
});
export function waitFor() {
	return wait;
}

const client = new Wampy(url.href, {
	realm: 'realm',
	onConnect: () => {
		Promise.all([
			// Register other mock rpcs.
			registerMock('struct.page', pageFetcher),
			registerMock('data.values.load', valueFetcher),
			registerMock('data.values.save', valuePutter),
		]).then(unblock);
	}
});
window.addEventListener('beforeunload', client.disconnect.bind(client));

function registerMock(name, handler) {
	return new Promise(resolve => {
		client.register('mock.' + name, {
			rpc: RPCWrapper(handler),
			onError: err => {
				console.error(err); // eslint-disable-line no-console
				resolve();
			},
			onSuccess: () => {
				console.log('registered procedure mock.' + name); // eslint-disable-line no-console
				resolve();
			}
		});
	});
}
