import expect from '../../../helpers/expect';
import * as actions from 'console/state/actions/pageSelection.js';

describe('Page selection', () => {
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
});
