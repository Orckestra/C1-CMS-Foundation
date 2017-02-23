import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import ConnectDockTabs from 'console/components/container/ConnectDockTabs.js';

const sizes = {
	closedExplorerWidth: 50,
	openExplorerWidth: 240,
	identityTopPadding: 10,
	menuButtonTopPadding: 29,
	identityHeight: 27,
	menuButtonHeight: 20,
	perspectiveVerticalPadding: 21,
	perspectiveHeight: 20
};
sizes.explorerTopHeight = sizes.identityTopPadding +
	sizes.identityHeight +
	sizes.menuButtonTopPadding +
	sizes.menuButtonHeight;
sizes.perspectiveFullHeight = 2 * sizes.perspectiveVerticalPadding + sizes.perspectiveHeight;

const timing = {
	explorerOpen: '200ms'
};

function listHeight(listSize) {
	return listSize * sizes.perspectiveFullHeight;
}

export const PerspectiveWrapper = styled.div.withConfig({ displayName: 'PerspectiveWrapper' })`
width: 100%;
height: 100%;
user-select: none;
white-space: nowrap;
`;
export const Explorer = styled.div.withConfig({ displayName: 'Explorer' })`
position: absolute;
box-sizing: border-box;
background-color: ${colors.appMenuColor};
color: ${colors.appMenuItemColor};
height: 100%;
width: ${sizes.openExplorerWidth}px;
padding-left: 13px;
overflow: hidden;
`;
export const MainIdentity = styled.div.withConfig({ displayName: 'MainIdentity' })`
padding-top: ${sizes.identityTopPadding}px;
`;
export const MainLogo = styled.img.withConfig({ displayName: 'MainLogo' })``;
MainLogo.defaultProps = { src: '/Composite/images/branding/brand-icon.png' };
export const MainLabel = styled.img.withConfig({ displayName: 'MainLabel' })`
display: inline;
margin-left: 13px;
opacity: 0;
transition: opacity ${timing.explorerOpen};

.open & {
	opacity: 1;
}
`;
MainLabel.defaultProps = { src: '/Composite/images/branding/brand-text.svg' };
export const MenuButton = styled(Icon).withConfig({ displayName: 'MenuButton' })`
padding-top: ${sizes.menuButtonTopPadding}px;
`;
export const PerspectiveMenu = styled.div.withConfig({ displayName: 'PerspectiveMenu' })`
width: 100%;
height: calc(100% - ${sizes.explorerTopHeight}px);
padding-left: 15px;
padding-right: 15px;
margin-left: -15px;
overflow-y: scroll;
overflow-x: hidden;
`;
const ScrollIcon = styled(Icon).withConfig({ displayName: 'ScrollIcon' })`
height: 6px;
width: 38px;
position: absolute;
left: 4px;
fill: ${colors.appMenuItemActiveColor};
background-color: ${colors.appMenuColor};
display: none;
padding-bottom: 1px;
padding-top: 1px;

@media (max-height: ${props => sizes.explorerTopHeight + listHeight(props.menuSize)}px) {
	display: block;
}
`;
export const ScrollIconUp = styled(ScrollIcon).withConfig({ displayName: 'ScrollIconUp' })`
top: ${sizes.explorerTopHeight + 3}px;
`;
export const ScrollIconDown = styled(ScrollIcon).withConfig({ displayName: 'ScrollIconDown' })`
bottom: 0;
`;
export const Perspective = styled.div.withConfig({ displayName: 'Perspective' })`
padding-top: ${sizes.perspectiveVerticalPadding}px;
padding-bottom: ${sizes.perspectiveVerticalPadding}px;
${ props => props.active ? 'color: ' + colors.appMenuItemActiveColor + ';' : ''}
`;
export const PerspectiveIcon = styled(Icon).withConfig({ displayName: 'PerspectiveIcon' })`
vertical-align: middle;
`;
export const PerspectiveLabel = styled.p.withConfig({ displayName: 'PerspectiveLabel' })`
display: inline;
vertical-align: middle;
margin-left: 38px;
text-transform: uppercase;
font-weight: bold;
font-family: Arial;
font-size: 12px;
opacity: 0;
transition: opacity ${timing.explorerOpen};

.open & {
	opacity: 1;
}
`;

export const ContentOverlay = styled.div.withConfig({ displayName: 'ContentOverlay' })`
position: absolute;
right: 0;
height: 100%;
width: calc(100% - ${sizes.openExplorerWidth}px);
visibility: hidden;

.open & {
	visibility: visible;
}
`;

export const Content = styled.div.withConfig({ displayName: 'Content' })`
position: absolute;
right: 0;
height: 100%;
width: calc(100% - ${sizes.closedExplorerWidth}px);
transform: translateX(0);
background-color: ${colors.appMenuColor};
transition: transform ${timing.explorerOpen};

.open & {
	transform: translateX(${sizes.openExplorerWidth - sizes.closedExplorerWidth}px);
}
`;
export const ContentPanel = styled.div.withConfig({ displayName: 'ContentPanel' })`
overflow: hidden;
border-top-left-radius: 5px;
background-color: white;
width: 100%;
height: 100%;
`;

export function openPerspective(perspectiveDef, props) {
	props.setPerspective(perspectiveDef.get('name'));
	if (!props.layout.getIn(['perspectives', perspectiveDef.get('name'), 'currentPage'])) {
		props.loadPage(perspectiveDef.get('rootPage'));
	}
	if (props.layout.get('perspectivesOpen')) {
		props.toggleExplorer();
	}
}

// TODO: Add functionality to scroll up and down when clicking scroll icons
const Perspectives = props => <PerspectiveWrapper className={props.layout.get('perspectivesOpen') ? 'open' : ''}>
	<Explorer>
		<MainIdentity>
			<MainLogo/><MainLabel/>
		</MainIdentity>
		<MenuButton id={props.layout.get('perspectivesOpen') ? 'arrow-left' : 'menu'} onClick={props.toggleExplorer}/>
		<PerspectiveMenu menuSize={props.layout.get('perspectives').size}>
			<ScrollIconUp id="explorer-scroll-up" menuSize={props.layout.get('perspectives').size}/>
			{props.layout.get('perspectives').keySeq().map(perspectiveName => {
				let perspectiveDef = props.perspectiveDefs.get(perspectiveName);
				if (!perspectiveDef) return null;
				return <Perspective
					active={props.layout.get('currentPerspective') === perspectiveName}
					key={perspectiveDef.get('name')}
					onClick={() => openPerspective(perspectiveDef, props)}
					>
						<PerspectiveIcon id={perspectiveDef.get('icon')}/>
						<PerspectiveLabel>{perspectiveDef.get('label')}</PerspectiveLabel>
					</Perspective>;
			}).toArray()}
			<ScrollIconDown id="explorer-scroll-down" menuSize={props.layout.get('perspectives').size}/>
		</PerspectiveMenu>
	</Explorer>
	<Content>
		<ContentPanel>
			<ConnectDockTabs/>
			<ConnectDockPanel/>
		</ContentPanel>
	</Content>
	<ContentOverlay onClick={props.toggleExplorer}/>
</PerspectiveWrapper>;

Perspectives.propTypes = {
	identityName: PropTypes.string.isRequired,
	perspectiveDefs: ImmutablePropTypes.map.isRequired,
	layout: ImmutablePropTypes.map.isRequired,
	setPerspective: PropTypes.func.isRequired,
	loadPage: PropTypes.func.isRequired,
	toggleExplorer: PropTypes.func.isRequired
};

export default Perspectives;
