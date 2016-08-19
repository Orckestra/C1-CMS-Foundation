import expect from 'unittest/helpers/expect.js';
import configureStore from 'console/state/store.js';
// import getHotReloadStore from 'systemjs-hot-reloader-store';

describe('configureStore', () => {
	it('creates and configures a store', () =>
		expect(configureStore, 'when called with', [{}])
		.then(store => expect(store, 'to be an object')
		.and('to satisfy', {
			dispatch: expect.it('to be a function')
		}))
	);
});
