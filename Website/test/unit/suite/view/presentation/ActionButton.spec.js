import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ActionButton from '../../../../../Composite/console/components/presentation/ActionButton';

describe('ActionButton', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
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


	it('should call handler when clicked', () => {
		return expect(renderer, 'with event', 'click')
			.then(() => {
				return expect(props.action, 'was called once');
			});
	});
})
