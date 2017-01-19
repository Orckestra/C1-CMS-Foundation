import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Palette from 'console/components/presentation/Palette.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import Dialog, { DialogBox, DialogTitle, DialogPane, DialogButtonGroup } from 'console/components/presentation/Dialog.js';

describe('Dialog', () => {
	let renderer, minimalProps, fullProps;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		minimalProps = {
			dialogData: Immutable.Map(),
			dialogDef: Immutable.Map({
				name: 'testdialog',
				panes: Immutable.List()
			}),
			actions: { useProvider: () => () => {} }
		};
		fullProps = {
			dialogData: Immutable.Map(),
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
						finishProvider: {}
					}
				]
			}),
			itemGroups: Immutable.List(),
			actions: { useProvider: () => () => {} }
		};
	});

	it('renders a minimal dialog, no contents', () => {
		renderer.render(<Dialog {...minimalProps}/>);
		return expect(renderer, 'to have rendered', <DialogBox></DialogBox>);
	});

	it('renders a dialog with a headline, single palette pane, buttons', () => {
		renderer.render(<Dialog {...fullProps}/>);
		return expect(renderer, 'to have rendered', <DialogBox>
			<DialogTitle>Palette!</DialogTitle>
			<DialogPane>
				<Palette
					dialogName='testdialog'
					paneDef={Immutable.Map({ name: 'testpalette' })}
					itemGroups={Immutable.List()}
					useProvider={expect.it('to be a function')} />
			</DialogPane>
			<DialogButtonGroup>
				<ActionButton label='Cancel'/>
				<ActionButton label='Next'/>
				<ActionButton label='Finish'/>
			</DialogButtonGroup>
		</DialogBox>);
	});
});
