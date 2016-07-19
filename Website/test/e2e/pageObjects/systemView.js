module.exports = {
	elements: [
		{ systemFrame: 'iframe[src="/Composite/content/views/systemview/systemview.aspx"]'}
	],
	commands: [{
		enter: function () {
			this.api.page.content()
				.enter()
				.enterFrame('@browserFrame');
			this
				.waitForFrameLoad('@systemFrame', 1000)
				.enterFrame('@systemFrame');
			return this;
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
		},
		// Checks that a node in the system tree has children. If a child label
		// is passed, checks for that specific child.
		assertTreeNodeHasChild: function (parentLabel, childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > treenode';
			if (childLabel) {
				selector += '[label="' + childLabel + '"]';
			}
			this.expect
				.element(selector)
				.to.be.present;
		}
	}]
};
