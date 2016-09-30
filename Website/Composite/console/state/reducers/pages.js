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

const initialState = {
	pages: [],
	currentPage: null,
	tabs: {}
};

const pages = (state = initialState, action) => {
	let update;
	switch (action.type) {
	case SELECT_PAGE:
		if (state.pages.indexOf(action.pageName) !== -1) {
			return Object.assign({}, state, { currentPage: action.pageName });
		} else {
			return state;
		}
	case REPLACE_PAGES:
		if (!Array.isArray(action.pages) || !action.pages.every(item => typeof item === 'string')) {
			throw new Error('REPLACE_PAGES action\'s pages value must be array of page names');
		}
		return Object.assign({}, state, { pages: action.pages, currentPage: null });
	case SELECT_TAB:
		update = { tabs: state.tabs };
		update.tabs[state.currentPage] = action.tabName;
		return Object.assign({}, state, update);
	default:
		return state;
	}
};

export default pages;
