import expect from '../../../helpers/expect';
import pages from '../../../../../Composite/console/state/reducers/pages';
import { SELECT_PAGE, REPLACE_PAGES } from '../../../../../Composite/console/state/actions/pageSelection';

describe('Page reducer', () => {
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
				let newState = pages(oldState, { type: SELECT_PAGE, pageName: 'test2' });
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					currentPage: 'test2'
				});
			});

			it('does nothing if selected page is unknown', () => {
				let newState = pages(oldState, { type: SELECT_PAGE, pageName: 'test88' });
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
				let newState = pages(oldState, { type: REPLACE_PAGES, pages: ['test3', 'test4']});
				return expect(newState, 'not to be', oldState)
				.and('to satisfy', {
					thing: 'do not touch',
					pages: [ 'test3', 'test4' ]
				});
			});

			it('sets the current page to null', () => {
				let newState = pages(oldState, { type: REPLACE_PAGES, pages: ['test3', 'test4']});
				return expect(newState, 'to satisfy', {
					thing: 'do not touch',
					currentPage: null
				});
			});

			it('requires an array of strings', () => {
				Promise.all([
					expect(() => pages(oldState, { type: REPLACE_PAGES, pages: {}}), 'to throw'),
					expect(() => pages(oldState, { type: REPLACE_PAGES, pages: [1,2,3]}), 'to throw'),
					expect(() => pages(oldState, { type: REPLACE_PAGES, pages: ['test',{}]}), 'to throw'),
					expect(() => pages(oldState, { type: REPLACE_PAGES, pages: [true, 'page']}), 'to throw')
				]);
			});
		});
	});
});
