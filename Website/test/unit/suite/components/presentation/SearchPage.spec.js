import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import SearchPage, * as searchUi from 'console/components/presentation/SearchPage.js';
import SearchResults from 'console/components/presentation/SearchResults.js';
import SearchFacets from 'console/components/presentation/SearchFacets.js';
import Immutable from 'immutable';

describe('SearchPage', () => {
	let renderer, props, actions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		actions = {
			setOption: sinon.spy().named('setOption'),
			performSearch: sinon.spy().named('performQuery')
		};
		props = {
			pageDef: Immutable.fromJS({
				name: 'search',
				label: 'Search',
				type: 'search',
				searchProvider: 'searchProvider',
				providers: {
					searchProvider: {
						name: 'searchProvider',
						protocol: 'wamp',
						uri: 'content.search' // TBD
					}
				},
				noResultsFound: 'No results for \'{0}\'',
				singleResultFound: '1 result for \'{0}\'',
				multipleResultsFound: '{1} results for \'{0}\'',
				linkColumn: 'label'
			}),
			facetGroups: Immutable.fromJS([
				{
					fieldName: 'testgroup',
					label: 'Test group 1',
					facets: [
						{
							value: 'facet1',
							label: 'Facet One',
							hitCount: 1
						},
						{
							value: 'facet2',
							label: 'Facet Two',
							hitCount: 3
						},
						{
							value: 'facet3',
							label: 'Facet Three',
							hitCount: 2
						}
					]
				}
			]),
			resultColumns: Immutable.fromJS([
				{ fieldName: 'label' },
				{ fieldName: 'type' }
			]),
			results: Immutable.fromJS([
				{
					label: 'Components',
					url: '/address1',
					values: {}
				},
				{
					label: 'Navigation',
					url: '/address2',
					values: {}
				},
				{
					label: 'Styles',
					url: '/address3',
					values: {}
				}
			]),
			searchQuery: Immutable.fromJS({ text: 'Test', sortInReverseOrder: false }),
			searchString: 'Test',
			actions: {
				setOption: name => options => actions.setOption(name, options),
				performSearch: (provider, name) => query => actions.performSearch(provider, name, query)
			}
		};
	});

	it('should render a basic search page', () => {
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon id='magnifier'/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>3 results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={Immutable.fromJS({ text: 'Test', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }, { label: 'Navigation' }, { label: 'Styles' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	it('with no search provider', () => {
		props.pageDef = props.pageDef.deleteIn(['providers', 'searchProvider']);
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>3 results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={Immutable.fromJS({ text: 'Test', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }, { label: 'Navigation' }, { label: 'Styles' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	it('with search ongoing', () => {
		props.searchActive = true;
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon id='refresh'/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>3 results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={Immutable.fromJS({ text: 'Test', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }, { label: 'Navigation' }, { label: 'Styles' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	it('with single search result', () => {
		props.results = Immutable.fromJS([
			{
				label: 'Components',
				url: '/address1',
				values: {}
			}
		]);
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>1 result for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={Immutable.fromJS({ text: 'Test', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	it('with empty search results list', () => {
		props.results = Immutable.List();
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>No results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={Immutable.fromJS({ text: 'Test', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.List()}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	it('without search', () => {
		props.results = Immutable.List();
		props.searchQuery = Immutable.Map({ text: '', sortInReverseOrder: false });
		delete props.searchString;
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value=''/><searchUi.SearchIcon/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<SearchResults
					searchQuery={Immutable.Map({ text: '', sortInReverseOrder: false })}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.List()}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});

	describe('events', () => {
		beforeEach(() => {
			renderer.render(<SearchPage {...props}/>);
		});

		it('updates search text', () =>
			expect(
				renderer,
				'with event', 'change', { target: { value: 'newText' } },
				'on', <searchUi.SearchField value='Test'/>
			)
			.then(() =>
				expect(actions.setOption, 'to have calls satisfying', [
					{ args: ['search', Immutable.Map({ text: 'newText', sortInReverseOrder: false })] }
				])
			)
		);

		it('fires a search query on enter in search field', () =>
			expect(
				renderer,
				'with event', 'keyPress', { key: 'Enter' },
				'on', <searchUi.SearchField value='Test'/>
			)
			.then(() =>
				expect(actions.performSearch, 'to have calls satisfying', [
					{ args: [
						{ name: 'searchProvider', protocol: 'wamp', uri: 'content.search' },
						'search',
						{ text: 'Test', sortInReverseOrder: false }
					] }
				])
			)
		);

		it('does not fire a search query on non-enter key press in search field', () =>
			expect(
				renderer,
				'with event', 'keyPress', { key: 'Space' },
				'on', <searchUi.SearchField value='Test'/>
			)
			.then(() =>
				expect(actions.performSearch, 'was not called')
			)
		);

		it('fires a search query on click on icon', () =>
			expect(
				renderer,
				'with event', 'click',
				'on', <searchUi.SearchIcon/>
			)
			.then(() =>
				expect(actions.performSearch, 'to have calls satisfying', [
					{ args: [
						{ name: 'searchProvider', protocol: 'wamp', uri: 'content.search' },
						'search',
						{ text: 'Test', sortInReverseOrder: false }
					] }
				])
			)
		);
	});
});
