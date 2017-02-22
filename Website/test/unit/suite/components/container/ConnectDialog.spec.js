import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Dialog from 'console/components/presentation/Dialog.js';
import ConnectDialog from 'console/components/container/ConnectDialog.js';
import actionLocator from 'console/state/actionLocator.js';

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
					type: 'dialogPageShim',
					dialog: 'testdialog'
				}
			},
			dialogDefs: {
				testdialog: {
					name: 'testdialog',
					updateData: {
						callAction: 'setDialogState',
						sendData: true
					},
					panes: ['testpane']
				}
			},
			dialogPaneDefs: {
				testpane: {
					name: 'testpane',
					test: 'this is data',
					categories: ['tag1', 'tag2', 'tag3', 'tag4'],
					type: 'testType',
					providers: ['elementSource', 'elementUpdate'],
					elements: {
						fetch: 'elementSource',
						update: 'elementUpdate'
					},
					buttons: ['cancelButton', 'finishButton']
				}
			},
			itemDefs: {
				cancelButton: {
					name: 'cancelButton',
					label: 'Cancel',
					provider: 'componentListCancel'
				},
				finishButton: {
					name: 'finishButton',
					label: 'Next',
					style: 'main',
					provider: 'elementInsert'
				}
			},
			providerDefs: {
				elementSource: {
					name: 'elementSource',
					uri: 'test.provider.elements'
				},
				elementUpdate: {
					name: 'elementUpdate',
					uri: 'test.provider.elements.update'
				},
				componentListCancel: {
					name: 'componentListCancel',
					protocol: 'post',
					response: 'Dialog.RESPONSE_CANCEL',
					action: 'DialogPageBinding.ACTION_RESPONSE',
					uri: ''
				},
				elementInsert: {
					name: 'elementInsert',
					protocol: 'post',
					response: 'Dialog.RESPONSE_ACCEPT',
					action: 'DialogPageBinding.ACTION_RESPONSE',
					markup: ['selectedData'],
					sendData: true,
					uri: ''
				}
			},
			dialogData: {
				testdialog: {
					selectedItem: 'entry2'
				}
			},
			providers: {
				testdialog: [
					{
						name: 'entry1',
						title: 'First component',
						description: 'All manner of words',
						groupingTags: [
							'tag1',
							'tag2',
							'unusedtag'
						],
						containerClasses: [
							'narrow',
							'footer'
						],
						componentDefinition: {
							html: {
								body: {}
							}
						}
					},
					{
						name: 'entry2',
						title: 'Second component',
						description: 'Even more words',
						groupingTags: [
							'tag1',
							'tag2'
						],
						containerClasses: [
							'narrow',
							'footer'
						],
						componentDefinition: {
							html: {
								body: {}
							}
						}
					},
					{
						name: 'entry3',
						title: 'Third component',
						description: 'Even more words',
						groupingTags: [
							'tag2',
							'tag3'
						],
						containerClasses: [
							'narrow',
							'footer'
						],
						componentDefinition: {
							html: {
								body: {}
							}
						}
					},
					{
						name: 'entry4',
						title: 'Fourth component',
						description: 'Even more words',
						groupingTags: [
							'tag3'
						],
						containerClasses: [
							'narrow',
							'footer'
						],
						componentDefinition: {
							html: {
								body: {}
							}
						}
					},
					{
						name: 'entry5',
						title: 'Fifth component',
						description: 'Wooooords',
						groupingTags: ['unusedtag'],
						containerClasses: [
							'narrow',
							'footer'
						],
						componentDefinition: {
							html: {
								body: {}
							}
						}
					}
				]
			}
		});
		store = {
			state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy(action => {
				if (typeof action === 'function') {
					return Promise.resolve(action(store.dispatch));
				} else {
					return action;
				}
			}).named('dispatch'),
			getState: sinon.spy(() => store.state).named('getState')
		};
		props = {
			test: 'value',
			pageDef: Immutable.Map({ dialog: 'testdialog'})
		};
		actionLocator.register('testAction', (provider, name, data) => ({
			type: 'TEST',
			provider,
			name,
			data
		}));
	});

	it('renders a Dialog with props and panel type to show', () => {
		renderer.render(<ConnectDialog store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<Dialog
					test='value'
					pageDef={Immutable.fromJS({ dialog: 'testdialog'})}
					dialogDef={Immutable.fromJS({
						name: 'testdialog',
						updateData: {
							callAction: 'setDialogState',
							sendData: true
						},
						panes: [{
							name: 'testpane',
							test: 'this is data',
							categories: ['tag1', 'tag2', 'tag3', 'tag4'],
							type: 'testType',
							elements: {
								fetch: {
									name: 'elementSource',
									uri: 'test.provider.elements'
								},
								update: {
									name: 'elementUpdate',
									uri: 'test.provider.elements.update'
								}
							},
							buttons: [
								{
									name: 'cancelButton',
									label: 'Cancel',
									provider: {
										name: 'componentListCancel',
										protocol: 'post',
										response: 'Dialog.RESPONSE_CANCEL',
										action: 'DialogPageBinding.ACTION_RESPONSE',
										uri: ''
									}
								},
								{
									name: 'finishButton',
									label: 'Next',
									style: 'main',
									provider: {
										name: 'elementInsert',
										protocol: 'post',
										response: 'Dialog.RESPONSE_ACCEPT',
										action: 'DialogPageBinding.ACTION_RESPONSE',
										markup: ['selectedData'],
										sendData: true,
										uri: ''
									}
								}
							]
						}]
					})}
					itemGroups={Immutable.fromJS([
						{ name: 'tag1', entries: [
							{ name: 'entry1' },
							{ name: 'entry2' }
						]},
						{ name: 'tag2', entries: [
							{ name: 'entry1' },
							{ name: 'entry2' },
							{ name: 'entry3' }
						]},
						{ name: 'tag3', entries: [
							{ name: 'entry3' },
							{ name: 'entry4' }
						]},
						{ name: 'uncategorized', entries: [
							{ name: 'entry5' }
						]}
					])}
					dialogData={Immutable.fromJS({
						selectedItem: 'entry2'
					})}
					actions={{
						useProvider: expect.it(
								'when called with', [{ name: 'testprovider', callAction: 'testAction' }, 'callerName'],
								'when called with', [{ data: 'test data' }],
								'to be a', 'Promise'
							)
					}}
					store={store}/>
			)
			.then(() => expect(store.dispatch, 'to have calls satisfying', [
				{ args: [expect.it('to be a function')] },
				{ args: [{
					type: 'TEST',
					provider: 'callerName',
					name: { data: 'test data' },
					data: undefined
				}] }
			])),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
