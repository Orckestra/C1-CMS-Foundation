import { createSelector } from 'reselect';
import { tabSelector, currentTabNameSelector } from 'console/state/selectors/tabSelector.js';
import Immutable from 'immutable';

const allLogsSelector = state => state.get('logs');
const allOptionsSelector = state => state.get('options');
const itemDefsSelector = state => state.get('itemDefs');

const logLevelSelector = createSelector(
	allOptionsSelector,
	itemDefsSelector,
	tabSelector,
	(options, itemDefs, tabDef) => {
		let itemName = tabDef.get('logLevels');
		return options.getIn(['values', itemName]) ||
			itemDefs.getIn([itemName, 'default']) ||
			Immutable.List();
	}
);

const currentLogSelector = createSelector(
	allLogsSelector,
	currentTabNameSelector,
	(logs, tabName) =>
		(logs.get(tabName) || Immutable.List())
);

const levelFilteredLogSelector = createSelector(
	currentLogSelector,
	logLevelSelector,
	(log, levels) => log.filter(logEntry => levels.includes(logEntry.get('type')))
);

const dateDescComparator = (a, b) => {
	let aDate = new Date(a.get('timestamp'));
	let bDate = new Date(b.get('timestamp'));
	return aDate < bDate ?  1 :
		aDate > bDate ? -1 :
		0
};

export const logSelector = createSelector(
	levelFilteredLogSelector,
	logs => logs.sort(dateDescComparator)
);
