import expect from 'unittest/helpers/expect.js';
import { subscribe, unsubscribe, stateChange } from 'console/state/observers.js';
import Immutable from 'immutable';
import sinon from 'sinon';

describe('State observation', () => {
	let oldState, newState, handler, path;
	beforeEach(() => {
		path = ['we', 'have', 'to', 'go', 'deeper'];
		oldState = Immutable.fromJS({
			we: {
				have: {
					to: {
						go: {
							deeper: true
						}
					}
				}
			}
		});
		newState = oldState.setIn(path, false);
		handler = sinon.spy().named('handler');
	});

	it('can subscribe and unsubscribe to state changes', () =>
		expect(subscribe, 'when called with', [path, handler])
		.then(() =>
			expect(stateChange, 'when called with', [oldState, newState])
		).then(() =>
			expect(handler, 'was called times', 1)
		).then(() =>
			expect(unsubscribe, 'when called with', [path, handler])
		).then(() =>
			expect(stateChange, 'when called with', [newState, oldState])
		).then(() =>
			expect(handler, 'was called times', 1)
		)
	);
});
