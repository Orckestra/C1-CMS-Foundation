import expect from 'unittest/helpers/expect.js';
import dataFields, * as actions from 'console/state/reducers/dataFields.js';
import Immutable from 'immutable';

describe('Data fields', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'COMMIT_PAGE')
			.and('to have property', 'ROLLBACK_PAGE')
			.and('to have property', 'UPDATE_VALUE')
			.and('to have property', 'STORE_VALUES')
		);

		describe('Commit page', () => {
			let commitPage = actions.commitPage;
			it('creates action for committing an edited page', () => {
				let action = commitPage('testpage');
				return expect(action, 'to be an action of type', actions.COMMIT_PAGE)
					.and('to have property', 'pageName', 'testpage');
			});
		});

		describe('Rollback page', () => {
			let rollbackPage = actions.rollbackPage;
			it('creates action for committing an edited page', () => {
				let action = rollbackPage('testpage', Immutable.fromJS({ field1: 'One', field2: 'Two' }));
				return expect(action, 'to be an action of type', actions.ROLLBACK_PAGE)
					.and('to have property', 'pageName', 'testpage')
					.and('to have property', 'values', Immutable.fromJS({ field1: 'One', field2: 'Two' }));
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
			it('creates action for storing multiple values on a page', () => {
				let action = storeValues('testpage', { a: 1, b: true, c: 'foo', d: { bar: 'baz' } });
				return expect(action, 'to be an action of type', actions.STORE_VALUES)
				.and('to have properties', {
					pageName: 'testpage',
					values: { a: 1, b: true, c: 'foo', d: { bar: 'baz' } }
				});
			});
		});
	});

	describe('reducer', () => {
		it('outputs an intial state if no action and no previous state', () => {
			let newState = dataFields(undefined, {});
			return expect(newState, 'to equal', Immutable.fromJS({ committedPages: {} }));
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = dataFields(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		describe('commit page', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.COMMIT_PAGE,
					pageName: 'testpage'
				};
			});

			it('Commits a page', () => {
				let oldState = Immutable.fromJS({
					testpage: { field1: true, field2: 'stuff' },
					committedPages: {
						testpage: { field1: false, field2: 'nonsense' }
					}
				});
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					testpage: { field1: true, field2: 'stuff' },
					committedPages: {
						testpage: { field1: true, field2: 'stuff' }
					}
				}));
			});
		});

		describe('rollback page', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.ROLLBACK_PAGE,
					pageName: 'testpage'
				};
			});

			it('Rolls back a page', () => {
				let oldState = Immutable.fromJS({
					testpage: { field1: true, field2: 'stuff' },
					committedPages: {
						testpage: { field1: false, field2: 'nonsense' }
					}
				});
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					testpage: { field1: false, field2: 'nonsense' },
					committedPages: {
						testpage: { field1: false, field2: 'nonsense' }
					}
				}));
			});

			it('Rolls back a page even if already committed', () => {
				action.values = Immutable.fromJS({ field1: false, field2: 'nonsense' });
				let oldState = Immutable.fromJS({
					testpage: { field1: true, field2: 'stuff' },
					committedPages: {
						testpage: { field1: false, field2: 'stuff' }
					}
				});
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					testpage: { field1: false, field2: 'nonsense' },
					committedPages: {
						testpage: { field1: false, field2: 'nonsense' }
					}
				}));
			});
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

			it('updates a field value on an unknown page', () => {
				let oldState = Immutable.fromJS({ thing: 'do not touch', committedPages: {} });
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					thing: 'do not touch',
					testpage: { testfield: 'testvalue' },
					committedPages: { testpage: {} }
				}));
			});

			it('updates a field value on a known page', () => {
				let oldState = Immutable.fromJS({ thing: 'do not touch', testpage: {}, committedPages: { testpage: {}} });
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					thing: 'do not touch',
					testpage: { testfield: 'testvalue' },
					committedPages: { testpage: {} }
				}));
			});
		});

		describe('store', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.STORE_VALUES,
					pageName: 'page1',
					values: {
						field1: 202
					}
				};
			});

			it('stores the passed values in state and resets dirty fields and pages', () => {
				let oldState = Immutable.fromJS({
					page1: {
						field1: 0
					},
					page2: {
						field2: 'no',
						field3: false
					},
					page3: {
						field4: ''
					},
					committedPages: {
						page1: {
							field1: 3
						},
						page2: {
							field2: 'yes',
							field3: true
						},
						page3: {
							field4: 'something'
						}
					}
				});
				let newState = dataFields(oldState, action);
				return expect(newState, 'not to be', oldState)
				.and('to equal', Immutable.fromJS({
					page1: {
						field1: 202
					},
					page2: {
						field2: 'no',
						field3: false
					},
					page3: {
						field4: ''
					},
					committedPages: {
						page1: {
							field1: 202
						},
						page2: {
							field2: 'yes',
							field3: true
						},
						page3: {
							field4: 'something'
						}
					}
				}));
			});
		});
	});
});
