import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import * as actions from 'console/state/actions/pageDefs.js';
import { STORE_DEF } from  'console/state/actions/componentDefinitions.js';

describe('Get page definitions', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_PAGE_DEF')
		.and('to have property', 'LOAD_PAGE_DEF_DONE')
		.and('to have property', 'LOAD_PAGE_DEF_FAILED')
	);

	describe('loadPageDef', () => {
		let dispatch, loadPageDef, rawPageDef;
		beforeEach(() => {
			loadPageDef = actions.loadPageDef;
			dispatch = sinon.spy().named('dispatch');
			rawPageDef = [
				{
					name: 'testPage',
					type: 'test',
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
		});

		it('creates a thunk that dispatches actions', () => {
			return expect(() => expect(loadPageDef, 'when called with', ['testPage'])
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'with http mocked out', {
				request: 'GET /Composite/console/pageData.json',
				response: {
					body: JSON.stringify(rawPageDef)
				}
			}, 'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF, name: 'testPage' }] },
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'page', definition: {
						name: 'testPage',
						fieldsets: ['testFieldSet'],
						buttons: ['testButton'],
						type: 'test'
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'fieldset', definition: {
						name: 'testFieldSet',
						label: 'A test',
						fields: ['testDataField']
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'dataField', definition: {
						name: 'testDataField',
						label: 'A field'
					}}]},
					{ spy: dispatch, args: [{ type: STORE_DEF, defType: 'button', definition: {
						name: 'testButton',
						label: 'Test it'
					}}]},
					{ spy: dispatch, args: [{ type: actions.LOAD_PAGE_DEF_DONE, name: 'testPage' }] }
				])
			);
		});
	});
});
