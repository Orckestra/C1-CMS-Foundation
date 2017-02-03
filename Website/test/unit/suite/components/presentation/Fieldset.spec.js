import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Fieldset from 'console/components/presentation/Fieldset.js';
import DataField from 'console/components/presentation/DataField.js';
import Immutable from 'immutable';
import styled from 'styled-components';

const StyledFieldset = styled.fieldset``;
const StyledLegend = styled.legend``;

describe('Fieldset', () => {
	let renderer, props, updater;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		updater = () => {};
		props = {
			fields: Immutable.fromJS([
				{ name: 'first', updateValue: updater },
				{ name: 'second', updateValue: updater },
				{ name: 'third', updateValue: updater }
			])
		};
	});

	it('renders a labeled set of data fields', () => {
		props.label = 'Here be fields';
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have rendered',
			<StyledFieldset>
				<StyledLegend>Here be fields</StyledLegend>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</StyledFieldset>
		);
	});
	it('renders an unlabeled set of data fields', () => {
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have exactly rendered',
			<StyledFieldset>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</StyledFieldset>
		);
	});
});
