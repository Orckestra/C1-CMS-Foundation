import { createSelector } from 'reselect';
import { currentPerspectiveSelector } from 'console/state/selectors/layoutSelector.js';

const pageDefsSelector = state => state.get('pageDefs');

export const dockTabsSelector = createSelector(
	pageDefsSelector,
	currentPerspectiveSelector,
	(pageDefs, perspective) => {
		let pages = perspective.get('pages');
		let currentPage = perspective.get('currentPage');
		if (!pages) return [];
		return pages.keySeq()
			.map(pageName => {
				let pageDef = pageDefs.get(pageName);
				return {
					name: pageName,
					label: pageDef.get('label'),
					icon: pageDef.get('icon'),
					active: pageName === currentPage
				};
			}).toArray();
	}
);
