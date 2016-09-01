import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/fireAction.js';

describe('Fire server action', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'FIRE_ACTION')
		.and('to have property', 'FIRE_ACTION_DONE')
		.and('to have property', 'FIRE_ACTION_FAILED')
	);

	describe('fireAction', () => {
		let dispatch, actionId, valueData, fireAction = actions.fireAction;
		beforeEach(() => {
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
					{ spy: dispatch, args: [{ type: actions.FIRE_ACTION_FAILED, actionId, pageName: 'testPage', error: '404 Not Found' }] }
				])
			);
		});
	});
});
