import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import Splitter, * as s from 'console/components/presentation/Splitter.js';

describe('Splitter', () => {
	let component, props;
	beforeEach(() => {
		props = {
			splitPosition: 350,
			updatePosition: sinon.spy().named('udpatePosition')
		};
		component = TestUtils.renderIntoDocument(
			<Splitter {...props}/>
		);
	});

	it('renders a splitter in a wrapping box', () => {
		return expect(component, 'to have rendered', (
			<s.SliderWrapper splitPosition={350} active={false} movement={0}>
				<s.SplitSlider splitPosition={350} active={false} movement={0}/>
			</s.SliderWrapper>
		));
	});

	it('can activate and move, then deactivate', () =>
		expect(component,
			'with event', 'mouseMove', {clientX: 270},
			'on', <s.SliderWrapper wrapper/>
		)
		.then(() =>
			expect(component.state, 'to satisfy', { active: false, movement: 0 })
		)
		.then(() =>
			expect(component,
				'with event', 'mouseDown', { clientX: 255 },
				'on', <s.SplitSlider slider/>
			)
		)
		.then(() =>
			expect(component.state, 'to satisfy', { active: true, movement: 0, origin: 255 })
		)
		.then(() =>
			expect(component,
				'with event', 'mouseMove', {clientX: 270},
				'on', <s.SliderWrapper wrapper/>
			)
		)
		.then(() =>
			expect(component.state, 'to satisfy', { active: true, movement: 15, origin: 255 })
		)
		.then(() =>
			expect(component,
				'with event', 'mouseMove', {clientX: 275},
				'on', <s.SliderWrapper wrapper/>
			)
		)
		.then(() =>
			expect(component.state, 'to satisfy', { active: true, movement: 20, origin: 255 })
		)
		.then(() =>
			expect(component,
				'with event', 'mouseMove', {clientX: 310},
				'on', <s.SliderWrapper wrapper/>
			)
		)
		.then(() =>
			expect(component.state, 'to satisfy', { active: true, movement: 55, origin: 255 })
		)
		.then(() =>
			expect(component,
				'with event', 'mouseUp',
				'on', <s.SliderWrapper wrapper/>
			)
		)
		.then(() => Promise.all([
			expect(component.state, 'to satisfy', { active: false, movement: 0 }),
			expect(props.updatePosition, 'to have calls satisfying', [
				{ args: [405] }
			])
		]))
	);
});
