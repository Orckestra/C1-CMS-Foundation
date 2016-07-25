const prefix = 'PAGES.';

export const SELECT_PAGE = prefix + 'SELECT';
export function selectShownPage(pageName) {
	return { type: SELECT_PAGE, pageName };
}

export const REPLACE_PAGES = prefix + 'REPLACE';
export function replacePages(pages) {
	return {type: REPLACE_PAGES, pages};
}
