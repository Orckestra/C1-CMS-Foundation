import expect from 'unittest/helpers/expect.js';
import layout, * as actions from 'console/state/reducers/layout.js';
import Immutable from 'immutable';

describe('Layout', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'RESIZE_WINDOW')
		);

		describe('Resize', () => {
			let resizeWindow = actions.resizeWindow;
			it('creates action for refreshing a log\'s entries', () => {
				let action = resizeWindow(1440, 768);
				return expect(action, 'to be an action of type', actions.RESIZE_WINDOW)
					.and('to have property', 'height', 768)
					.and('to have property', 'width', 1440);
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = layout(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({ window: { width: 0, height: 0 }}));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = layout(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		describe('resize window', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.RESIZE_WINDOW,
					width: 1440,
					height: 768
				};
			});

			it('Resets the window dimensions', () => {
				let oldState = Immutable.fromJS({
					window: {
						height: 600,
						width: 800
					}
				});
				let newState = layout(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					window: {
						width: 1440,
						height: 768
					}
				}));
			});
		});
	});
});
