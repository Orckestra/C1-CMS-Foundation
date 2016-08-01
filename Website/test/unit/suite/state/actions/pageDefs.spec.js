import expect from '../../../helpers/expect';
import sinon from 'sinon';
import * as actions from '../../../../../Composite/console/state/actions/pageDefs';
import { STORE_DEF } from  '../../../../../Composite/console/state/actions/componentDefinitions';

describe('Get page definitions', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_PAGE_DEF')
		.and('to have property', 'LOAD_PAGE_DEF_DONE')
		.and('to have property', 'LOAD_PAGE_DEF_FAILED')
	);

	describe('loadPageDef', () => {
		let dispatch, loadPageDef, rawPageDef, normDefs;
		beforeEach(() => {
			loadPageDef = actions.loadPageDef;
			dispatch = sinon.spy().named('dispatch');
			rawPageDef = [
				{
					name: 'testPage',
					type: 'TestComponent',
					fieldsets: [
						{
							name: 'testFieldSet',
							label: 'A test',
							fields: [
								{
									name: 'testDataField',
									label: 'A field'
								}
							]
						}
					],
					buttons: [
						{
							name: 'testButton',
							label: 'Test it'
						}
					]
				}
			];
			normDefs = {
				pageDefs: {
					testPage: {
						name: 'testPage',
						fieldsets: ['testFieldSet'],
						buttons: ['testButton'],
						type: 'TestComponent'
					}
				},
				fieldsetDefs: {
					testFieldSet: {
						name: 'testFieldSet',
						label: 'A test',
						fields: ['testDataField']
					}
				},
				dataFieldDefs: {
					testDataField: {
						name: 'testDataField',
						label: 'A field'
					}
				},
				buttonDefs: {
					testButton: {
						name: 'testButton',
						label: 'Test it'
					}
				}
			};
		});

		it('creates a thunk that dispatches actions', () => {
			return expect(() => expect(loadPageDef, 'when called with', ['testPage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with xhr mocked out', {
				request: 'GET /Composite/console/pageData.json',
				response: {
					body: JSON.stringify(rawPageDef)
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF, name: 'testPage' }] },
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'page', definition: normDefs.pageDefs.testPage }]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'fieldset', definition: normDefs.fieldsetDefs.testFieldSet }]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'dataField', definition: normDefs.dataFieldDefs.testDataField }]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'button', definition: normDefs.buttonDefs.testButton }]},
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF_DONE, name: 'testPage' }] }
				])
			);
		});
	});
});
