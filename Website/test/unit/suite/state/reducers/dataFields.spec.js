import expect from 'unittest/helpers/expect.js';
import dataFields from 'console/state/reducers/dataFields.js';
import { UPDATE_VALUE } from 'console/state/actions/documentPage.js';

describe('Data fields', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let newState = dataFields(undefined, {});
		return expect(newState, 'to equal', {});
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
