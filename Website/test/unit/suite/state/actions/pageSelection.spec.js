import expect from '../../../helpers/expect';
import * as actions from '../../../../../Composite/console/state/actions/pageSelection';

describe('Page selection actions', () => {
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
});
