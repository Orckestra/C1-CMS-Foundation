import expect from '../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from '../../../Composite/console/components/presentation/ActionButton';

describe('ActionButton', () => {
	let renderer, props, state;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = { state: true };
		props = {
			label: "Label",
			action: sinon.spy()
		}
		renderer.render(
			<ActionButton {...props}/>
		)
	});

	it('should render a button', () => {
		return expect(renderer, 'to have rendered',
			<button>{props.label}</button>
		);
	});


	it('should call handler with state contents when clicked', () => {
		return expect(renderer, 'with event', 'click')
			.then(() => {
				return expect(props.action, 'was called with', state);
			});
	});
})
