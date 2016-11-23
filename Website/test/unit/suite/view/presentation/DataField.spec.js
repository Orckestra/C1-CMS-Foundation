import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import DataField from 'console/components/presentation/DataField.js';
import StatelessWrapper from 'unittest/helpers/StatelessWrapper.js';
import Select from 'react-select';
import Immutable from 'immutable';
import styled from 'styled-components';

const StyledDiv = styled.div``;
const StyledH4 = styled.h4``;
const StyledInput = styled.input``;
const StyledLabel = styled.label``;
const StyledSelect = styled(Select)``;

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
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 'Init'
			};
		});

		it('renders a text field with headline and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<StyledDiv>
				<StyledH4>{props.headline}</StyledH4>
				<StyledInput
					type={props.type}
					id={props.name}
					value={state.value}/>
				<HelpIcon text={props.help}/>
			</StyledDiv>
			);
		});

		it('renders a text field with headline but no helper', () => {
			delete props.help;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<StyledDiv>
					<StyledH4>{props.headline}</StyledH4>
					<StyledInput
						type={props.type}
						id={props.name}
						value={state.value}/>
				</StyledDiv>
			)
			.and('not to contain', <HelpIcon text=""/>);
		});

		it('renders a text field with helper but no headline', () => {
			delete props.headline;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<StyledDiv>
					<StyledInput
						type={props.type}
						id={props.name}
						value={state.value}/>
					<HelpIcon text={props.help}/>
				</StyledDiv>
			)
			.and('not to contain', <StyledH4/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <StyledInput/>,
			'to have rendered', <StyledInput value="Init"/>
			)
			.then(() => expect(component,'with event change', 'on', <StyledInput/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});

	describe('with password type', () => {
		beforeEach(() => {
			props = {
				type: 'password',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 'Init'
			};
		});

		it('renders a password field with headline and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<StyledDiv>
				<StyledH4>{props.headline}</StyledH4>
				<StyledInput
					type={props.type}
					id={props.name}
					value={state.value}/>
				<HelpIcon text={props.help}/>
			</StyledDiv>
			);
		});

		it('renders a password field with headline but no helper', () => {
			delete props.help;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<StyledDiv>
					<StyledH4>{props.headline}</StyledH4>
					<StyledInput
						type={props.type}
						id={props.name}
						value={state.value}/>
				</StyledDiv>
			)
			.and('not to contain', <HelpIcon text=""/>);
		});

		it('renders a password field with helper but no headline', () => {
			delete props.headline;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<StyledDiv>
					<StyledInput
						type={props.type}
						id={props.name}
						value={state.value}/>
					<HelpIcon text={props.help}/>
				</StyledDiv>
			)
			.and('not to contain', <StyledH4/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <StyledInput/>,
			'to have rendered', <StyledInput value="Init"/>
			)
			.then(() => expect(component,'with event change', 'on', <StyledInput/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});

	describe('with select type', () => {
		beforeEach(() => {
			props = {
				type: 'select',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 2
			};
		});

		describe('with option list', () => {
			beforeEach(() => {
				props.options = Immutable.fromJS([
					{ value: 1, label: 'One' },
					{ value: 2, label: 'Two' },
					{ value: 3, label: 'Three' },
					{ value: 4, label: 'Four' }
				]);
			});

			it('renders a dropdown with headline and helper', () => {
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<StyledDiv>
						<StyledH4>{props.headline}</StyledH4>
							<StyledSelect id="test" value={{ value: 2, label: 'Two' }} options={[
									{ value: 1, label: 'One' },
									{ value: 2, label: 'Two' },
									{ value: 3, label: 'Three' },
									{ value: 4, label: 'Four' }
							]}
							placeholder="(No selection)" clearable={false}/>
						<HelpIcon text={props.help}/>
					</StyledDiv>
				);
			});

			it('renders a dropdown with headline but no helper', () => {
				delete props.help;
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<StyledDiv>
						<StyledH4>{props.headline}</StyledH4>
							<StyledSelect id="test" value={{ value: 2, label: 'Two' }} options={[
									{ value: 1, label: 'One' },
									{ value: 2, label: 'Two' },
									{ value: 3, label: 'Three' },
									{ value: 4, label: 'Four' }
							]}
							placeholder="(No selection)" clearable={false}/>
					</StyledDiv>
				)
				.and('not to contain', <HelpIcon text=""/>);
			});

			it('renders a dropdown with helper but no headline', () => {
				delete props.headline;
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<StyledDiv>
						<StyledSelect id="test" value={{ value: 2, label: 'Two' }} options={[
								{ value: 1, label: 'One' },
								{ value: 2, label: 'Two' },
								{ value: 3, label: 'Three' },
								{ value: 4, label: 'Four' }
						]}
						placeholder="(No selection)" clearable={false}/>
						<HelpIcon text={props.help}/>
					</StyledDiv>
				)
				.and('not to contain', <StyledH4/>);
			});

			it.skip('calls its update callback', () => {
				var component = TestUtils.renderIntoDocument(
					<StatelessWrapper>
						<DataField {...props} {...state}/>
					</StatelessWrapper>
				);
				return expect(
					component,
					'to contain', <StyledSelect value={{ value: 2, label: 'Two' }} placeholder="(No selection)" clearable={false}/>
				)
				.then(() => expect(component,
					'with event click',
					'on', <StyledDiv className='Select-control'/>)
				)
				// Make component update its rendering here, somehow
				.then(() => expect(component,
					'with event click',
					'on', <StyledDiv className='Select-option' key={3}/>)
				)
				.then(() => expect(props.updateValue, 'to have a call satisfying', {args: [3]}));
			});
		});
	});

	describe('with checkbox type', () => {
		beforeEach(() => {
			props = {
				type: 'checkbox',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				label: 'Label text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: true
			};
		});

		it('renders a checkbox field with headline, label and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<StyledDiv>
				<StyledH4>{props.headline}</StyledH4>
				<StyledInput
					type={props.type}
					id={props.name}
					checked={state.value}/>
				<StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
				<HelpIcon text={props.help}/>
			</StyledDiv>
			);
		});

		it('defaults to unchecked', () => {
			state.value = undefined;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<StyledDiv>
				<StyledH4>{props.headline}</StyledH4>
				<StyledInput
					type={props.type}
					id={props.name}
					checked={false}/>
				<StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
				<HelpIcon text={props.help}/>
			</StyledDiv>
			);
		});

		it('renders a checkbox field with headline and helper, but no label', () => {
			delete props.label;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<StyledDiv>
				<StyledH4>{props.headline}</StyledH4>
				<StyledInput
					type={props.type}
					id={props.name}
					checked={state.value}/>
				<HelpIcon text={props.help}/>
			</StyledDiv>
			)
			.and('not to contain', <StyledLabel/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <StyledInput/>,
			'to have rendered', <StyledInput checked={true}/>
			)
			.then(() => expect(component,'with event change', 'on', <StyledInput/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});
});
