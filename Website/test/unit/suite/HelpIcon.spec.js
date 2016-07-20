import expect from '../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from '../../../Composite/console/components/presentation/HelpIcon';
import StatelessWrapper from '../helpers/StatelessWrapper';

describe('HelpIcon', () => {
	let renderer, text;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		text = 'Help text';
		renderer.render(<HelpIcon text={text}/>);
	});

	it('displays an icon', () => expect(
		renderer, 'to have rendered',
		<span className="helperIcon"/>
	));

	it('renders but does not display the help text', () =>
		expect(
			renderer, 'queried for', <div/>, 'to have rendered',
			<div style={{visibility: 'hidden', opacity: 0}}>{text}</div>
		)
	);

	it('displays help when clicked', () => {
		var component = TestUtils.renderIntoDocument(
			<StatelessWrapper>
				<HelpIcon text={text}/>
			</StatelessWrapper>
		);
		return expect(
			component,
			'with event', 'click')
		.then(() => expect(
			component,
			'finding DOM tag', 'div',
			'to have attributes', {
				style: {
					visibility: 'visible',
					opacity: '1'
				}
			}
		));
	});
});
