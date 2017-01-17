import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import Perspectives, * as uiElements from 'console/components/presentation/Perspectives.js';


describe('Perspectives', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			identityName: 'C1 CMS',
			perspectiveDefs: Immutable.fromJS({
				content: {
					name: 'content',
					icon: 'perspective-content',
					label: 'Content',
					rootPage: 'content-browser'
				},
				'console-search': {
					name: 'console-search',
					icon: 'magnifier',
					label: 'Search',
					rootPage: 'search'
				}
			}),
			layout: Immutable.fromJS({
				currentPerspective: 'console-search',
				perspectives: {
					'console-search': {
						currentPage: 'search'
					},
					content: {}
				}
			}),
			setPerspective: () => {}, // Mock this for test later
			loadPage: () => {} // Mock this for test later
		};
	});

	it('renders perspective browser', () => {
		renderer.render(<Perspectives {...props}/>);
		return expect(renderer, 'to have rendered', <uiElements.PerspectiveWrapper>
			<uiElements.Explorer>
				<uiElements.MainIdentity>
					<uiElements.MainLogo/><uiElements.MainLabel/>
				</uiElements.MainIdentity>
				<uiElements.MenuButton/>
				<uiElements.PerspectiveMenu>
					<uiElements.Perspective>
						<uiElements.PerspectiveIcon id='magnifier'/>
						<uiElements.PerspectiveLabel>Search</uiElements.PerspectiveLabel>
					</uiElements.Perspective>
					<uiElements.Perspective>
						<uiElements.PerspectiveIcon id='perspective-content'/>
						<uiElements.PerspectiveLabel>Content</uiElements.PerspectiveLabel>
					</uiElements.Perspective>
				</uiElements.PerspectiveMenu>
			</uiElements.Explorer>
			<uiElements.Dock>
				<uiElements.DockPanel>
					<ConnectDockPanel/>
				</uiElements.DockPanel>
			</uiElements.Dock>

		</uiElements.PerspectiveWrapper>);
	});
});
