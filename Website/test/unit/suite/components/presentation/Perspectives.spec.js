import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import sinon from 'sinon';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import ConnectDockTabs from 'console/components/container/ConnectDockTabs.js';
import Perspectives, { openPerspective, PerspectiveWrapper, Explorer, MainIdentity, MainLogo, MainLabel, MenuButton, PerspectiveMenu, Perspective, PerspectiveIcon, PerspectiveLabel, Content, ContentPanel } from 'console/components/presentation/Perspectives.js';

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
			pageList: Immutable.fromJS([

			]),
			layout: Immutable.fromJS({
				currentPerspective: 'console-search',
				perspectives: {
					'console-search': {
						currentPage: 'search'
					},
					content: {}
				}
			}),
			setPerspective: sinon.spy().named('setPerspective'),
			loadPage: sinon.spy().named('loadPage'),
			toggleExplorer: sinon.spy().named('toggleExplorer')
		};
	});

	it('renders perspective browser', () => {
		renderer.render(<Perspectives {...props}/>);
		return expect(renderer, 'to have rendered', (
			<PerspectiveWrapper className=''>
				<Explorer>
					<MainIdentity>
						<MainLogo/><MainLabel/>
					</MainIdentity>
					<MenuButton onClick={expect.it('to be', props.toggleExplorer)}/>
					<PerspectiveMenu>
						<Perspective onClick={expect.it('to be a function').and('not to error')}>
							<PerspectiveIcon id='magnifier'/>
							<PerspectiveLabel>Search</PerspectiveLabel>
						</Perspective>
						<Perspective onClick={expect.it('to be a function').and('not to error')}>
							<PerspectiveIcon id='perspective-content'/>
							<PerspectiveLabel>Content</PerspectiveLabel>
						</Perspective>
					</PerspectiveMenu>
				</Explorer>
				<Content>
					<ContentPanel>
						<ConnectDockTabs/>
						<ConnectDockPanel/>
					</ContentPanel>
				</Content>
			</PerspectiveWrapper>
		))
		.then(() => expect(props.setPerspective, 'to have calls satisfying', [
			{ args: ['console-search'] },
			{ args: ['content'] },
			{ args: ['console-search'] }
		]));
	});

	it('renders open perspective browser', () => {
		props.layout = props.layout.set('perspectivesOpen', true);
		renderer.render(<Perspectives {...props}/>);
		return expect(renderer, 'to have rendered', (
			<PerspectiveWrapper className='open'/>
		));
	});

	describe('openPerspective function', () => {
		it('can open a perspective', () => {
			let perspectiveDef = props.perspectiveDefs.get('console-search');
			expect(openPerspective, 'when called with', [perspectiveDef, props])
			.then(() => Promise.all([
				expect(props.setPerspective, 'to have calls satisfying', [
					{ args: ['console-search'] }
				]),
				expect(props.loadPage, 'was not called'),
				expect(props.toggleExplorer, 'was not called')
			]));
		});

		it('can load a perspective while opening it', () => {
			let perspectiveDef = props.perspectiveDefs.get('content');
			expect(openPerspective, 'when called with', [perspectiveDef, props])
			.then(() => Promise.all([
				expect(props.setPerspective, 'to have calls satisfying', [
					{ args: ['content'] }
				]),
				expect(props.loadPage, 'to have calls satisfying', [
					{ args: ['content-browser'] }
				]),
				expect(props.toggleExplorer, 'was not called')
			]));
		});

		it('closes the perspective list on select', () => {
			let perspectiveDef = props.perspectiveDefs.get('console-search');
			props.layout = props.layout.set('perspectivesOpen', true);
			expect(openPerspective, 'when called with', [perspectiveDef, props])
			.then(() => Promise.all([
				expect(props.setPerspective, 'to have calls satisfying', [
					{ args: ['console-search'] }
				]),
				expect(props.loadPage, 'was not called'),
				expect(props.toggleExplorer, 'was called once')
			]));
		});
	});
});
