import { loadPageDef } from './actions/pageDefs';
import { selectShownPage, replacePages } from './actions/pageSelection';

export default function initState(store) {
	store.dispatch(loadPageDef('edit-language'));
	store.dispatch(replacePages(['edit-language']));
	store.dispatch(selectShownPage('edit-language'));
}
