import expect from '../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Toolbar from '../../../Composite/console/components/presentation/Toolbar';
import ActionButton from '../../../Composite/console/components/presentation/ActionButton';

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
					label: "Label1"
				},
				second: {
					label: "Label2"
				},
				third: {
					label: "Label3"
				}
			}
		}
		renderer.render(<Toolbar actions={actions} {...props}/>)
	});

	it('renders buttons', () => {
		return expect(renderer, 'to have rendered',
			<div className="toolbar">
				<ActionButton label="Label1" action={actions.first}/>
				<ActionButton label="Label2" action={actions.second}/>
				<ActionButton label="Label3" action={actions.third}/>
			</div>
		);
	});
});
