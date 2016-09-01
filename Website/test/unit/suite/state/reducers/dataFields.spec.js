import expect from 'unittest/helpers/expect.js';
import dataFields, * as actions from 'console/state/reducers/dataFields.js';

describe('Data fields', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'FLAG_PAGE_CLEAN')
			.and('to have property', 'UPDATE_VALUE')
			.and('to have property', 'STORE_VALUES')
			.and('to have property', 'FLAG_FIELDS_DIRTY')
		);

		describe('Commit page', () => {
			let commitPage = actions.commitPage;
			it('creates action for clearing a page\'s dirty flag', () => {
				let action = commitPage('testpage');
				return expect(action, 'to be an action of type', actions.FLAG_PAGE_CLEAN)
					.and('to have property', 'pageName', 'testpage');
			});
		});

		describe('Update field value', () => {
			let updateFieldValue = actions.updateFieldValue;
			it('creates action for updating a field value', () => {
				let action = updateFieldValue('testpage', 'testfield', 'testvalue');
				return expect(action, 'to be an action of type', actions.UPDATE_VALUE)
				.and('to have properties', {
					pageName: 'testpage',
					fieldName: 'testfield',
					newValue: 'testvalue'
				});
			});
		});

		describe('Store value set', () => {
			let storeValues = actions.storeValues;
			it('creates action for storing multiple values', () => {
				let action = storeValues({ a: 1, b: true, c: 'foo', d: { bar: 'baz' } });
				return expect(action, 'to be an action of type', actions.STORE_VALUES)
				.and('to have properties', {
					values: { a: 1, b: true, c: 'foo', d: { bar: 'baz' } }
				});
			});
		});
	});

	describe('Flag fields dirty', () => {
		let flagDirty = actions.flagDirty;
		it('creates action that sets a list of dirty fields on a page', () => {
			let action = flagDirty('testpage', ['field1', 'field2', 'field3']);
			return expect(action, 'to be an action of type', actions.FLAG_FIELDS_DIRTY)
			.and('to have properties', {
				pageName: 'testpage',
				fieldNames: ['field1', 'field2', 'field3']
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = dataFields(undefined, {});
			return expect(newState, 'to equal', { dirtyPages: {} });
		});

		it('outputs the same state object if no action', () => {
			let oldState = { thing: 'do not touch', dirtyPages: {} };
			let newState = dataFields(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		describe('update value', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.UPDATE_VALUE,
					pageName: 'testpage',
					fieldName: 'testfield',
					newValue: 'testvalue'
				};
			});

			it('updates a field value', () => {
				let oldState = { thing: 'do not touch', dirtyPages: {} };
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					testfield: 'testvalue',
					dirtyPages: { testpage: ['testfield'] }
				});
			});

			it('only adds page to dirty list if not already on it', () => {
				let oldState = {
					thing: 'do not touch',
					testfield: 'old',
					dirtyPages: { testpage: ['testfield'] }
				};
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					testfield: 'testvalue',
					dirtyPages: { testpage: ['testfield'] }
				});
			});

			it('adds field name to dirty list if not already on it', () => {
				let oldState = {
					thing: 'do not touch',
					testfield: 'old',
					dirtyPages: { testpage: ['otherfield'] }
				};
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					testfield: 'testvalue',
					dirtyPages: { testpage: ['otherfield', 'testfield'] }
				});
			});
		});

		describe('save', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.FLAG_PAGE_CLEAN,
					pageName: 'testpage'
				};
			});

			it('clears the saved page from the dirty list', () => {
				let oldState = {
					thing: 'do not touch',
					testfield: 'testvalue',
					dirtyPages: { testpage: ['testfield'], otherpage: ['somefield'] }
				};
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					testfield: 'testvalue',
					dirtyPages: { otherpage: ['somefield'] }
				});
			});
		});

		describe('store', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.STORE_VALUES,
					values: {
						field1: 202,
						field2: 'some text'
					}
				};
			});

			it('stores the passed values in state and resets dirty fields and pages', () => {
				let oldState = {
					field1: 0,
					field2: 'no',
					field3: false,
					field4: '',
					dirtyPages: {
						page1: [ 'field1' ],
						page2: [ 'field2', 'field3' ],
						page3: [ 'field4' ]
					}
				};
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', {
					field1: 202,
					field2: 'some text',
					field3: false,
					field4: '',
					dirtyPages: {
						page2: [ 'field3' ],
						page3: [ 'field4' ]
					}
				});
			});
		});

		describe('flag fields', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.FLAG_FIELDS_DIRTY,
					pageName: 'page1',
					fieldNames: ['field1', 'field2']
				};
			});

			it('flags fields on a page dirty without changing their values', () => {
				let oldState = {
					field1: 202,
					field2: 'some text',
					field3: false,
					field4: '',
					dirtyPages: {
						page2: [ 'field3' ]
					}
				};
				let newState = dataFields(oldState, action);
				expect(newState, 'not to be', oldState)
				.and('to equal', {
					field1: 202,
					field2: 'some text',
					field3: false,
					field4: '',
					dirtyPages: {
						page1: ['field1', 'field2'],
						page2: [ 'field3' ]
					}
				});
			});
		});
	});
});
