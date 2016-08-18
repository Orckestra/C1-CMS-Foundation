import expect from '../../helpers/expect';
import initState from 'console/state/initState.js';
import sinon from 'sinon';
import { SELECT_PAGE, REPLACE_PAGES } from 'console/state/actions/pageSelection.js';

describe('initState', () => {
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
				{ spy: store.dispatch, args: [expect.it('to be a function')]},
				{ spy: store.dispatch, args: [{ type: REPLACE_PAGES }]},
				{ spy: store.dispatch, args: [{ type: SELECT_PAGE }]}
			])
		)
	);
});
