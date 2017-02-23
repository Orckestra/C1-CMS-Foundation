import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Fieldset, * as f from 'console/components/presentation/Fieldset.js';
import DataField from 'console/components/presentation/DataField.js';
import Immutable from 'immutable';

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
			<f.FieldsetWrapper>
				<f.FieldsetLegend>Here be fields</f.FieldsetLegend>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</f.FieldsetWrapper>
		);
	});
	it('renders an unlabeled set of data fields', () => {
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have exactly rendered',
			<f.FieldsetWrapper>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</f.FieldsetWrapper>
		);
	});
});
