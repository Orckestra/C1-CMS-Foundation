import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import sinon from 'sinon';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Dialog, * as d from 'console/components/presentation/Dialog.js';

describe('Dialog', () => {
	let renderer, minimalProps, fullProps, useProviderSpy, eventSpy;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		useProviderSpy = sinon.spy().named('useProvider');
		eventSpy = sinon.spy().named('eventSpy');
		minimalProps = {
			dialogData: Immutable.Map(),
			dialogDef: Immutable.fromJS({
				name: 'testdialog',
				panes: [],
				updateData: { test: 'minimal' }
			}),
			actions: { useProvider: (a, b) => c => useProviderSpy(a, b, c) }
		};
		fullProps = {
			dialogData: Immutable.Map({
				test: 'data'
			}),
			dialogDef: Immutable.fromJS({
				name: 'testdialog',
				updateData: { test: 'fullData' },
				panes: [{
					name: 'testpalette',
					test: 'this is data',
					headline: 'Palette!',
					categories: ['tag1', 'tag2', 'tag3', 'tag4'],
					type: 'palette',
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
							name: 'finishButton',
							label: 'Finish',
							style: 'main',
							next: true,
							provider: {
								name: 'elementInsert',
								protocol: 'post',
								response: 'Dialog.RESPONSE_ACCEPT',
								action: 'DialogPageBinding.ACTION_RESPONSE',
								markup: ['test'],
								sendData: true,
								uri: ''
							}
						},
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
						}
					]
				}]
			}),
			itemGroups: Immutable.List(),
			actions: {
				useProvider: (a, b) => c => useProviderSpy(a, b, c)
			}
		};
	});

	it('renders a minimal dialog, no contents', () => {
		renderer.render(<Dialog {...minimalProps}/>);
		return expect(renderer, 'to have rendered', <d.DialogBox></d.DialogBox>);
	});

	it('renders a dialog with a headline, single palette pane, buttons', () => {
		renderer.render(<Dialog {...fullProps}/>);
		return expect(renderer, 'to have exactly rendered', (
			<d.DialogBox onContextMenu={expect.it('to be a function').and('when called with', [{ preventDefault: eventSpy }])}>
				<d.DialogTitle>Palette!</d.DialogTitle>
				<d.SearchField
					onChange={expect.it('to be a function').and('when called with', [{ target: { value: 'foo' }}])}
					onInput={expect.it('to be a function')}
				/>
				<d.SearchIcon id='magnifier'/>
				<d.DialogPane>
					<SwitchPanel
						showType='palette'
						panelTypes={{}}
						dialogName='testdialog'
						paneDef={Immutable.Map({ name: 'testpalette' })}
						itemGroups={Immutable.List()}
						dialogData={Immutable.Map()}
						nextAction={expect.it('to be a function')}
						updateDialogData={expect.it('to be a function')} />
				</d.DialogPane>
				<d.DialogButtonGroup>
					<ActionButton
						name="finishButton"
						style='main'
						next={true}
						label='Finish'
						action={expect.it('to be a function').and('not to error')}/>
					<ActionButton
						label='Cancel'
						name='cancelButton'
						action={expect.it('to be a function').and('not to error')}/>
				</d.DialogButtonGroup>
			</d.DialogBox>
		))
		.then(() => Promise.all([
			expect(eventSpy, 'was called'),
			expect(useProviderSpy, 'to have calls satisfying', [
				{ args: [{
					test: 'fullData'
				}, 'testdialog', { test: 'data', filterText: 'foo' }] },
				{ args: [{
					name: 'elementInsert',
					protocol: 'post',
					response: 'Dialog.RESPONSE_ACCEPT',
					action: 'DialogPageBinding.ACTION_RESPONSE',
					markup: ['test'],
					sendData: true,
					uri: ''
				}, 'testdialog', 'data'] },
				{ args: [{
					name: 'componentListCancel',
					protocol: 'post',
					response: 'Dialog.RESPONSE_CANCEL',
					action: 'DialogPageBinding.ACTION_RESPONSE',
					uri: ''
				}, 'testdialog', undefined] }
			])
		]));
	});
});
