import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import StatelessWrapper from 'unittest/helpers/StatelessWrapper.js';
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
			<StyledDiv className={expect.it('not to match', /shown/)}>{text}</StyledDiv>
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
		});

		it('displays help when clicked, hides help on mouse out with a delay', () =>
			expect(component,
				'with event', 'click')
			.then(() => expect(component,
				'finding DOM tag', 'div',
				'to have attributes', {
					class: expect.it('to match', /shown/)
				}))
			.then(() => expect(component,
				'with event', 'mouseOut'))
			.then(() => expect(component,
				'finding DOM tag', 'div',
				'to have attributes', {
					class: expect.it('not to match', /shown/)
				}
			)
		));
	});
});
