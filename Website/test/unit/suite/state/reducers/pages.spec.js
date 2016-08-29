import expect from 'unittest/helpers/expect.js';
import pages, * as actions from 'console/state/reducers/pages.js';

describe('Pages', () => {
	it('outputs an intial state if no action and no previous state', () => {
		let state = pages(undefined, {});
		return expect(state, 'to equal', {
			pages: [],
			currentPage: null
		});
	});

	it('outputs the same state object if no action', () => {
		let oldState = { thing: 'do not touch' };
		let newState = pages(oldState, {});
		return expect(newState, 'to be', oldState);
	});

	it('has action descriptors', () =>
		expect(actions, 'to have property', 'SELECT_PAGE', 'PAGES.SELECT')
		.and('to have property', 'REPLACE_PAGES', 'PAGES.REPLACE')
	);

	describe('Select shown page', () => {
		let selectPage = actions.selectShownPage;

		it('creates action for selecting a page', () => {
			let action = selectPage('testpage');
			return expect(action, 'to be an action of type', actions.SELECT_PAGE)
				.and('to have property', 'pageName', 'testpage');
		});
	});

	describe('Replace page list', () => {
		let replacePages = actions.replacePages;

		it('creates action for replacing the list of available pages', () => {
			let action = replacePages(['test1', 'test2']);
			return expect(action, 'to be an action of type', actions.REPLACE_PAGES)
			.and('to have property', 'pages', ['test1', 'test2']);
		});
	});

	describe('Action responses', () => {
		let oldState;
		beforeEach(() => {
			oldState = {
				thing: 'do not touch',
				currentPage: 'test1',
				pages: [ 'test1', 'test2' ]
			};
		});

		describe('Select page', () => {
			it('changes selected page when given select page action', () => {
				let newState = pages(oldState, { type: actions.SELECT_PAGE, pageName: 'test2' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					currentPage: 'test2'
				});
			});

			it('does nothing if selected page is unknown', () => {
				let newState = pages(oldState, { type: actions.SELECT_PAGE, pageName: 'test88' });
				return expect(newState, 'to be', oldState)
				.and('to equal', {
					thing: 'do not touch',
					currentPage: 'test1',
					pages: [ 'test1', 'test2' ]
				});
			});
		});

		describe('Replace pages', () => {
			it('replaces the list of pages with those given by the action', () => {
				let newState = pages(oldState, { type: actions.REPLACE_PAGES, pages: ['test3', 'test4']});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					pages: [ 'test3', 'test4' ]
				});
			});

			it('sets the current page to null', () => {
				let newState = pages(oldState, { type: actions.REPLACE_PAGES, pages: ['test3', 'test4']});
				return expect(newState, 'to satisfy', {
					thing: 'do not touch',
					currentPage: null
				});
			});

			it('requires an array of strings', () => {
				Promise.all([
					expect(() => pages(oldState, { type: actions.REPLACE_PAGES, pages: {}}), 'to throw'),
					expect(() => pages(oldState, { type: actions.REPLACE_PAGES, pages: [1,2,3]}), 'to throw'),
					expect(() => pages(oldState, { type: actions.REPLACE_PAGES, pages: ['test',{}]}), 'to throw'),
					expect(() => pages(oldState, { type: actions.REPLACE_PAGES, pages: [true, 'page']}), 'to throw')
				]);
			});
		});
	});
});
