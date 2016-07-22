import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from '../../../../../Composite/console/components/presentation/HelpIcon';
import DataField from '../../../../../Composite/console/components/presentation/DataField';
import StatelessWrapper from '../../../helpers/StatelessWrapper';

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
				updateValue: sinon.spy()
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
			return expect(renderer, 'to have rendered',
				<div className="datafield">
					<label htmlFor={props.name}>{props.label}</label>
					<input
						type={props.type}
						id={props.name}
						value={state.value}/>
				</div>
			)
			.and('not to contain', <HelpIcon text=""/>);
		});

		it('renders a text field with helper but no label', () => {
			delete props.label;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<div className="datafield">
					<input
						type={props.type}
						id={props.name}
						value={state.value}/>
					<HelpIcon text={props.help}/>
				</div>
			)
			.and('not to contain', <label/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <input/>,
				'to have rendered', <input value="Init"/>
			)
			.then(() => expect(component,'with event change', 'on', <input/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});
});
