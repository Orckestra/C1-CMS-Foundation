import expect from '../../helpers/expect';
import configureStore from '../../../../Composite/console/state/store';
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
