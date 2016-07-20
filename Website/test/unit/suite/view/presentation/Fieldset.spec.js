import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Fieldset from '../../../../../Composite/console/components/presentation/Fieldset';
import DataField from '../../../../../Composite/console/components/presentation/DataField';

describe('Fieldset', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			label: 'Here be fields',
			fields: {
				first: {},
				second: {},
				third: {}
			}
		}

	});

	it('renders a labeled set of data fields', () => {
		props.label = 'Here be fields';
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have rendered',
			<fieldset>
				<legend>Here be fields</legend>
				<DataField/>
				<DataField/>
				<DataField/>
			</fieldset>
		)
	});
	it('renders an unlabeled set of data fields', () => {
		renderer.render(<Fieldset {...props}/>);
		return expect(renderer, 'to have rendered',
			<fieldset>
				<DataField/>
				<DataField/>
				<DataField/>
			</fieldset>
		)
	})
});
