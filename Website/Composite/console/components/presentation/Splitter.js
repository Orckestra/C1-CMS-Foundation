import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';

export const SliderWrapper = styled.div`
	height: 100%;
	width: 10px;
	${({ active, movement }) => active ? 'transform: translateX(' + movement + 'px);' : ''}
	position: absolute;
	top: 0;
	left: ${({ active, splitPosition }) => splitPosition - (active ? 211 : 11)}px;
	opacity: ${({ active }) => active ? 1 : 0};
	padding: ${({ active }) => active ? '0 200px' : 0};
	transition: transform 80ms;
`;

export const SplitSlider = styled.div`
	height: 100%;
	width: 10px;
	cursor: ew-resize;
	border-right: ${({ active }) => active ? '1px solid ' + colors.borderColor : '0 none transparent'};
	${({ active }) => active ? 'box-shadow: 3px -3px 3px -1px rgba(0, 0, 0, 0.35);' : ''}
`;

class Splitter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			movement: 0
		};
	}

	activate(event) {
		this.setState({ active: true, origin: event.clientX });
	}
	move(event) {
		this.setState({ movement: event.clientX - this.state.origin });
	}
	deactivate() {
		this.props.updatePosition(this.props.splitPosition + this.state.movement);
		this.setState({ active: false, movement: 0, origin: null });
	}

	render() {
		return (
			<SliderWrapper
				wrapper //For testing ID
				onMouseUp={this.deactivate.bind(this)}
				onMouseMove={event => {
					if (this.state.active) {
						this.move(event);
					}
				}}
				active={this.state.active}
				movement={this.state.movement}
				splitPosition={this.props.splitPosition}>
				<SplitSlider
					slider //For testing ID
					onMouseDown={this.activate.bind(this)}
					active={this.state.active}
					movement={this.state.movement}
					splitPosition={this.props.splitPosition}/>
			</SliderWrapper>
		);
	}
}

Splitter.propTypes = {
	splitPosition: PropTypes.number.isRequired,
	updatePosition: PropTypes.func.isRequired
};

export default Splitter;
