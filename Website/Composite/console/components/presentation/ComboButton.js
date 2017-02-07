import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import { Button, ButtonIcon, ButtonLabel } from 'console/components/presentation/Button.js';

export const ButtonWrapper = styled.div`
	display: inline-block;
	position: relative;
	border: 1px solid ${colors.borderColor};
	border-radius: 4px;
	margin: 2px 10px 2px 0;
	box-shadow: 0 2px 2px -2px ${colors.buttonDropShadowColor};

	&:hover {
		border-color: ${colors.buttonHighlightColor};
	}
`;

export const InnerButton = styled(Button)`
	border: 0 none transparent;
	margin: 0;
	height: 32px;
`;

export const TopButton = styled(InnerButton)`
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	margin-right: 0px;
`;

export const MenuButton = styled(InnerButton)`
	width: 22px;
	min-width: inherit;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	margin-left: 0px;
`;

export const DropdownIcon = styled(ButtonIcon)`
	top: 12px;
	left: 3px;
	width: 10px !important;
	height: 10px !important;
`;

export const DropdownMenu = styled.div`
	position: absolute;
	border: 1px solid ${colors.borderColor};
	border-radius: 4px;
	background-color: white;
	width: 150px;
	top: 33px;
	box-shadow: 0px 0px 12px -1px rgba(204, 204, 204, 0.75);
	z-index: 100;
	overflow: hidden;
	visibility: ${props => props.open ? 'visible' : 'hidden' };
	opacity: ${props => props.open ? 1 : 0 };
	transition: visibility 150ms, opacity 150ms;
`;

export const DropdownItem = styled.div`
	padding: 6px 11px;
	width: 100%;

	&:hover {
		background-color: ${colors.buttonHighlightColor};
		color: white;
	}
`;

class ComboButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false
		};
		this.clickHandler = event => {
			if ((!this.dropdownButton.contains(event.target))) {
				this.setState({ menuOpen: false });
			} else {
				this.setState({ menuOpen: !this.state.menuOpen });
			}
		};
	}


	componentDidMount() {
		document.addEventListener('mouseup', this.clickHandler, true);
	}

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.clickHandler, true);
	}

	static get propTypes() {
		return {
			name: PropTypes.string,
			icon: PropTypes.string,
			buttons: PropTypes.arrayOf(PropTypes.shape({
				label: PropTypes.string.isRequired,
				action: PropTypes.func.isRequired
			})).isRequired
		};
	}

	render() {
		let firstButton = this.props.buttons[0];
		let menuButtons = this.props.buttons.slice(1);
		return (
			<ButtonWrapper>
				<TopButton id={this.props.name} onClick={() => firstButton.action()}>
					{this.props.icon ? <ButtonIcon id={this.props.icon}/> : null}
					<ButtonLabel>
						{firstButton['label']}
					</ButtonLabel>
				</TopButton>
				<MenuButton
					ref={btn => { this.dropdownButton = ReactDOM.findDOMNode(btn); }}
					id={this.props.name + '_switch'}>
					<DropdownIcon id='chevron-down'/>
				</MenuButton>
				<DropdownMenu id={this.props.name + '_menu'} open={this.state.menuOpen}>
					{menuButtons.map(button => (
						<DropdownItem key={button.name} id={button.name} onClick={() => button.action()}>{button.label}</DropdownItem>
					))}
				</DropdownMenu>
			</ButtonWrapper>
		);
	}
}

export default ComboButton;
