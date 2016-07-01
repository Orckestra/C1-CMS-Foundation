import expect from '../helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from '../../../Composite/console/ActionButton.js';

describe('ActionButton', () => {
	it('should render a button', () => {
		var renderer = TestUtils.createRenderer();
		var props = {
			label: "Label",
			getState: () => ({state: true }),
			action: data => ({ data: data })
		}
		renderer.render(
			<ActionButton {...props}/>
		)
		return expect(renderer, 'to have rendered',
			<button>Label</button>
		);
	});
})
