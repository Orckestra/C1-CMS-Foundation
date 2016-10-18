import expect from 'unittest/helpers/expect.js';
import logs, * as actions from 'console/state/reducers/logs.js';
import Immutable from 'immutable';

describe('Logs', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'REFRESH_LOG')
		);

		describe('Refresh', () => {
			let refreshLog = actions.refreshLog;
			it('creates action for refreshing a log\'s entries', () => {
				let entries = [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ];
				let action = refreshLog('testlog', '2016-10-15', entries);
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

		describe('refresh log', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.REFRESH_LOG,
					logName: 'testlog',
					page: '2016-10-12',
					entries: [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
				};
			});

			it('Adds a new log page', () => {
				let oldState = Immutable.fromJS({
					testlog: {
						'otherday': ['no', 'change']
					},
					otherlog: {
						'someday': ['no', 'touchy']
					}
				});
				let newState = logs(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					testlog: {
						'otherday': ['no', 'change'],
						'2016-10-12': [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
					},
					otherlog: {
						'someday': ['no', 'touchy']
					}
				}));
			});

			it('Replaces entries on a log page', () => {
				let oldState = Immutable.fromJS({
					testlog: {
						'otherday': ['no', 'change'],
						'2016-10-12': ['old', 'stuff', 'in', 'here']
					},
					otherlog: {
						'someday': ['no', 'touchy']
					}
				});
				let newState = logs(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					testlog: {
						'otherday': ['no', 'change'],
						'2016-10-12': [ 'test1', 'test2', 'test3', 'test4', 'test5', 'test6' ]
					},
					otherlog: {
						'someday': ['no', 'touchy']
					}
				}));
			});
		});
	});
});
