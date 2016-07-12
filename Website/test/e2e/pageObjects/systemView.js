module.exports = {
	elements: [
		{ systemFrame: 'iframe[src="/Composite/content/views/systemview/systemview.aspx"]'}
	],
	commands: [{
		prepare: function () {
			this.api.page.content()
				.prepare()
				.enter()
				.enterFrame('@browserFrame');
			this
				.waitForFrameLoad('@systemFrame', 1000);
		},
		enter: function () {
			this.api.page.content()
				.enter()
				.enterFrame('@browserFrame');
			this
				.waitForFrameLoad('@systemFrame', 1000)
				.enterFrame('@systemFrame');
		},
		openTreeNode: function (label) {
			var selector = 'treenode[label="' + label + '"] > labelbox';
			this.doubleClickSelector(selector);
			this.api.pause(300);
			return this;
		},
		selectTreeNode: function (label) {
			var selector = 'treenode[label="' + label + '"] > labelbox';
			this.click(selector);
			return this;
		}
	}]
};
