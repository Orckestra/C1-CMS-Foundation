import expect from '../../../helpers/expect';
import dataFields from '../../../../../Composite/console/state/reducers/dataFields';
import { UPDATE_VALUE } from '../../../../../Composite/console/state/actions/documentPage';

describe('Data field reducer', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let state = dataFields(undefined, {});
		return expect(state, 'to equal', {});
	});

	it('outputs the same state object if no action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = dataFields(oldState, {});
		return expect(newState, 'to be', oldState);
	});

	it('updates state when given update action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = dataFields(oldState, {
			type: UPDATE_VALUE,
			fieldName: 'testfield',
			newValue: 'testvalue'
		});
		return expect(newState, 'not to be', oldState)
		.and('to equal', {
			thing: 'do not touch',
			testfield: 'testvalue'
		});
	});
});
