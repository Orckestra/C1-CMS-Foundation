import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentPage from '../../../../../Composite/console/components/container/DocumentPage';
import FormPage from '../../../../../Composite/console/components/presentation/FormPage';

describe('DocumentPage', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			dataFields: {
				'one': 1,
				'two': 2
			}
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value', // Not required - should be there anyway when passed through
			name: 'testName', // required for FormPage
			buttonDefs: {}, // required for FormPage
			actions: {}, // required for FormPage
			fieldsetDefs: {}, // required for FormPage
			dataFieldDefs: {}, // required for FormPage
			values: {}, // required for FormPage
			pageDef: {} // required for FormPage
		};
	});

	it('renders a FormPage with props, values and actions', () => {
		renderer.render(<DocumentPage store={store} {...props}/>);
		return Promise.all([
			expect(renderer, 'to have rendered', <FormPage
				{...props}
				values={state.dataFields}
				actions={{
					save: expect.it('to be a function'),
					updateValue: expect.it('to be a function')}
				}/>),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
