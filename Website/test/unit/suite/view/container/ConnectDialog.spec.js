import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import loadModules from 'unittest/helpers/moduleLoader.js';

describe('ConnectDialog', () => {
	let ConnectDialog, Dialog;
	before(done => {
		loadModules([
			{
				module: 'console/components/presentation/Dialog.js',
				moduleCb: m => {
					Dialog = m.default;
				}
			},
			{
				module: 'console/components/container/ConnectDialog.js',
				moduleCb: m => {
					ConnectDialog = m.default;
				}
			}
		], () => done());
	});

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
					panes: ['testpane']
				}
			},
			dialogPaneDefs: {
				testpane: {
					name: 'testpane',
					test: 'this is data',
					categories: ['tag1', 'tag2', 'tag3', 'tag4'],
					type: 'testType',
					provider: 'elementSource'
				}
			},
			providerDefs: {
				elementSource: {
					uri: 'test.provider.elements'
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

	it('renders a Dialog with props and panel type to show', () => {
		renderer.render(<ConnectDialog store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<Dialog
					test='value'
					pageDef={Immutable.fromJS({ dialog: 'testdialog'})}
					dialogDef={Immutable.fromJS({ name: 'testdialog', panes: [{ test: 'this is data' }] })}
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
					dispatch={store.dispatch}
					store={store}/>
			),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
