import expect from 'unittest/helpers/expect.js';
import React from 'react';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import CheckboxGroup from 'console/components/presentation/CheckboxGroup.js';

describe('CheckboxGroup', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			type: 'checkboxGroup',
			name: 'test/cbg',
			checkboxes: [
				{ name: 'test/cbg/test1', label: 'One' },
				{ name: 'test/cbg/test2', label: 'Two' },
				{ name: 'test/cbg/test3', label: 'Three' },
				{ name: 'test/cbg/test4', label: 'Four' },
				{ name: 'test/cbg/test5', label: 'Five' }
			],
			value: [
				'test/cbg/test1',
				'test/cbg/test2',
				'test/cbg/test4'
			],
			onChange: sinon.spy().named('onChange')
		};
	});

	it('renders a row of checkboxes', () => {
		renderer.render(<CheckboxGroup {...props}/>);
		return expect(renderer, 'to have rendered',
			<div>
				<input type="checkbox" id='test/cbg/test1' value={true} checked={true}/><label htmlFor='test/cbg/test1'>One</label>
				<input type="checkbox" id='test/cbg/test2' value={true} checked={true}/><label htmlFor='test/cbg/test2'>Two</label>
				<input type="checkbox" id='test/cbg/test3' value={false}/><label htmlFor='test/cbg/test3'>Three</label>
				<input type="checkbox" id='test/cbg/test4' value={true} checked={true}/><label htmlFor='test/cbg/test4'>Four</label>
				<input type="checkbox" id='test/cbg/test5' value={false}/><label htmlFor='test/cbg/test5'>Five</label>
			</div>
		);
	});

	describe('handles changes', () => {
		it('removing', () => {
			renderer.render(<CheckboxGroup {...props}/>);
			return expect(renderer, 'with event', 'change', 'on', <input id='test/cbg/test2'/>)
			.then(() => expect(props.onChange, 'to have a call satisfying', [[
				'test/cbg/test1',
				'test/cbg/test4'
			]]));
		});

		it('adding', () => {
			renderer.render(<CheckboxGroup {...props}/>);
			expect(renderer, 'with event', 'change', 'on', <input id='test/cbg/test3'/>)
			.then(() => expect(props.onChange, 'to have a call satisfying', [[
				'test/cbg/test1',
				'test/cbg/test2',
				'test/cbg/test4',
				'test/cbg/test3'
			]]));
		});
	});
});
