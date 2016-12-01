import Wampy from 'wampy';
import pageFetcher from 'console/mocks/services/pageMock.js';
import { valueFetcher, valuePutter } from 'console/mocks/services/valueMock.js';
import { getFunction, pickFunction } from 'console/mocks/services/functionMock.js';

let url = new URL('/Composite/api/Router', location.href);
url.protocol = 'ws:';

function RPCWrapper (handler) {
	return (args) => [{}, handler(...args)];
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
	realm: 'realm1',
	onConnect: () => {
		Promise.all([
			registerMock('alive', () => true),
			// Register other mock rpcs.
			registerMock('struct.page', pageFetcher),
			registerMock('data.values.load', valueFetcher),
			registerMock('data.values.save', valuePutter),
			registerMock('provider.components.list', getFunction),
			registerMock('provider.components.pick', pickFunction)
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
