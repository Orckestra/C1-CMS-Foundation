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
			layout: {
				currentPerspective: 'test',
				perspectives: {
					test: {
						currentPage: 'dialogShim',
						pages: {
							dialogShim: {}
						}
					}
				}

			},
			pageDefs: {
				dialogShim: {
					name: 'dialogShim',
					dialog: 'testdialog'
				}
			},
			dialogDefs: {
				testdialog: {
					name: 'testdialog',
					test: 'this is data',
					type: 'testType',
					providers: {
						elementSource: {
							uri: 'test.provider.elements'
						}
					}
				}
			},
			dialogData: {
				testdialog: {
					selectedItem: 'entry2'
				}
			},
			providers: {
				'test.provider.elements': {
					testdialog: [
						{
							name: 'group1',
							label: 'First group',
							entries: [
								{
									name: 'entry1',
									label: 'First entry',
									description: 'All manner of words',
									previewUrl: '/path/to/image1.png'
								},
								{
									name: 'entry2',
									label: 'Second entry',
									description: 'Some other words',
									previewUrl: '/path/to/image2.png'
								}
							]
						},
						{
							name: 'group2',
							label: 'Second group',
							entries: [
								{
									name: 'entry3',
									label: 'Third entry',
									description: 'Words to live by',
									previewUrl: '/path/to/image3.png'
								},
								{
									name: 'entry4',
									label: 'Fourth entry',
									description: 'Words to die for',
									previewUrl: '/path/to/image4.png'
								}
							]
						}
					]
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
					itemGroups={[
						{ name: 'group1', entries: [
							{ name: 'entry1' },
							{ name: 'entry2' }
						]},
						{ name: 'group2', entries: [
							{ name: 'entry3' },
							{ name: 'entry4' }
						]}
					]}
					dialogData={{
						selectedItem: 'entry2'
					}}
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
				itemGroups={[]}
				dialogData={{}}
				dispatch={store.dispatch}
				store={store}/>
		);
	});
});
