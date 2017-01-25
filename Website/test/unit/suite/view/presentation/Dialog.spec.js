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
			dialogDef: Immutable.Map({
				name: 'testdialog',
				panes: Immutable.List()
			}),
			actions: { useProvider: (a, b) => c => useProviderSpy(a, b, c) }
		};
		fullProps = {
			dialogData: Immutable.Map({
				test: 'data'
			}),
			dialogDef: Immutable.fromJS({
				name: 'testdialog',
				panes: [
					{
						name: 'testpalette',
						headline: 'Palette!',
						type: 'palette',
						cancelButton: {
							label: 'Cancel'
						},
						nextButton: {
							label: 'Next'
						},
						finishButton: {
							label: 'Finish'
						},
						cancelProvider: {},
						finishProvider: {
							sendData: true,
							markup: ['test']
						}
					}
				]
			}),
			itemGroups: Immutable.List(),
			actions: {
				useProvider: (a, b) => c => useProviderSpy(a, b, c)
			},
			dispatch: sinon.spy().named('dispatch')
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
						useProvider={expect.it('to be a function')} />
				</d.DialogPane>
				<d.DialogButtonGroup>
					<ActionButton label='Finish' action={expect.it('to be a function').and('not to error')}/>
					<ActionButton label='Cancel' action={expect.it('to be a function').and('not to error')}/>
				</d.DialogButtonGroup>
			</d.DialogBox>
		))
		.then(() => Promise.all([
			expect(eventSpy, 'was called'),
			expect(fullProps.dispatch, 'to have calls satisfying', [
				{ args: [{ type: 'DIALOG.SET_STATE', dialogName: 'testdialog', data: Immutable.Map({ filterText: 'foo' }) }] }
			]),
			expect(useProviderSpy, 'to have calls satisfying', [
				{ args: [ { sendData: true, markup: [ 'test' ] }, 'testdialog', 'data'] },
				{ args: [{}, 'testdialog', undefined] }
			])
		]));
	});
});
