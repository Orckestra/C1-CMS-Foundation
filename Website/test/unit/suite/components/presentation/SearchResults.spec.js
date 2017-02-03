import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchResults, * as searchUi from 'console/components/presentation/SearchResults.js';
import Immutable from 'immutable';

describe('SearchResults', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			linkColumn: 'label',
			resultColumns: Immutable.fromJS([
				{ fieldName: 'label', label: 'Label' },
				{ fieldName: 'type', label: 'Data type' },
				{ fieldName: 'description', label: 'Description' },
				{ fieldName: 'creationDate', label: 'Created' },
				{ fieldName: 'createdBy', label: 'Author' },
				{ fieldName: 'published', label: 'Published?' }
			]),
			results: Immutable.fromJS([
				{
					label: 'Components',
					url: '/address1',
					values: {
						label: 'Components',
						type: 'C1 Page',
						description: 'This section contains pages that show off the different layouts and styling options.',
						creationDate: '2016 Dec 14',
						createdBy: 'admin',
						published: 'published'
					}
				},
				{
					label: 'Navigation',
					url: '/address2',
					values: {
						label: 'Navigation',
						type: 'C1 Page',
						description: 'Test things like deep structures and labels that are darn long.',
						creationDate: '2016 Dec 14',
						createdBy: 'admin',
						published: 'published'
					}
				},
				{
					label: 'Styles',
					url: '/address3',
					values: {
						label: 'Styles',
						type: 'C1 Page',
						description: 'This page contains different elements that you can define with the Visual Editor in the CMS Console.',
						creationDate: '2016 Dec 14',
						createdBy: 'admin',
						published: 'published'
					}
				}
			]),
			searchQuery: Immutable.fromJS({
				sortBy: 'type',
				sortInReverseOrder: false
			})
		};
	});

	it('should render a table of search results', () => {
		renderer.render(<SearchResults {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.ResultTable>
			<searchUi.ResultTableHead>
				<searchUi.ResultTableRow>
					<searchUi.ResultTableHeadCell key='name'>Label</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='type'>Data type<searchUi.SortIcon id='chevron-down'/></searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='description'>Description</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='creationDate'>Created</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='createdBy'>Author</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='published'>Published?</searchUi.ResultTableHeadCell>
				</searchUi.ResultTableRow>
			</searchUi.ResultTableHead>
			<searchUi.ResultTableBody>
				<searchUi.ResultTableRow>
					<searchUi.ResultTableBodyCell key='name'>Components</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='type'>C1 Page</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='description'>This section contains pages that show off the different layouts and styling options.</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='creationDate'>2016 Dec 14</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='createdBy'>admin</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='published'>published</searchUi.ResultTableBodyCell>
				</searchUi.ResultTableRow>
				<searchUi.ResultTableRow>
					<searchUi.ResultTableBodyCell key='name'>Navigation</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='type'>C1 Page</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='description'>Test things like deep structures and labels that are darn long.</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='creationDate'>2016 Dec 14</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='createdBy'>admin</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='published'>published</searchUi.ResultTableBodyCell>
				</searchUi.ResultTableRow>
				<searchUi.ResultTableRow>
					<searchUi.ResultTableBodyCell key='name'>Styles</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='type'>C1 Page</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='description'>This page contains different elements that you can define with the Visual Editor in the CMS Console.</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='creationDate'>2016 Dec 14</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='createdBy'>admin</searchUi.ResultTableBodyCell>
					<searchUi.ResultTableBodyCell key='published'>published</searchUi.ResultTableBodyCell>
				</searchUi.ResultTableRow>
			</searchUi.ResultTableBody>
		</searchUi.ResultTable>);
	});

	it('should render sorting arrows correctly', () => {
		props.searchQuery = props.searchQuery.set('sortInReverseOrder', true);
		renderer.render(<SearchResults {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.ResultTable>
			<searchUi.ResultTableHead>
				<searchUi.ResultTableRow>
					<searchUi.ResultTableHeadCell key='name'>Label</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='type'>Data type<searchUi.SortIcon id='chevron-up'/></searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='description'>Description</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='creationDate'>Created</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='createdBy'>Author</searchUi.ResultTableHeadCell>
					<searchUi.ResultTableHeadCell key='published'>Published?</searchUi.ResultTableHeadCell>
				</searchUi.ResultTableRow>
			</searchUi.ResultTableHead>
		</searchUi.ResultTable>);
	});
});
