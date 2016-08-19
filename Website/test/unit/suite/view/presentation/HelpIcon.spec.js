import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import StatelessWrapper from 'unittest/helpers/StatelessWrapper.js';
import zurvan from 'zurvan';

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

	describe('show and hide', () => {
		let component;
		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<HelpIcon text={text}/>
				</StatelessWrapper>
			);
			zurvan.interceptTimers();
		});
		afterEach(() => {
			zurvan.releaseTimers();
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
			.then(() => zurvan.advanceTime(1999))
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
			.then(() => zurvan.advanceTime(2))
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
