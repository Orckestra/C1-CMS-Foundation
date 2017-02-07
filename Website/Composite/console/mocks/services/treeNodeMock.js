const nodes = {
	contentRoot: {
		name: 'contentRoot',
		children: ['websites', 'other', 'stuff']
	},
	websites: {
		name: 'websites',
		label: 'Websites',
		icon: 'browser-green',
		children: ['venusRoot'],
		actions: [
			{
				name: 'add',
				type: 'combobutton',
				menu: true,
				icon: 'page-add-page',
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
		label: 'Venus',
		icon: 'page',
		children: ['sub1', 'sub2']
	},
	sub1: {
		name: 'sub1',
		label: 'Sub-Page 1',
		children: ['sub11']
	},
	sub11: {
		name: 'sub11',
		label: 'Sub-Page 1.1'
	},
	sub2: {
		name: 'sub2',
		label: 'Sub-Page 2'
	},
	other: {
		name: 'other',
		label: 'Other'
	},
	stuff: {
		name: 'stuff',
		label: 'Stuff',
		icon: 'page'
	}
};

export default function nodeMock(nodeNameList) {
	return nodeNameList.map(name => nodes[name]).filter(x => x);
}
