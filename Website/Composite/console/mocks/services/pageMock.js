const pages = {
	'edit-language': {
		name: 'edit-language',
		label: 'Edit language',
		type: 'document',
		tabs: [
			{
				name: 'edit-language.form',
				type: 'form',
				fieldsets: [
					{
						name: 'edit-language.form.properties',
						label: 'Language Properties',
						fields: [
							{
								name: 'edit-language.form.properties.url-mapping-name',
								headline: 'URL mapping name',
								help: 'Base name in URLs'
							}
						]
					}
				]
			}
		],
		toolbars: [
			{
				name: 'edit-language.toolbar',
				style: 'light rightAligned',
				items: [
					{
						type: 'button',
						style: 'main',
						name: 'edit-language.toolbar.save',
						label: 'Save',
						icon: 'save',
						action: 'save'
					}
				]
			}
		]
	},
	'other-page': {
		name: 'other-page',
		label: 'Other form page',
		type: 'document',
		tabs: [
			{
				name: 'other-page.form',
				type: 'form',
				fieldsets: [
					{
						name: 'other-page.form.properties',
						label: 'Language Properties',
						fields: [
							{
								name: 'other-page.form.properties.url-mapping-name',
								headline: 'URL mapping name',
								help: 'Base name in URLs'
							},
							{
								name: 'other-page.form.properties.pimp-my-select',
								headline: 'Xzibit says',
								type: 'select',
								options: [
									{ value: 'yo', label: 'Yo dawg,' },
									{ value: 'herd', label: 'I herd u like selects' },
									{ value: 'put', label: 'So I put a select in ur datafield' },
									{ value: 'react', label: 'so u can select in React' }
								],
								help: 'Wise words from a man who knows about putting things in other things'
							},
							{
								name: 'other-page.form.properties.check-one',
								headline: 'Some checkboxes',
								type: 'checkbox',
								help: 'Check it #1',
								label: 'The First'
							},
							{
								name: 'other-page.form.properties.check-two',
								type: 'checkbox',
								help: 'Check it #2',
								label: 'The Last'
							},
							{
								name: 'other-page.form.properties.check-three',
								type: 'checkbox',
								help: 'Check it #3',
								label: 'The Everything'
							}
						]
					},
					{
						name: 'other-page.form.stuff',
						label: 'Some things',
						fields: [
							{
								name: 'other-page.form.stuff.thing',
								headline: 'A value'
							}
						]
					},
					{
						name: 'other-page.form.morestuff',
						label: 'Some more things',
						fields: [
							{
								name: 'other-page.form.morestuff.thing',
								headline: 'A value'
							}
						]
					}
				]
			}
		],
		toolbars: [
			{
				name: 'other-page.toolbar',
				style: 'rightAligned',
				items: [
					{
						type: 'select',
						name: 'server-log.toolbar.date',
						placeholder: 'Select date',
						options: [
							{ value: '2016-09-23' },
							{ value: '2016-09-22' },
							{ value: '2016-09-21' },
							{ value: '2016-09-20' }
						]
					},
					{
						type: 'button',
						style: 'main',
						name: 'other-page.toolbar.save',
						label: 'Save',
						icon: 'save',
						action: 'save'
					}
				]
			},
			{
				name: 'other-page.toolbar2',
				style: 'dark',
				items: [
					{
						type: 'button',
						name: 'other-page.toolbar2.sysviewToggle',
						icon: 'nodes',
						action: 'sysviewToggle'
					},
					{
						type: 'button',
						name: 'other-page.toolbar2.labeled',
						label: 'Stuff',
						action: 'sysviewToggle'
					},
					{
						type: 'select',
						name: 'server-log.toolbar2.date',
						placeholder: 'Select date',
						options: [
							{ value: '2016-09-23' },
							{ value: '2016-09-22' },
							{ value: '2016-09-21' },
							{ value: '2016-09-20' }
						]
					},
					{
						type: 'checkboxGroup',
						name: 'other-page.toolbar2.levels',
						options: [
							{ name: 'other-page.toolbar2.levels.critical', value: 'Critical', label: 'Critical' },
							{ name: 'other-page.toolbar2.levels.error', value: 'Error', label: 'Error' },
							{ name: 'other-page.toolbar2.levels.warning', value: 'Warning', label: 'Warning' },
							{ name: 'other-page.toolbar2.levels.info', value: 'Information', label: 'Information' },
							{ name: 'other-page.toolbar2.levels.verbose', value: 'Verbose', label: 'Verbose' }
						],
						default: [
							'Critical',
							'Error',
							'Warning',
							'Information'
						]
					}
				]
			}
		]
	},
	'tabbed-page': {
		name: 'tabbed-page',
		label: 'Tabbed page',
		type: 'document',
		defaultTab: 'tabbed-page.content',
		tabs: [
			{
				name: 'tabbed-page.settings',
				label: 'Settings',
				type: 'form',
				fieldsets: [
					{
						name: 'tabbed-page.settings.properties',
						label: 'Properties',
						fields: [
							{
								name: 'tabbed-page.settings.properties.name',
								headline: 'Name',
								help: 'What to call it'
							}
						]
					}
				]
			},
			{
				name: 'tabbed-page.content',
				label: 'Content',
				type: 'form',
				fieldsets: [
					{
						name: 'tabbed-page.content.properties',
						label: 'Imagine an editor here',
						fields: [
							{
								name: 'tabbed-page.content.properties.name',
								headline: 'Content',
								help: 'Should be an editor'
							}
						]
					}
				]
			}
		],
		toolbars: [
			{
				name: 'tabbed-page.toolbar',
				style: 'light rightAligned',
				items: [
					{
						type: 'button',
						style: 'main',
						name: 'tabbed-page.toolbar.save',
						label: 'Save',
						icon: 'save',
						action: 'save'
					}
				]
			}
		]
	},
	'server-log': {
		name: 'server-log',
		label: 'Server log',
		type: 'document',
		toolbars: [
			{
				name: 'server-log.toolbar',
				style: 'light',
				items: [
					{
						type: 'select',
						name: 'server-log.date',
						optionLoader: 'getLogDates'
					},
					{
						type: 'button',
						name: 'server-log.toolbar.delete',
						label: 'Delete old',
						icon: 'trash',
						action: 'deleteOld'
					},
					{
						type: 'button',
						name: 'server-log.toolbar.refresh',
						label: 'Refresh',
						icon: 'refresh',
						action: 'refresh'
					},
					{
						type: 'checkboxGroup',
						name: 'server-log.levels',
						options: [
							{ name: 'server-log.levels.critical', value: 'Critical', label: 'Critical' },
							{ name: 'server-log.levels.error', value: 'Error', label: 'Error' },
							{ name: 'server-log.levels.warning', value: 'Warning', label: 'Warning' },
							{ name: 'server-log.levels.info', value: 'Information', label: 'Information' },
							{ name: 'server-log.levels.verbose', value: 'Verbose', label: 'Verbose' }
						],
						default: [
							'Critical',
							'Error',
							'Warning',
							'Information'
						]
					}
				]
			}
		],
		tabs: [
			{
				name: 'server-log.log',
				type: 'log',
				logURL: '/Composite/console/serverLog.json',
				logLevels: 'server-log.levels',
				logPageName: 'server-log.date',
				placeholder: 'No log data available...',
				headers: {
					timestamp: 'Date',
					message: 'Message',
					title: 'Title',
					severity: 'EventType'
				}
			}
		]
	},
	'svg-sprites': {
		name: 'svg-sprites',
		label: 'SVG Spritesheet',
		type: 'spritesheet'
	},
// New style of provider-heavy page. Not implemented yet.
	// 'component-selector-shim': {
	// 	name: 'component-selector-shim',
	// 	type: 'dialogPageShim',
	// 	dialog: {
	// 		name: 'component-selector',
	// 		panes: [{
	// 			name: 'component-list',
	// 			type: 'palette',
	// 			headline: 'Select a component',
	// 			filter: 'left-aside',
	// 			categories: ['gallery', 'popular'],
	// 			topics: [
	// 				{
	// 					name: 'elementUpdate',
	// 					uri: 'components.new'
	// 				}
	// 			],
	// 			providers: [
	// 				{
	// 					name: 'elementSource',
	// 					uri: 'components.get',
	// 					protocol: 'wamp'
	// 				},
	// 				{
	// 					name: 'elementInsert',
	// 					protocol: 'post',
	// 					response: 'Dialog.RESPONSE_ACCEPT',
	// 					action: 'DialogPageBinding.ACTION_RESPONSE',
	// 					markup: ['selectedComponentDefinition'],
	// 					uri: ''
	// 				},
	// 				{
	// 					name: 'componentListCancel',
	// 					protocol: 'post',
	// 					response: 'DialogPageBinding.ACTION_RESPONSE',
	// 					action: 'Dialog.RESPONSE_CANCEL',
	// 					uri: ''
	// 				}
	// 			],
	// 			elements: {
	// 				fetch: 'elementSource',
	// 				update: 'elementUpdate'
	// 			},
	// 			buttons: [
	// 				{
	// 					name: 'cancelButton',
	// 					label: 'Cancel',
	// 					action: {
	// 						provider: 'componentListCancel'
	// 					}
	// 				},
	// 				{
	// 					name: 'finishButton',
	// 					label: 'Next',
	// 					style: 'main',
	// 					action: {
	// 						sendData: true,
	// 						provider: 'elementInsert'
	// 					}
	// 				}
	// 			]
	// 		}]
	// 	}
	// },
	'component-selector-shim': {
		name: 'component-selector-shim',
		type: 'dialogPageShim',
		dialog: {
			name: 'component-selector',
			panes: [
				{
					name: 'component-list',
					type: 'palette',
					headline: 'Select a component',
					context: 'left-aside',
					categories: ['gallery', 'popular'],
					provider: {
						name: 'elementSource',
						protocol: 'wamp',
						uri: 'components.get'
					},
					finishButton: {
						label: 'Next',
						style: 'main'
					},
					finishProvider: {
						name: 'elementInsert',
						protocol: 'post',
						response: 'Dialog.RESPONSE_ACCEPT',
						action: 'DialogPageBinding.ACTION_RESPONSE',
						markup: ['selectedComponentDefinition'],
						uri: ''
					},
					cancelButton: {
						label: 'Cancel'
					},
					cancelProvider: {
						name: 'componentListCancel',
						protocol: 'post',
						response: 'DialogPageBinding.ACTION_RESPONSE',
						action: 'Dialog.RESPONSE_CANCEL',
						uri: ''
					}
				}
			]
		}
	},
	search: {
		name: 'search',
		label: 'Search',
		type: 'search',
		placeholder: 'Search here',
		searchProvider: 'searchProvider',
		providers: [
			{
				name: 'searchProvider',
				protocol: 'wamp',
				uri: 'search.query'
			}
		],
		urlColumn: 'label'
	},
	'content-browser': {
		name: 'content-browser',
		label: 'Content',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	},
	'media-browser': {
		name: 'media-browser',
		label: 'Media',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	},
	'data-browser': {
		name: 'data-browser',
		label: 'Data',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	},
	'layout-browser': {
		name: 'layout-browser',
		label: 'Layout',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	},
	'functions-browser': {
		name: 'functions-browser',
		label: 'Functions',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	},
	'system-browser': {
		name: 'system-browser',
		label: 'System',
		type: 'document', // 'browser',
		toolbars: [],
		tabs: []
	}
};

export default function (pageName) {
	return pages[pageName];
}
