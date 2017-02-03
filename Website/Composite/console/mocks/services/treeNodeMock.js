const nodes = {
	contentRoot: {
		name: 'contentRoot',
		children: ['websites', 'other', 'stuff']
	},
	websites: {
		name: 'websites',
		label: 'Websites',
		children: ['venusRoot'],
		actions: [
			{
				name: 'add',
				type: 'combobutton',
				group: 'add',
				menu: true,
				icon: 'icon-page-add-page',
				buttons: [
					{
						name: 'addHome',
						label: 'Add Home',
						action: {
							callAction: 'addHomepage'
						}
					},
					{
						name: 'addBlog',
						label: 'Add Blog',
						action: {
							callAction: 'addBlog'
						}
					}
				]
			},
			{
				name: 'listUnpublished',
				type: 'button',
				menu: true,
				label: 'List Unpublished Pages',
				icon: 'page-list-unpublished-items',
				action: {
					callAction: 'listUnpublished'
				}
			},
			{
				name: 'linkCheck',
				type: 'button',
				menu: true,
				label: 'Link Checker',
				icon: 'link'
			}
		]
	},
	venusRoot: {
		name: 'venusRoot',
		label: 'Venus'
	},
	other: {
		name: 'other',
		label: 'Other'
	},
	stuff: {
		name: 'stuff',
		label: 'Stuff'
	}
};

export default function nodeMock(nodeNameList) {
	return nodeNameList.map(name => nodes[name]).filter(x => x);
}
