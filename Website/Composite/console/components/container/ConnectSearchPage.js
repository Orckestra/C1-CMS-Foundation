import { connect } from 'react-redux';
import { setOption } from 'console/state/reducers/options.js';
import { getProviderPage } from 'console/state/actions/fetchFromProvider.js';
import { searchQuerySelector, facetSelector, columnSelector, rowSelector } from 'console/state/selectors/searchSelector.js';
import { currentPageNameSelector } from 'console/state/selectors/layoutSelector.js';
import SearchPage from 'console/components/presentation/SearchPage.js';
import Immutable from 'immutable';

function mapStateToProps(state) {
	// Get facets, search results
	return {
		facetGroups: facetSelector(state),
		resultColumns: columnSelector(state),
		results: rowSelector(state),
		searchQuery: state.getIn(['options', 'values', currentPageNameSelector(state)]) || Immutable.fromJS({ text: '', sortInReverseOrder: false }),
		searchString: searchQuerySelector(state),
		searchActive: !!state.getIn(['activity', 'PROVIDER.GET'])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			performSearch: (provider, pageName) => values => dispatch(getProviderPage(provider, pageName, values)),
			setOption: fieldName => value => dispatch(setOption(fieldName, value))
		}
	};
}

const ConnectSearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export default ConnectSearchPage;
