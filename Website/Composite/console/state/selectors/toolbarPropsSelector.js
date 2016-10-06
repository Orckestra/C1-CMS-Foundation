import { createSelector } from 'reselect';
// import Immutable from 'immutable';

const toolbarsSelector = props => props.toolbars;
const actionsSelector = props => props.actions;
const pageNameSelector = props => props.pageName;
const dirtySelector = props => props.dirty;

// Combines actions and toolbar items
export const toolbarPropsSelector = createSelector(
	toolbarsSelector,
	actionsSelector,
	pageNameSelector,
	dirtySelector,
	(toolbars, actions, pageName, dirty) => toolbars.map(toolbar =>
		toolbar.set('items', toolbar.get('items').map(item => {
			if (item.get('action') === 'save') {
				return item.withMutations(item => {
					item.set('action', actions.save(pageName));
					item.set('disabled', !dirty);
				});
			} else if (item.get('type') === 'select' || item.get('type') === 'checkboxGroup') {
				return item.set('onChange', actions.setOption(item.get('name')));
			} else {
				return item.set('action', actions.fireAction(item.get('action'), pageName));
			}
		}))
	)
);
