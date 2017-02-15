const perspectives = [
	{
		name: 'content',
		icon: 'perspective-content',
		label: 'Content',
		rootPage: 'content-explorer'
	},
	{
		name: 'media',
		icon: 'perspective-media',
		label: 'Media',
		rootPage: 'media-explorer'
	},
	{
		name: 'data',
		icon: 'perspective-datas',
		label: 'Data',
		rootPage: 'data-explorer'
	},
	{
		name: 'layout',
		icon: 'perspective-design',
		label: 'Layout',
		rootPage: 'layout-explorer'
	},
	{
		name: 'functions',
		icon: 'perspective-functions',
		label: 'Functions',
		rootPage: 'functions-explorer'
	},
	{
		name: 'system',
		icon: 'perspective-system',
		label: 'System',
		rootPage: 'system-explorer'
	}
];

export default function getPerspectives() {
	return perspectives;
}
