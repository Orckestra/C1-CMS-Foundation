import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/logs.js';
import { STORE_OPTION_LIST } from 'console/state/reducers/options.js';
// import Immutable from 'immutable';

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
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: 'GET /Composite/api/Logger/GetDates',
				response: {
					status: 200,
					body: [
						'9/28/2016',
						'9/30/2016',
						'10/3/2016'
					]
				}
			},
			'not to error'
		)
		.then(() =>
			expect(dispatch, 'to have calls satisfying', [{
				args: [{
					type: STORE_OPTION_LIST,
					field: 'logDate',
					options: [
						{ value: '2016-10-03T00:00:00.000Z', label: '10/3/2016' },
						{ value: '2016-09-30T00:00:00.000Z', label: '9/30/2016' },
						{ value: '2016-09-28T00:00:00.000Z', label: '9/28/2016' }
					]
				}]
			}])
		)
	);
});
