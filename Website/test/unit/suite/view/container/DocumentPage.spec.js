import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentPage from 'console/components/container/DocumentPage.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import { UPDATE_VALUE } from 'console/state/reducers/dataFields.js';
import { SET_OPTION } from 'console/state/reducers/options.js';

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
			pageDefs: {
				'testpage': {
					name: 'testpage',
					toolbars: ['hasItemDefs', 'hasNoItemDefs', 'hasNoToolbarDef']
				}
			},
			dataFields: {
				dirtyPages: {},
				'one': 1,
				'two': 2
			},
			options: {
				'one': true,
				'two': 'set up the bomb'
			},
			toolbarDefs: {
				hasItemDefs: {
					name: 'hasItemDefs',
					items: ['item1', 'item2']
				},
				hasNoItemDefs: {
					name: 'hasNoItemDefs',
					items: ['item3', 'item4']
				}
			},
			itemDefs: {
				item1: {},
				item2: {}
			}
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value', // Not required - should be there anyway when passed through
			name: 'testName', // required for ToolbarFrame
			pageDef: {} // required for ToolbarFrame
		};
	});

	it('renders a ToolbarFrame with props, values and actions', () => {
		renderer.render(<DocumentPage store={store} {...props}/>);
		return expect(renderer, 'to have rendered', <ToolbarFrame
			{...props}
			toolbars={[{ name: 'hasItemDefs', items: [{}, {}] }, { name: 'hasNoItemDefs', items: [] }]}
			actions={{
				updateValue: expect.it('to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'when called with', ['value'], 'to be undefined'), // Result is call to store.dispatch
				setOption: expect.it('to be a function')
					.and('when called with', ['fieldname'], 'to be a function')
					.and('when called with', ['fieldname'], 'when called with', ['value'], 'to be undefined'), // Result is call to store.dispatch
				save: expect.it('to be a function')
					.and('when called with', ['pagename'], 'to be a function')
					.and('when called with', ['pagename'], 'when called', 'to be undefined'), // Result is call to store.dispatch
				fireAction: expect.it('to be a function')
					.and('when called with', ['pagename', 'actionId'], 'to be a function')
					.and('when called with', ['pagename', 'actionId'], 'when called with', [['val1', 'val2']], 'to be undefined') // Result is call to store.dispatch
			}}
			options={state.options}
			dirtyPages={state.dataFields.dirtyPages}/>)
		.then(() => expect(store.dispatch, 'to have calls satisfying', [
			{ args: [{ type: UPDATE_VALUE, pageName: 'pagename', fieldName: 'fieldname', newValue: 'value' }]},
			{ args: [{ type: SET_OPTION, name: 'fieldname', value: 'value' }]},
			{ args: [expect.it('to be a function')]},
			{ args: [expect.it('to be a function')]}
		]));
	});
});
