import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentPage from 'console/components/container/DocumentPage.js';
import FormPage from 'console/components/presentation/FormPage.js';
import { SAVE_STATE, UPDATE_VALUE } from 'console/state/actions/documentPage.js';

describe('DocumentPage', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			dataFields: {
				'one': 1,
				'two': 2
			},
			buttonDefs: {}, // required for FormPage
			fieldsetDefs: {}, // required for FormPage
			dataFieldDefs: {}, // required for FormPage
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value', // Not required - should be there anyway when passed through
			name: 'testName', // required for FormPage
			actions: {}, // required for FormPage
			pageDef: {}, // required for FormPage
			values: {} // required for FormPage
		};
	});

	it('renders a FormPage with props, values and actions', () => {
		renderer.render(<DocumentPage store={store} {...props}/>);
		return Promise.all([
			expect(renderer, 'to have rendered', <FormPage
				{...props}
				values={state.dataFields}
				buttonDefs={{}}
				fieldsetDefs={{}}
				dataFieldDefs={{}}
				actions={{
					save: expect.it('to be a function')
						.and('when called with', ['pagename'], 'to be a function')
						.and('when called with', ['pagename'], 'when called', 'to be undefined'), // Result is call to store.dispatch
					updateValue: expect.it('to be a function')
						.and('when called with', ['fieldname'], 'to be a function')
						.and('when called with', ['fieldname'], 'when called with', ['value'], 'to be undefined') // Result is call to store.dispatch
				}}/>),
			expect(store.dispatch, 'to have calls satisfying', [
				{ args: [{ type: SAVE_STATE, pageName: 'pagename' }]},
				{ args: [{ type: UPDATE_VALUE, fieldName: 'fieldname', newValue: 'value' }]}
			]),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
