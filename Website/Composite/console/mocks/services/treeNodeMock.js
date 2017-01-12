const nodes = {
	contentRoot: {
		name: 'contentRoot',
		children: ['websites', 'other', 'stuff']
	},
	websites: {
		label: 'Websites',
		children: ['venusRoot']
	},
	venusRoot: {
		label: 'Venus'
	},
	other: {
		label: 'Other'
	},
	stuff: {
		label: 'Stuff'
	}
};

export default function nodeMock(nodeName) {
	if (nodes[nodeName]) {
		return nodes[nodeName];
	} else {
		return null;
	}
}
