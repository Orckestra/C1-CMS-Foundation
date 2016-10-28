import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/logs.js';
import { STORE_OPTION_LIST, SET_OPTION } from 'console/state/reducers/options.js';
import { REFRESH_LOG } from 'console/state/reducers/logs.js';
import Immutable from 'immutable';

describe('Log operations', () => {
	it('has action descriptors', () =>
	expect(actions, 'to have property', 'GET_LOG_DATES')
		.and('to have property', 'GET_LOG_DATES_DONE')
		.and('to have property', 'GET_LOG_DATES_FAILED')
		.and('to have property', 'GET_LOG')
		.and('to have property', 'GET_LOG_DONE')
		.and('to have property', 'GET_LOG_FAILED')
	);

	describe('getLogDates', () => {
		let dispatch, getLogDates = actions.getLogDates;
		beforeEach(() => {
			dispatch = sinon.spy().named('dispatch');
		});

		it('fetches a list of well-formatted dates', () =>
			expect(
				() => expect(getLogDates, 'when called with', ['logDate'])
					.then(thunk =>
						expect(thunk, 'to be a function')
						.and('when called with', [dispatch, () => Immutable.Map()])
					),
					'with http mocked out', {
						request: 'GET /Composite/api/Logger/GetDates',
						response: {
							status: 200,
							body: [
								// These duplicate entries wouldn't happen in real usage, but are useful for test coverage
								'9/30/2016',
								'9/30/2016',
								'9/28/2016',
								'10/3/2016'
							]
						}
					},
					'not to error'
				)
				.then(() =>
				expect(dispatch, 'to have calls satisfying', [
					{ args: [{ type: actions.GET_LOG_DATES }]},
					{
						args: [{
							type: STORE_OPTION_LIST,
							field: 'logDate',
							options: [
								{ value: '2016-10-03T00:00:00.000Z', label: '10/3/2016' },
								{ value: '2016-09-30T00:00:00.000Z', label: '9/30/2016' },
								{ value: '2016-09-30T00:00:00.000Z', label: '9/30/2016' },
								{ value: '2016-09-28T00:00:00.000Z', label: '9/28/2016' }
							]
						}]
					},
					{
						args: [{
							type: SET_OPTION,
							name: 'logDate',
							value: '2016-10-03T00:00:00.000Z'
						}]
					},
					{ args: [{ type: actions.GET_LOG_DATES_DONE }]},
				])
			)
		);

		it('sends word of unhandled errors', () =>
			expect(() => expect(getLogDates, 'when called with', ['logDate'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: 'GET /Composite/api/Logger/GetDates',
				response: {
					statusCode: 404
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.GET_LOG_DATES }] },
					{ spy: dispatch, args: [{ type: actions.GET_LOG_DATES_FAILED, message: '404 Not Found' }] }
				])
			)
		);
	});

	describe('getLogPage', () => {
		let dispatch, getLogPage = actions.getLogPage;
		beforeEach(()=> {
			dispatch = sinon.spy().named('dispatch');
		});

		it('fetches a page of log entries', () =>
			expect(() =>
				expect(getLogPage, 'when called with', ['logDate', '2016-09-29T00:00:00.000Z'])
				.then(thunk =>
					expect(thunk, 'to be a function')
					.and('when called with', [dispatch])
				),
				'with http mocked out', {
					request: {
						method: 'POST',
						url: '/Composite/api/Logger/GetData',
						body: {
							DateFrom: '9/29/2016',
							DateTo: '9/30/2016',
							Severity: 'Verbose',
							Amount: 5000
						}
					},
					response: {
						statusCode: 200,
						body: [
							{
								timestamp: '2016-09-29 13:25:59.52',
								message: 'System.ComponentModel.Win32Exception (0x80004005): The system cannot find the file specified   at Composite.Web.Css.Less.ReparsePointUtils.GetSymbolicLinkTarget(DirectoryInfo symlink)\nat Composite.Web.Css.Less.ReparsePointUtils.GetDirectoryReparsePointTarget(String directoryPath)\nat Composite.Web.Css.Less.StylesHashing.FileHashCalculator.AddWatchesForSymbolicallyLinkedSubfolders(String folder)',
								title: 'LessCss',
								severity: 'Error'
							},
							{
								timestamp: '2016-09-29 12:53:32.50',
								message: 'AppDomain 3 started at 12:53:32:48 in process 9456',
								title: 'ApplicationEventHandler',
								severity: 'Information'
							},
							{
								timestamp: '2016-09-29 15:17:38.18',
								message: 'AppDomain 2 unloaded at 12:52:07:04',
								title: 'ApplicationEventHandler',
								severity: 'Information'
							}
						]
					}
				},
				'not to error')
				.then(() =>
				expect(dispatch, 'to have calls satisfying', [
					{ args: [{ type: actions.GET_LOG, logTabName: 'logDate', day: '2016-09-29T00:00:00.000Z' }] },
					{
						args: [{
							type: REFRESH_LOG,
							logName: 'logDate',
							page: '2016-09-29T00:00:00.000Z',
							entries: [
								{
									timestamp: '2016-09-29 13:25:59.52',
									message: 'System.ComponentModel.Win32Exception (0x80004005): The system cannot find the file specified   at Composite.Web.Css.Less.ReparsePointUtils.GetSymbolicLinkTarget(DirectoryInfo symlink)\nat Composite.Web.Css.Less.ReparsePointUtils.GetDirectoryReparsePointTarget(String directoryPath)\nat Composite.Web.Css.Less.StylesHashing.FileHashCalculator.AddWatchesForSymbolicallyLinkedSubfolders(String folder)',
									title: 'LessCss',
									severity: 'Error'
								},
								{
									timestamp: '2016-09-29 12:53:32.50',
									message: 'AppDomain 3 started at 12:53:32:48 in process 9456',
									title: 'ApplicationEventHandler',
									severity: 'Information'
								},
								{
									timestamp: '2016-09-29 15:17:38.18',
									message: 'AppDomain 2 unloaded at 12:52:07:04',
									title: 'ApplicationEventHandler',
									severity: 'Information'
								}
							]
						}]
					},
					{ args: [{ type: actions.GET_LOG_DONE, logTabName: 'logDate', day: '2016-09-29T00:00:00.000Z' }] }
				])
			)
		);

		it('sends word of unhandled errors', () =>
			expect(() => expect(getLogPage, 'when called with', ['logDate', '2016-09-29T00:00:00.000Z'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: {
					method: 'POST',
					url: '/Composite/api/Logger/GetData',
					body: {
						DateFrom: '9/29/2016',
						DateTo: '9/30/2016',
						Severity: 'Verbose',
						Amount: 5000
					}
				},
				response: {
					statusCode: 404
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.GET_LOG }] },
					{ spy: dispatch, args: [{ type: actions.GET_LOG_FAILED, message: '404 Not Found' }] }
				])
			)
		);
	});
});
