import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('initState', () => {
	let initState;
	before(done => {
		loadModules([
			{
				module: 'console/state/initState.js',
				moduleCb: m => { initState = m.default; }
			}
		], () => done());
	});

	let store;
	beforeEach(() => {
		store = {
			dispatch: sinon.spy().named('dispatch')
		};
	});

	it('loads definitions, sets page list, the shown page', () =>
		expect(initState, 'when called with', [store], 'to be undefined')
		.then(() =>
			expect(store.dispatch, 'to have calls satisfying', [
				{ spy: store.dispatch, args: [expect.it('to be a function')]}
			])
		)
	);
});
