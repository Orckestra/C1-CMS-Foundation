import expect from '../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DataField from '../../../Composite/console/components/presentation/DataField';

describe('DataField', () => {
	let renderer, props, state;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
	});

	describe('with text type', () => {
		beforeEach(() => {
			props = {
				type: 'text',
				name: 'test',
				label: 'Text label',
				help: 'Help text',
				changeValue: sinon.spy()
			};
			state = {
				value: 'Init'
			};
		});

		it('renders a text field with label and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<div className="datafield">
				<label htmlFor={props.name}>{props.label}</label>
				<input
					type={props.type}
					id={props.name}
					value={state.value}/>
				<span className="helper">{props.help}</span>
			</div>
			);
		});

		it('renders a text field with label but no helper', () => {
			delete props.help;
			renderer.render(<DataField {...props} {...state}/> );
			return Promise.all([
				expect(renderer, 'to have rendered',
					<div className="datafield">
						<label htmlFor={props.name}>{props.label}</label>
						<input
							type={props.type}
							id={props.name}
							value={state.value}/>
					</div>
				),
				expect(renderer, 'not to contain', <span className="helper"/>)
			]);
		});

		it('renders a text field with helper but no label', () => {
			delete props.label;
			renderer.render(<DataField {...props} {...state}/> );
			return Promise.all([
				expect(renderer, 'to have rendered',
					<div className="datafield">
						<input
							type={props.type}
							id={props.name}
							value={state.value}/>
						<span className="helper">{props.help}</span>
					</div>
				),
				expect(renderer, 'not to contain', <label/>)
			]);
		});
	});
});
