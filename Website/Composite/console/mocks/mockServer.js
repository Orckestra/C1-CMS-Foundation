import Wampy from 'wampy';
import pageFetcher from 'console/mocks/services/pageMock.js';
import valueFetcher from 'console/mocks/services/valueMock.js';

let url = new URL('/Composite/api/Router', location.href);
url.protocol = 'ws:';

function RPCWrapper (handler) {
	return (args) => [{}, handler(...args)];
}

const client = new Wampy(url.href, {
	realm: 'realm1',
	onConnect: () => {
		registerMock('alive', () => true);
		// Register other mock rpcs.
		registerMock('struct.page', pageFetcher);
		registerMock('data.values', valueFetcher);
	}
});

function registerMock(name, handler) {
	client.register('mock.' + name, {
		rpc: RPCWrapper(handler),
		onError: console.error.bind(console, name), // eslint-disable-line no-console
		onSuccess: () => console.log('registered procedure mock.' + name) // eslint-disable-line no-console
	});
}
