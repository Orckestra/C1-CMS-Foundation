var events = require('events');

function InstallPackage() {
  events.EventEmitter.call(this);
}

InstallPackage.prototype.command = function (category,packageName) {
    this.client.api
		.selectPerspective("System")
		.openTreeNode("Available Packages")
		.openTreeNode(category)
		.selectTreeNodeAction(packageName, "Install")
		.clickLabel("I accept the license agreement")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Finish")
		.pause(5000)
		.refresh()
		
	this.client.api
		.selectPerspective("System")
		.openTreeNode("Packages","Installed Packages")
		.openTreeNode("Installed Packages",category)
		.assertTreeNodeHasChild(category,packageName)
		.refresh()
		
	return this.client.api;
};

module.exports = InstallPackage;
