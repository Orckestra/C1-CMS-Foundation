import expect from 'unittest/helpers/expect.js';
import React from 'react';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import CheckboxGroup, * as c from 'console/components/presentation/CheckboxGroup.js';
import Checkbox from 'console/components/presentation/Checkbox.js';

describe('CheckboxGroup', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			type: 'checkboxGroup',
			name: 'test/cbg',
			options: [
				{ name: 'test/cbg/test1', label: 'One', value: 'One' },
				{ name: 'test/cbg/test2', label: 'Two', value: 'Two' },
				{ name: 'test/cbg/test3', label: 'Three', value: 'Three' },
				{ name: 'test/cbg/test4', label: 'Four', value: 'Four' },
				{ name: 'test/cbg/test5', label: 'Five', value: 'Five' }
			],
			value: [
				'One',
				'Two',
				'Four'
			],
			onChange: sinon.spy().named('onChange')
		};
	});

	it('renders a row of checkboxes', () => {
		renderer.render(<CheckboxGroup {...props}/>);
		return expect(renderer, 'to have rendered',
			<c.GroupWrapper>
				<Checkbox type="checkbox" id='test/cbg/test1' value={true} checked={true}/><c.CheckboxLabel htmlFor='test/cbg/test1'>One</c.CheckboxLabel>
				<Checkbox type="checkbox" id='test/cbg/test2' value={true} checked={true}/><c.CheckboxLabel htmlFor='test/cbg/test2'>Two</c.CheckboxLabel>
				<Checkbox type="checkbox" id='test/cbg/test3' value={false}/><c.CheckboxLabel htmlFor='test/cbg/test3'>Three</c.CheckboxLabel>
				<Checkbox type="checkbox" id='test/cbg/test4' value={true} checked={true}/><c.CheckboxLabel htmlFor='test/cbg/test4'>Four</c.CheckboxLabel>
				<Checkbox type="checkbox" id='test/cbg/test5' value={false}/><c.CheckboxLabel htmlFor='test/cbg/test5'>Five</c.CheckboxLabel>
			</c.GroupWrapper>
		);
	});

	describe('handles changes', () => {
		it('removing', () => {
			renderer.render(<CheckboxGroup {...props}/>);
			return expect(renderer, 'with event', 'change', 'on', <Checkbox id='test/cbg/test2'/>)
			.then(() => expect(props.onChange, 'to have a call satisfying', [[
				'One',
				'Four'
			]]));
		});

		it('adding', () => {
			renderer.render(<CheckboxGroup {...props}/>);
			expect(renderer, 'with event', 'change', 'on', <Checkbox id='test/cbg/test3'/>)
			.then(() => expect(props.onChange, 'to have a call satisfying', [[
				'One',
				'Two',
				'Four',
				'Three'
			]]));
		});
	});
});
