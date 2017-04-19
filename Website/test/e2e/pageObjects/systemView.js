module.exports = {
	elements: [
		{ systemFrame: 'iframe[src="/Composite/content/views/systemview/systemview.aspx"]'}
	],
	commands: [{
		enter: function (perspective) {
			this.api.page.content()
				.enter(perspective)
				.enterFrame('@browserFrame');
			this
				.waitForFrameLoad('@systemFrame', this.api.globals.timeouts.basic)
				.enterFrame('@systemFrame');
			return this;
		},
		enterActivePerspective: function () {
			this.api.page.content()
				.enterActivePerspective()
				.enterFrame('@browserFrame');
			this
				.waitForFrameLoad('@systemFrame', this.api.globals.timeouts.basic)
				.enterFrame('@systemFrame');
			return this;
		},
		_openTreeNode: function (parentLabel,childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > ';
			if (childLabel) {
				selector += 'treenode[label="' + childLabel + '"] > ';
			}
			selector += 'labelbox';
			this.api.waitForElementPresent(selector,this.api.globals.timeouts.basic)
			this.doubleClickSelector(selector);
			this.api.pause(300);
			return this;
		},
		_selectTreeNode: function (parentLabel,childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > ';
			if (childLabel) {
				selector += 'treenode[label="' + childLabel + '"] > ';
			}
			selector +='labelbox';
			this.api.waitForElementPresent(selector,this.api.globals.timeouts.basic)
			this.click(selector);
			return this;
		},
		_rightClickonTreeNode: function (parentLabel,childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > ';
			if (childLabel) {
				selector += 'treenode[label="' + childLabel + '"] > ';
			}
			selector +='labelbox';
			this.api.waitForElementPresent(selector,this.api.globals.timeouts.basic)
			this.rightClickSelector(selector);
			return this;
		},
		_assertTreeNodeHasChild: function (parentLabel, childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > treenode';
			if (childLabel) {
				selector += '[label="' + childLabel + '"]';
			}
			this.expect
				.element(selector)
				.to.be.present;
		},
		_assertTreeNodeHasNoChild: function (parentLabel, childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > treenode';
			if (childLabel) {
				selector += '[label="' + childLabel + '"]';
			}
			this.expect
				.element(selector)
				.not.to.be.present;
		},
		_assertTreeNodeIsEmpty: function (parentLabel,childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > treenode';
			if (childLabel) {
				selector += '[label="' + childLabel + '"] > treenode';
			}
			this.expect
				.element(selector)
				.not.to.be.present;
			
			
		},
		_assertTreeNodeIsNotEmpty: function (parentLabel,childLabel) {
			var selector = 'treenode[label="' + parentLabel + '"] > treenode';
			if (childLabel) {
				selector += '[label="' + childLabel + '"] > treenode';
			}
			this.expect
				.element(selector)
				.to.be.present;
			
			
		}
	}]
};
