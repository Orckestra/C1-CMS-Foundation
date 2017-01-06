import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';

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
width: 240px;
padding-left: 13px;
`;
export const MainIdentity = styled.div`
margin-top: 10px;
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
margin-top: 8px;
padding-top: 21px;
`;
export const Perspective = styled.div`
padding-top: 21px;
padding-bottom: 21px;
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
width: calc(100% - 240px);
background-color: ${colors.appMenuColor};
`;
export const DockPanel = styled.div`
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

const Perspectives = props => <PerspectiveWrapper>
	<Explorer className='open'>
		<MainIdentity>
			<MainLogo/><MainLabel/>
		</MainIdentity>
		<MenuButton id={/**/'arrow-left'/*/'menu'/**/}/>
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
