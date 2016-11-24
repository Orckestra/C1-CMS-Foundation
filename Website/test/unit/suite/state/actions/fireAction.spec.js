import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';

describe('Fire server action', () => {
	let actions;
	before(done => {
		loadModules([
			{
				module: 'console/state/actions/fireAction.js',
				moduleCb: m => { actions = m; }
			}
		], () => done());
	});


	it('has action descriptors', () =>
		expect(actions, 'to have property', 'FIRE_ACTION')
		.and('to have property', 'FIRE_ACTION_DONE')
		.and('to have property', 'FIRE_ACTION_FAILED')
	);

	describe('fireAction', () => {
		let dispatch, actionId, valueData, fireAction;
		beforeEach(() => {
			fireAction = actions.fireAction;
			dispatch = sinon.spy().named('dispatch');
			actionId = 'action';
			valueData = {};
		});

		it('creates a thunk that sends a server action off, fires state actions to track it', () => {
			return expect(() => expect(fireAction, 'when called with', [actionId, 'testPage', valueData])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: {
					method: 'POST',
					url: '/SomeURL',
					body: { actionId, pageName: 'testPage', valueData }
				},
				response: {
					statusCode: 200,
					body: { actionId, pageName: 'testPage', result: 'OK' }
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.FIRE_ACTION, actionId, pageName: 'testPage' }] },
					{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_DONE, actionId, pageName: 'testPage' }] }
				])
			);
		});

		it('sends word of unhandled errors, and reverts cleared dirty flags', () => {
			return expect(() => expect(fireAction, 'when called with', [actionId, 'testPage', valueData])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: {
					method: 'POST',
					url: '/SomeURL',
					body: { actionId, pageName: 'testPage', valueData }
				},
				response: {
					statusCode: 404
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.FIRE_ACTION,  actionId, pageName: 'testPage' }] },
					{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_FAILED, actionId, pageName: 'testPage', message: '404 Not Found' }] }
				])
			);
		});
	});
});
