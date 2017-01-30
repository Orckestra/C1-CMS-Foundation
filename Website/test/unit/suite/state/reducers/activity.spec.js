import expect from 'unittest/helpers/expect.js';
import activity from 'console/state/reducers/activity.js';
import Immutable from 'immutable';

describe('Activity', () => {
	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = activity(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({}));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = activity(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		it('sets activity flag when load action begins', () => {
			let action = { type: 'FAKE_ACTION_COMMENCE' };
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = activity(oldState, action);
			return expect(newState, 'not to be', oldState)
			.and('to satisfy', {
				thing: 'do not touch',
				FAKE_ACTION: 1
			});
		});

		it('clears activity flag when load action done', () => {
			let action = { type: 'FAKE_ACTION_DONE' };
			let oldState = Immutable.fromJS({ thing: 'do not touch', FAKE_ACTION: 1 });
			let newState = activity(oldState, action);
			return expect(newState, 'not to be', oldState)
			.and('to satisfy', {
				thing: 'do not touch',
				FAKE_ACTION: 0
			});
		});

		it('clears activity flag when load action failed', () => {
			let action = { type: 'FAKE_ACTION_FAILED' };
			let oldState = Immutable.fromJS({ thing: 'do not touch', FAKE_ACTION: 1 });
			let newState = activity(oldState, action);
			return expect(newState, 'not to be', oldState)
			.and('to satisfy', {
				thing: 'do not touch',
				FAKE_ACTION: 0
			});
		});

		it('respects already cleared flags', () => {
			let action = { type: 'FAKE_ACTION_DONE' };
			let oldState = Immutable.fromJS({ thing: 'do not touch', FAKE_ACTION: 0 });
			let newState = activity(oldState, action);
			return expect(newState, 'to be', oldState);
		});
	});
});
