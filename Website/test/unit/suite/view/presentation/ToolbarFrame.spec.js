import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';
import Toolbar from 'console/components/presentation/Toolbar.js';
import TabContent from 'console/components/container/TabContent.js';

describe('ToolbarFrame', () => {
	let renderer, props, pageActions;
	beforeEach(() => {
		pageActions = {
			fireAction: () => {},
			update: () => {},
			setOption: () => {},
			save: () => {}
		};
		props = {
			pageDef: {
				name: 'test',
				tabs: ['test/oneTab'],
				toolbars: ['test/toolbar']
			},
			tabDefs: {
				'test/oneTab': {
					name: 'test/oneTab',
					fieldsets: [
						'test/oneset',
						'test/twoset',
						'test/fourset'
					]
				}
			},
			toolbarDefs: {
				'test/toolbar': {
					name: 'test/toolbar',
					items: [
						'test/save',
						'test/onebutton',
						'test/twobutton'
					]
				}
			},
			itemDefs: {
				'test/onebutton': { type: 'button', label: 'One', action: 'oneaction' },
				'test/twobutton': { type: 'button', label: 'Two', action: 'twoaction' },
				'test/save': { type: 'button', label: 'Save', action: 'save' },
				'test/select': { type: 'select', name: 'test/select', options: [{ value: 'opt1' }] },
				'test/checks': { type: 'checkboxGroup', name: 'test/checks', checkboxes: [{ name: 'test/checks/c1', label: 'Check 1'}, { name: 'test/checks/c2', label: 'Check 2'}] },
				'do-not-render-button': { type: 'button', label: 'Must not be shown' }
			},
			fieldsetDefs: {
				'test/oneset': {
					label: 'First set',
					fields: [ 'test/oneset/onefield', 'test/oneset/twofield' ]
				},
				'test/twoset': {
					label: 'Second set',
					fields: [ 'test/twoset/threefield' ]
				},
				'no-show-set': {
					label: 'Don\'t show me',
					fields: []
				}
			},
			dataFieldDefs: {
				'test/oneset/onefield': {},
				'test/oneset/twofield': { defaultValue: 'a default' },
				'test/twoset/threefield': { defaultValue: 'overwritten' }
			},
			tabName: 'test/oneTab',
			options: {
				values: {
					'test/select': 'opt1',
					'test/checks': ['test/checks/c1']
				}
			},
			dirtyPages: {},
			values: {
				'test/twoset/threefield': 'different'
			},
			actions: {
				save: sinon.spy(() => pageActions.save).named('save'),
				fireAction: sinon.spy(() => pageActions.fireAction).named('fireAction'),
				setOption: sinon.spy(() => pageActions.setOption).named('threebutton'),
				updateValue: sinon.spy(() => pageActions.update).named('threebutton')
			},
		};
		renderer = TestUtils.createRenderer();
	});

	it('renders a toolbar and a single contained tab', () => {
		renderer.render(<ToolbarFrame name='test' {...props}/>);
		return expect(
			renderer,
			'to have rendered',
			<div className='page'>
				<Toolbar
					name='test/toolbar'
					canSave={false}
					items={{}}/>
				<TabContent/>
			</div>
		)
		.and(
			'queried for', <Toolbar canSave={false} items={{}}/>,
			'to have props exhaustively satisfying', {
				name: 'test/toolbar',
				canSave: false,
				items: {
					'test/save': { type: 'button', label: 'Save', action: pageActions.save, saveButton: true },
					'test/onebutton': { type: 'button', label: 'One', action: pageActions.fireAction },
					'test/twobutton': { type: 'button', label: 'Two', action: pageActions.fireAction }
				}
			}
		);
	});

	it('passes named actions to the toolbar', () => {
		renderer.render(<ToolbarFrame name='test' {...props}/>);
		Promise.all([
			expect(renderer,
				'queried for', <Toolbar canSave={false} items={{}}/>,
			'to have props satisfying', {
				name: 'test/toolbar',
				items: {
					'test/save': { action: expect.it('to be', pageActions.save) },
					'test/onebutton': { action: expect.it('to be', pageActions.fireAction) },
					'test/twobutton': { action: expect.it('to be', pageActions.fireAction) }
				}
			}),
			expect(props.actions.save, 'to have a call satisfying', { args: ['test'] }),
			expect(props.actions.fireAction, 'to have calls exhaustively satisfying', [
				{ args: ['oneaction', 'test'] },
				{ args: ['twoaction', 'test'] },
			])
		]);
	});

	it('passes useful props to selects, checkbox groups on toolbars', () => {
		props.toolbarDefs['test/toolbar'].items = ['test/select', 'test/checks'];
		renderer.render(<ToolbarFrame name='test' {...props}/>);
		Promise.all([
			expect(renderer,
				'queried for', <Toolbar canSave={false} items={{}}/>,
			'to have props satisfying', {
				name: 'test/toolbar',
				items: {
					'test/select': { onChange: expect.it('to be a function'), options: [{ value: 'opt1' }], value: 'opt1' },
					'test/checks': { onChange: expect.it('to be a function'), checkboxes: [{ name: 'test/checks/c1', label: 'Check 1' }, { name: 'test/checks/c2', label: 'Check 2' }], value: ['test/checks/c1'] }
				}
			}),
			expect(props.actions.setOption, 'to have a call satisfying', { args: ['test/select'] }),
			expect(props.actions.setOption, 'to have a call satisfying', { args: ['test/checks'] })
		]);
	});

	it('handles missing toolbar defs', () => {
		delete props.toolbarDefs['test/toolbar'];
		renderer.render(<ToolbarFrame name='test' {...props}/>);
		return expect(
			renderer,
			'to have rendered',
			<div className='page'>
				<TabContent/>
			</div>
		);
	});
});
