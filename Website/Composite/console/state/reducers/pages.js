import Immutable from 'immutable';

const prefix = 'PAGES.';

export const SELECT_PAGE = prefix + 'SELECT';
export function selectShownPage(pageName) {
	return { type: SELECT_PAGE, pageName };
}

export const REPLACE_PAGES = prefix + 'REPLACE';
export function replacePages(pages) {
	return { type: REPLACE_PAGES, pages };
}

export const SELECT_TAB = prefix + 'SELECT_TAB';
export function selectTab(tabName) {
	return { type: SELECT_TAB, tabName };
}

const initialState = Immutable.Map({
	pages: Immutable.List(),
	currentPage: null,
	tabs: Immutable.Map()
});

const pages = (state = initialState, action) => {
	switch (action.type) {
	case SELECT_PAGE:
		if (state.get('pages').includes(action.pageName)) {
			return state.set('currentPage', action.pageName);
		} else {
			return state;
		}
	case REPLACE_PAGES:
		if (!Array.isArray(action.pages) || !action.pages.every(item => typeof item === 'string')) {
			throw new Error('REPLACE_PAGES action\'s pages value must be array of page names');
		}
		return state.withMutations(state => {
			state.set('pages', Immutable.List(action.pages));
			state.set('currentPage', null);
		});
	case SELECT_TAB:
		return state.setIn(['tabs', state.get('currentPage')], action.tabName);
	default:
		return state;
	}
};

export default pages;
