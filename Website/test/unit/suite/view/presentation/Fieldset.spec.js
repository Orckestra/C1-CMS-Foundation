import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Fieldset from '../../../../../Composite/console/components/presentation/Fieldset';
import DataField from '../../../../../Composite/console/components/presentation/DataField';

describe('Fieldset', () => {
	let renderer, props, updater;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		updater = () => {};
		props = {
			label: 'Here be fields',
			fields: {
				first: { updateValue: updater },
				second: { updateValue: updater },
				third: { updateValue: updater }
			}
		};
	});

	it('renders a labeled set of data fields', () => {
		props.label = 'Here be fields';
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have rendered',
			<fieldset>
				<legend>Here be fields</legend>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</fieldset>
		);
	});
	it('renders an unlabeled set of data fields', () => {
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have rendered',
			<fieldset>
				<DataField name="first" updateValue={updater}/>
				<DataField name="second" updateValue={updater}/>
				<DataField name="third" updateValue={updater}/>
			</fieldset>
		);
	});
});
