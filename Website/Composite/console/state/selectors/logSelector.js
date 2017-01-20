import { createSelector } from 'reselect';
import { tabSelector, shownTabNameSelector } from 'console/state/selectors/tabSelector.js';
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

const pageNameSelector = createSelector(
	allOptionsSelector,
	itemDefsSelector,
	tabSelector,
	(options, itemDefs, tabDef) => {
		let itemName = tabDef.get('logPageName');
		return options.getIn(['values', itemName]) ||
			itemDefs.getIn([itemName, 'default']);
	}
);

const currentLogSelector = createSelector(
	allLogsSelector,
	shownTabNameSelector,
	(logs, tabName) =>
		(logs.get(tabName) || Immutable.Map())
);

const currentLogPageSelector = createSelector(
	currentLogSelector,
	pageNameSelector,
	(log, page) => log.get(page) || Immutable.List()
);

const levelFilteredLogSelector = createSelector(
	currentLogPageSelector,
	logLevelSelector,
	(log, levels) => log.filter(logEntry => levels.includes(logEntry.get('severity')))
);

const dateDescComparator = (a, b) => {
	let aDate = new Date(a.get('timestamp'));
	let bDate = new Date(b.get('timestamp'));
	return aDate < bDate ?  1 :
		aDate > bDate ? -1 :
		0;
};

export const logSelector = createSelector(
	levelFilteredLogSelector,
	logs => logs.sort(dateDescComparator)
);
