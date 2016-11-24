import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import getHotReloadStore from 'systemjs-hot-reloader-store';

const hotStore = getHotReloadStore('console:store');

describe('configureStore', () => {
	let configureStore;
	before(done => {
		loadModules([
			{
				module: 'console/state/store.js',
				moduleCb: m => { configureStore = m.default; }
			}
		], () => done());
	});

	afterEach(() => {
		hotStore.prevStore = null;
		delete window.devToolsExtension;
	});

	it('creates and configures a store', () =>
		expect(configureStore, 'when called with', [{}])
		.then(store => expect(store, 'to be an object')
		.and('to satisfy', {
			dispatch: expect.it('to be a function')
		}))
	);

	it('hot-reloads correctly', () => {
		let store = { replaceReducer: sinon.spy().named('replaceReducer') };
		hotStore.prevStore = store;
		return expect(configureStore, 'when called with', [{}])
		.then(() => expect (store.replaceReducer, 'was called once'));
	});

	it('applies Redux dev tool middleware if available', () => {
		let spiedMiddleWare = sinon.spy(() => f => f).named('middleware');
		window.devToolsExtension = spiedMiddleWare;
		return expect(configureStore, 'when called with', [{}])
		.then(() => expect (spiedMiddleWare, 'was called once'));
	});
});
