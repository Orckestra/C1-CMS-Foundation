import expect from 'unittest/helpers/expect.js';
import logs, * as actions from 'console/state/reducers/logs.js';
import Immutable from 'immutable';

describe('Logs', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'REFRESH_LOG')
		);

		describe('Refresh', () => {
			let refreshLogs = actions.refreshLogs;
			it('creates action for refreshing a log\'s entries', () => {
				let entries = [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
				let action = refreshLogs('testlog', '2016-10-15', entries);
				return expect(action, 'to be an action of type', actions.REFRESH_LOG)
					.and('to have property', 'logName', 'testlog')
					.and('to have property', 'page', '2016-10-15')
					.and('to have property', 'entries', entries);
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = logs(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({}));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = logs(oldState, {});
			return expect(newState, 'to be', oldState);
		});
	});
});
