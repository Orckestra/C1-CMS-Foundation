import { createSelector } from 'reselect';
// import { currentPerspectiveNameSelector } from 'console/state/selectors/layoutSelector.js';
import Immutable from 'immutable';

export const perspectiveDefsSelector = createSelector(
	state => state,
	state => state.get('perspectiveDefs') || Immutable.Map()
);

export const perspectiveDefsListSelector = createSelector(
	perspectiveDefsSelector,
	perspectiveDefs => perspectiveDefs.toList() || Immutable.List()
);

// export const currentPerspectiveDefSelector = createSelector(
// 	perspectiveDefsSelector,
// 	currentPerspectiveNameSelector,
// 	(perspectiveDefs, name) => perspectiveDefs.get(name) ||Immutable.Map()
// );
