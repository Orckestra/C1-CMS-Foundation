import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import StatelessWrapper from 'unittest/helpers/StatelessWrapper.js';
import zurvan from 'zurvan';
import styled from 'styled-components';

const StyledDiv = styled.div``;
const StyledSpan = styled.span``;

describe('HelpIcon', () => {
	let renderer, text;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		text = 'Help text';
		renderer.render(<HelpIcon text={text}/>);
	});

	it('displays an icon', () => expect(
		renderer, 'to have rendered',
		<StyledSpan/>
	));

	it('renders but does not display the help text', () =>
		expect(
			renderer, 'queried for', <StyledDiv/>, 'to have rendered',
			<StyledDiv style={{visibility: 'hidden', opacity: 0}}>{text}</StyledDiv>
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
			expect(component,
				'with event', 'click',
				'with event', 'mouseOut')
			.then(() => expect(component,
				'finding DOM tag', 'div',
				'to have attributes', {
					style: {
						visibility: 'visible',
						opacity: '1'
					}
				}))
			.then(() => expect(component,
				'finding DOM tag', 'div',
				'then wait for', 1999,
				'to have attributes', {
					style: {
						visibility: 'visible',
						opacity: '1'
					}
				}))
			.then(() => expect(component,
				'finding DOM tag', 'div',
				'then wait for', 2,
				'to have attributes', {
					style: {
						visibility: 'hidden',
						opacity: '0'
					}
				}
			)
		));
	});
});
