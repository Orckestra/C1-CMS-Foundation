import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentPage from 'console/components/container/DocumentPage.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import { UPDATE_VALUE } from 'console/state/reducers/dataFields.js';

describe('DocumentPage', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			pages: {
				currentPage: 'testpage',
				tabs: {
					currentPage: 'tab'
				}
			},
			dataFields: {
				dirtyFields: [],
				'one': 1,
				'two': 2
			},
			buttonDefs: {}, // required for FormTab
			tabDefs: {}, // required for FormTab
			fieldsetDefs: {}, // required for FormTab
			dataFieldDefs: {}, // required for FormTab
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value', // Not required - should be there anyway when passed through
			name: 'testName', // required for FormTab
			actions: {}, // required for FormTab
			pageDef: {}, // required for FormTab
			values: {} // required for FormTab
		};
	});

	it('renders a FormTab with props, values and actions', () => {
		renderer.render(<DocumentPage store={store} {...props}/>);
		return expect(renderer, 'to have rendered', <ToolbarFrame
			{...props}
			values={state.dataFields}
			buttonDefs={{}}
			fieldsetDefs={{}}
			dataFieldDefs={{}}
			actions={{
				updateValue: expect.it('to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'when called with', ['value'], 'to be undefined'), // Result is call to store.dispatch
				save: expect.it('to be a function')
					.and('when called with', ['pagename'], 'to be a function')
					.and('when called with', ['pagename'], 'when called', 'to be undefined'), // Result is call to store.dispatch
				fireAction: expect.it('to be a function')
					.and('when called with', ['pagename', 'actionId'], 'to be a function')
					.and('when called with', ['pagename', 'actionId'], 'when called with', [['val1', 'val2']], 'to be undefined') // Result is call to store.dispatch
			}}
			dirtyPages={[]}/>)
		.then(() => expect(store.dispatch, 'to have calls satisfying', [
			{ args: [{ type: UPDATE_VALUE, pageName: 'pagename', fieldName: 'fieldname', newValue: 'value' }]},
			{ args: [expect.it('to be a function')]},
			{ args: [expect.it('to be a function')]}
		]));
	});
});
