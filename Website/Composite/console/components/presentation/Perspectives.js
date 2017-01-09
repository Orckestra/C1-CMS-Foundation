import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';

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

function listHeight(listSize) {
	return listSize * sizes.perspectiveFullHeight;
}

export const PerspectiveWrapper = styled.div`
width: 100%;
height: 100%;
`;
export const Explorer = styled.div`
position: absolute;
box-sizing: border-box;
background-color: ${colors.appMenuColor};
color: ${colors.appMenuItemColor};
height: 100%;
width: ${sizes.closedExplorerWidth}px;
padding-left: 13px;
overflow: hidden;
.open & {
	width: ${sizes.openExplorerWidth}px;
}
`;
export const MainIdentity = styled.div`
padding-top: ${sizes.identityTopPadding}px;
`;
export const MainLogo = styled.img``;
MainLogo.defaultProps = { src: '/Composite/images/branding/brand-icon.png' };
export const MainLabel = styled.img`
display: none;
margin-left: 13px;

.open & {
	display: inline;
}
`;
MainLabel.defaultProps = { src: '/Composite/images/branding/brand-text.svg' };
export const MenuButton = styled(Icon)`
padding-top: ${sizes.menuButtonTopPadding}px;
`;
export const PerspectiveMenu = styled.div`
width: 100%;
height: calc(100% - ${sizes.explorerTopHeight}px);
padding-left: 15px;
padding-right: 15px;
margin-left: -15px;
overflow-y: scroll;
`;
const ScrollIcon = styled(Icon)`
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
export const ScrollIconUp = styled(ScrollIcon)`
top: ${sizes.explorerTopHeight + 3}px;
`;
export const ScrollIconDown = styled(ScrollIcon)`
bottom: 0;
`;
export const Perspective = styled.div`
padding-top: ${sizes.perspectiveVerticalPadding}px;
padding-bottom: ${sizes.perspectiveVerticalPadding}px;
${ props => props.active ? 'color: ' + colors.appMenuItemActiveColor + ';' : ''}
`;
export const PerspectiveIcon = styled(Icon)`
vertical-align: middle;
`;
export const PerspectiveLabel = styled.p`
display: none;
vertical-align: middle;
margin-left: 38px;
text-transform: uppercase;
font-weight: bold;
font-family: Arial;
font-size: 12px;

.open & {
	display: inline;
}
`;

export const Dock = styled.div`
position: absolute;
right: 0;
height: 100%;
width: calc(100% - ${sizes.closedExplorerWidth}px);
background-color: ${colors.appMenuColor};

.open & {
	width: calc(100% - ${sizes.openExplorerWidth}px);
}
`;
export const DockPanel = styled.div`
overflow: hidden;
border-top-left-radius: 5px;
background-color: white;
width: 100%;
height: 100%;
`;

function openPerspective(perspectiveDef, props) {
	props.setPerspective(perspectiveDef.get('name'));
	if (!props.layout.getIn(['perspectives', perspectiveDef.get('name'), 'currentPage'])) {
		props.loadPage(perspectiveDef.get('rootPage'));
	}
}

// TODO: Add functionality to scroll up and down when clicking scroll icons
const Perspectives = props => <PerspectiveWrapper /**/className='open'/**/>
	<Explorer>
		<MainIdentity>
			<MainLogo/><MainLabel/>
		</MainIdentity>
		<MenuButton id={/**/'arrow-left'/*/'menu'/**/}/>
		<PerspectiveMenu menuSize={props.layout.get('perspectives').size}>
			<ScrollIconUp id="explorer-scroll-up" menuSize={props.layout.get('perspectives').size}/>
			{props.layout.get('perspectives').keySeq().map(perspectiveName => {
				let perspectiveDef = props.perspectiveDefs.get(perspectiveName);
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
	<Dock>
		<DockPanel>
			<ConnectDockPanel/>
		</DockPanel>
	</Dock>
</PerspectiveWrapper>;

Perspectives.propTypes = {
	identityName: PropTypes.string.isRequired,
	perspectiveDefs: ImmutablePropTypes.map.isRequired,
	layout: ImmutablePropTypes.map.isRequired,
	setPerspective: PropTypes.func.isRequired,
	loadPage: PropTypes.func.isRequired
};

export default Perspectives;
