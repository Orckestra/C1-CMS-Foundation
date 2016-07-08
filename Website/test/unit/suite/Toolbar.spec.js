import expect from '../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Toolbar from '../../../Composite/console/components/presentation/Toolbar';
import ActionButton from '../../../Composite/console/components/presentation/ActionButton';

describe('Toolbar', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			buttons: [
				{
					label: "Label1",
					getState: () => ({}),
					action: () => {}
				},
				{
					label: "Label2",
					getState: () => ({}),
					action: () => {}
				},
				{
					label: "Label3",
					getState: () => ({}),
					action: () => {}
				}
			]
		}
		renderer.render(<Toolbar {...props}/>)
	});

	it('renders buttons', () => {
		return expect(renderer, 'to have rendered',
			<div className="toolbar">
				<ActionButton label="Label1"/>
				<ActionButton label="Label2"/>
				<ActionButton label="Label3"/>
			</div>
		);
	});
});
