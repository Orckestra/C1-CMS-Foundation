import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from '../../../../../Composite/console/components/presentation/HelpIcon';
import StatelessWrapper from '../../../helpers/StatelessWrapper';
import sinon from 'sinon';

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

	describe.skip('show and hide', () => {
		// Need to figure out if sinon fake timers will work.
		let component, clock;
		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<HelpIcon text={text}/>
				</StatelessWrapper>
			);
			// clock = sinon.useFakeTimers();
		});
		afterEach(() => {
			// clock.restore();
		});

		it('displays help when clicked', () =>
			expect(component, 'with event', 'click')
			.then(() => expect(
				component,
				'finding DOM tag', 'div',
				'to have attributes', {
					style: {
						visibility: 'visible',
						opacity: '1'
					}
				}
			))
		);

		it('hides help on mouse out with a delay', () =>
			expect(component, 'with event', 'click', 'with event', 'mouseOut')
			// .then(() => clock.tick(1999))
			.then(() =>
				expect(
					component,
					'finding DOM tag', 'div',
					'to have attributes', {
						style: {
							visibility: 'visible',
							opacity: '1'
						}
					}
				)
			)
			// .then(() => clock.tick(2))
			.then(() =>
				expect(
					component,
					'finding DOM tag', 'div',
					'to have attributes', {
						style: {
							visibility: 'hidden',
							opacity: '0'
						}
					}
				)
			)
		);
	});
});
