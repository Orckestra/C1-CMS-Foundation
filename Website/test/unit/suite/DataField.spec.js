import expect from '../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from '../../../Composite/console/components/presentation/HelpIcon';
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
				updateValue: sinon.spy(value => { state.value = value; })
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
				<HelpIcon text={props.help}/>
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
				expect(renderer, 'not to contain', <HelpIcon/>)
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
						<HelpIcon text={props.help}/>
					</div>
				),
				expect(renderer, 'not to contain', <label/>)
			]);
		});

		it('can change the value of its content', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(
				renderer, 'queried for', <input/>,
				'to have rendered', <input value="Init"/>
			).then(() => expect(renderer,
					'with event change', {target: {value: 'New' } }, 'on', <input/>,
					'queried for', <input/>,
					'to have rendered', <input value="New"/>
				)
			);
		});
	});
});
