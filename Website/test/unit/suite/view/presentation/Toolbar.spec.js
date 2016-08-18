import expect from '../../../helpers/expect';
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
			buttons: {
				first: {
					label: 'Label1',
					icon: 'save'
				},
				second: {
					label: 'Label2'
				},
				third: {
					label: 'Label3'
				}
			}
		};
	});

	it('renders buttons', () => {
		renderer.render(<Toolbar actions={actions} {...props}/>);
		return expect(renderer, 'to have rendered',
			<div className='toolbar'>
				<ActionButton label='Label1' action={actions.first} icon='save'/>
				<ActionButton label='Label2' action={actions.second}/>
				<ActionButton label='Label3' action={actions.third}/>
			</div>
		);
	});

	it('does not render buttons where action is missing', () => {
		delete actions.third;
		renderer.render(<Toolbar actions={actions} {...props}/>);
		return expect(renderer, 'to have rendered',
			<div className='toolbar'>
				<ActionButton label='Label1' action={actions.first} icon='save'/>
				<ActionButton label='Label2' action={actions.second}/>
			</div>
		);
	});
});
