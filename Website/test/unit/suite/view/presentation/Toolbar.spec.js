import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Toolbar from 'console/components/presentation/Toolbar.js';
import ActionButton from 'console/components/presentation/ActionButton.js';

describe('Toolbar', () => {
	let renderer, props, actions;
	beforeEach(() => {
		actions = {
			first: () => {},
			second: () => {},
			third: () => {}
		};
		renderer = TestUtils.createRenderer();
		props = {
			canSave: false,
			buttons: {
				first: {
					label: 'Label1',
					icon: 'save',
					action: actions.first
				},
				second: {
					label: 'Label2',
					action: actions.second
				},
				third: {
					label: 'Label3',
					saveButton: true,
					action: actions.third
				}
			}
		};
	});

	it('renders buttons', () => {
		renderer.render(<Toolbar {...props}/>);
		return expect(renderer, 'to have rendered',
			<div className='toolbar'>
				<ActionButton label='Label1' action={actions.first} icon='save'/>
				<ActionButton label='Label2' action={actions.second}/>
				<ActionButton label='Label3' action={actions.third} disabled={true}/>
			</div>
		);
	});

	it('does not render buttons where action is missing', () => {
		delete actions.third;
		renderer.render(<Toolbar {...props}/>);
		return expect(renderer, 'to have rendered',
			<div className='toolbar'>
				<ActionButton label='Label1' action={actions.first} icon='save'/>
				<ActionButton label='Label2' action={actions.second}/>
			</div>
		);
	});
});
