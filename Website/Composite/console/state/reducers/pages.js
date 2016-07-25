import { SELECT_PAGE, REPLACE_PAGES } from '../actions/pageSelection';

const initialState = {
	pages: [],
	currentPage: null
};

const pages = (state = initialState, action) => {
	switch(action.type) {
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
	default:
		return state;
	}
};

export default pages;
