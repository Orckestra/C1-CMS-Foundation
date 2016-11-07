import expect from 'unittest/helpers/expect.js';
import layout, * as actions from 'console/state/reducers/layout.js';
import Immutable from 'immutable';

describe('Layout', () => {
	describe('actions', () => {
		it('has action descriptors', () =>
			expect(actions, 'to have property', 'SELECT_LOCATION')
			.and('to have property', 'OPEN_PAGE')
			.and('to have property', 'CLOSE_PAGE')
		);

		describe('setPerspective', () => {
			let setPerspective = actions.setPerspective;
			it('creates action for setting the current perspective', () => {
				let action = setPerspective('content');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'perspective', 'content')
					.and('to only have keys', ['type', 'perspective']);
			});
			it('creates action for setting the current perspective and page', () => {
				let action = setPerspective('content', 'frontpage');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'perspective', 'content')
					.and('to have property', 'page', 'frontpage')
					.and('to only have keys', ['type', 'perspective', 'page']);
			});
			it('creates action for setting the current perspective, page and tab', () => {
				let action = setPerspective('content', 'frontpage', 'preview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'perspective', 'content')
					.and('to have property', 'page', 'frontpage')
					.and('to have property', 'tab', 'preview')
					.and('to only have keys', ['type', 'perspective', 'page', 'tab']);
			});
			it('creates action for setting the current perspective, page, tab and preview location', () => {
				let action = setPerspective('content', 'frontpage', 'preview', 'frontpagePreview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'perspective', 'content')
					.and('to have property', 'page', 'frontpage')
					.and('to have property', 'tab', 'preview')
					.and('to have property', 'preview', 'frontpagePreview')
					.and('to only have keys', ['type', 'perspective', 'page', 'tab', 'preview']);
			});
		});

		describe('setPage', () => {
			let setPage = actions.setPage;
			it('creates action for setting the current page', () => {
				let action = setPage('frontpage');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'page', 'frontpage')
					.and('to only have keys', ['type', 'page']);
			});
			it('creates action for setting the current page and tab', () => {
				let action = setPage('frontpage', 'preview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'page', 'frontpage')
					.and('to have property', 'tab', 'preview')
					.and('to only have keys', ['type', 'page', 'tab']);
			});
			it('creates action for setting the current page, tab and preview location', () => {
				let action = setPage('frontpage', 'preview', 'frontpagePreview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'page', 'frontpage')
					.and('to have property', 'tab', 'preview')
					.and('to have property', 'preview', 'frontpagePreview')
					.and('to only have keys', ['type', 'page', 'tab', 'preview']);
			});
		});

		describe('setTab', () => {
			let setTab = actions.setTab;
			it('creates action for setting the current tab', () => {
				let action = setTab('preview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'tab', 'preview')
					.and('to only have keys', ['type', 'tab']);
			});
			it('creates action for setting the current tab and preview location', () => {
				let action = setTab('preview', 'frontpagePreview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'tab', 'preview')
					.and('to have property', 'preview', 'frontpagePreview')
					.and('to only have keys', ['type', 'tab', 'preview']);
			});
		});

		describe('setPreview', () => {
			let setPreview = actions.setPreview;
			it('creates action for setting the current preview location', () => {
				let action = setPreview('frontpagePreview');
				return expect(action, 'to be an action of type', actions.SELECT_LOCATION)
					.and('to have property', 'preview', 'frontpagePreview')
					.and('to only have keys', ['type', 'preview']);
			});
		});

		describe('openPage', () => {
			let openPage = actions.openPage;
			it('creates action for opening a page and populating its tab list', () => {
				let action = openPage('frontpage', ['settings', 'content', 'preview']);
				return expect(action, 'to be an action of type', actions.OPEN_PAGE)
				.and('to have property', 'pageName', 'frontpage')
				.and('to have property', 'tabNames', ['settings', 'content', 'preview']);
			});
		});
	});

	describe('reducer', () => {
		// This is safe, as it's a const immutable
		const initialState = Immutable.Map({
			currentPerspective: 'system',
			perspectives: Immutable.OrderedMap({
				content: Immutable.Map({
					currentPage: 'browser',
					pages: Immutable.OrderedMap({
						browser: Immutable.Map(),
						frontpage: Immutable.Map({
							currentTab: 'content',
							tabs: Immutable.OrderedMap({
								settings: Immutable.Map(),
								content: Immutable.Map(),
								preview: Immutable.Map({
									previewLocation: ''
								})
							})
						})
					})
				}),
				media: Immutable.Map(),
				data: Immutable.Map(),
				layout: Immutable.Map(),
				functions: Immutable.Map(),
				system: Immutable.Map({
					currentPage: 'browser',
					pages: Immutable.OrderedMap({
						browser: Immutable.Map()
					})
				})
			})
		});

		it('outputs an intial state if no action and no previous state', () => {
			let newState = layout(undefined, {});
			return expect(newState, 'to satisfy', {
				currentPerspective: 'content',
				perspectives: {
					content: {},
					media: {},
					data: {},
					layout: {},
					functions: {},
					system: {}
				}
			});
		});

		it('outputs the same state object if no action', () => {
			let oldState = Immutable.fromJS({ thing: 'do not touch' });
			let newState = layout(oldState, {});
			return expect(newState, 'to be', oldState);
		});

		describe('select location', () => {
			it('sets all location pointers', () => {
				let action = {
					type: actions.SELECT_LOCATION,
					perspective: 'content',
					page: 'frontpage',
					tab: 'preview',
					preview: 'frontpagePreview'
				};
				let oldState = initialState;
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					currentPerspective: 'content',
					perspectives: {
						content: {
							currentPage: 'frontpage',
							pages: {
								frontpage: {
									currentTab: 'preview',
									tabs: {
										preview: {
											previewLocation: 'frontpagePreview'
										}
									}
								}
							}
						}
					}
				});
			});

			it('sets single location pointers', () => {
				let action = {
					type: actions.SELECT_LOCATION,
					perspective: 'content'
				};
				let expectations = [];
				let oldState = initialState;
				let newState = layout(oldState, action);
				expectations.push(expect(newState, 'to satisfy', {
					currentPerspective: 'content'
				}));
				action = {
					type: actions.SELECT_LOCATION,
					page: 'frontpage'
				};
				oldState = newState;
				newState = layout(oldState, action);
				expectations.push(expect(newState, 'to satisfy', {
					perspectives: {
						content: {
							currentPage: 'frontpage'
						}
					}
				}));
				action = {
					type: actions.SELECT_LOCATION,
					tab: 'preview'
				};
				oldState = newState;
				newState = layout(oldState, action);
				expectations.push(expect(newState, 'to satisfy', {
					perspectives: {
						content: {
							pages: {
								frontpage: {
									currentTab: 'preview'
								}
							}
						}
					}
				}));
				action = {
					type: actions.SELECT_LOCATION,
					preview: 'frontpagePreview'
				};
				oldState = newState;
				newState = layout(oldState, action);
				expectations.push(expect(newState, 'to satisfy', {
					perspectives: {
						content: {
							pages: {
								frontpage: {
									tabs: {
										preview: {
											previewLocation: 'frontpagePreview'
										}
									}
								}
							}
						}
					}
				}));
				return Promise.all(expectations);
			});

			it('cuts out if tab missing', () => {
				let action = {
					type: actions.SELECT_LOCATION,
					perspective: 'content',
					page: 'frontpage',
					tab: 'preview',
					preview: 'frontpagePreview'
				};

				let oldState = initialState.deleteIn(['perspectives', 'content', 'pages', 'frontpage', 'tabs', 'preview']);
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					currentPerspective: 'content',
					perspectives: {
						content: {
							currentPage: 'frontpage',
							pages: {
								frontpage: {
									currentTab: 'content',
									tabs: {
										content: expect.it('not to have key', 'previewLocation')
									}
								},
							}
						}
					}
				});
			});

			it('cuts out if page missing', () => {
				let action = {
					type: actions.SELECT_LOCATION,
					perspective: 'content',
					page: 'frontpage',
					tab: 'preview',
					preview: 'frontpagePreview'
				};

				let oldState = initialState.deleteIn(['perspectives', 'content', 'pages', 'frontpage']);
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					currentPerspective: 'content',
					perspectives: {
						content: {
							currentPage: 'browser',
							pages: {
								browser: expect.it('not to have key', 'currentTab')
							}
						}
					}
				});
			});
		});

		describe('open tab', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.OPEN_PAGE,
					pageName: 'editUser-admin',
					tabNames: ['general', 'permissions', 'perspectives']
				};
			});

			it('adds a page to the current perspective, including tabs', () => {
				let oldState = initialState;
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					perspectives: {
						system: {
							currentPage: 'browser',
							pages: {
								browser: {},
								'editUser-admin': {
									tabs: {
										general: {},
										permissions: {},
										perspectives: {}
									}
								}
							}
						}
					}
				});
			});

			it('adds a page to the current perspective, without tabs', () => {
				let oldState = initialState;
				delete action.tabNames;
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					perspectives: {
						system: {
							currentPage: 'browser',
							pages: {
								browser: {},
								'editUser-admin': {
									tabs: {}
								}
							}
						}
					}
				});
			});

			it('does not add a page if already open', () => {
				let oldState = initialState.set('currentPerspective', 'content');
				action.pageName = 'frontpage';
				let newState = layout(oldState, action);
				return expect(newState, 'to be', oldState);
			});
		});

		describe('close tab', () => {
			let action;
			beforeEach(() => {
				action = {
					type: actions.CLOSE_PAGE,
					pageName: 'frontpage'
				};
			});

			it('removes a page from the current perspective', () => {
				let oldState = initialState.set('currentPerspective', 'content');
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					perspectives: {
						content: {
							currentPage: 'browser',
							pages: expect.it('not to have property', 'frontpage')
						}
					}
				});
			});

			it('changes location if removing the currently shown page', () => {
				let oldState = initialState.set('currentPerspective', 'content').setIn(['perspectives', 'content', 'currentPage'], 'frontpage');
				let newState = layout(oldState, action);
				return expect(newState, 'to satisfy', {
					perspectives: {
						content: {
							currentPage: 'browser',
							pages: expect.it('not to have property', 'frontpage')
						}
					}
				});
			});
		});
	});
});
