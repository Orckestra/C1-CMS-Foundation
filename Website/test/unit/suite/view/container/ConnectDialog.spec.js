import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ConnectDialog from 'console/components/container/ConnectDialog.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import Immutable from 'immutable';

describe('ConnectDialog', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			dialogDefs: {
				testdialog: {
					name: 'testdialog',
					test: 'this is data',
					type: 'testType'
				}
			}
		});
		store = {
			state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => store.state).named('getState')
		};
		props = {
			test: 'value',
			pageDef: Immutable.Map({ dialog: 'testdialog'})
		};
	});

	it('renders a SwitchPanel with props and panel type to show', () => {
		renderer.render(<ConnectDialog store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<SwitchPanel
					test='value'
					pageDef={{ dialog: 'testdialog'}}
					dialogDef={{ name: 'testdialog', test: 'this is data' }}
					showType='testType'
					panelTypes={{}}
					dispatch={store.dispatch}
					store={store}/>
			),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});

	it('handles lacking def', () => {
		store.state = state.deleteIn(['dialogDefs', 'testdialog']);
		renderer.render(<ConnectDialog store={store} {...props}/>);
		return expect(renderer,
			'to have exactly rendered',
			<SwitchPanel
				test='value'
				pageDef={{ dialog: 'testdialog'}}
				dialogDef={{}}
				panelTypes={{}}
				dispatch={store.dispatch}
				store={store}/>
		);
	});
});
