var events = require('events');

function InstallPackage() {
  events.EventEmitter.call(this);
}

InstallPackage.prototype.command = function (category,packageName) {
    this.client.api
		.selectPerspective("System")
		.openTreeNode("Packages","Installed Packages")
		.openTreeNode("Installed Packages",category)
		.assertTreeNodeHasChild(category,packageName)
		.selectTreeNodeAction(packageName,"Package Info")
		.clickLabel("Uninstall")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Finish")
		.pause(5000)
		.refresh()
	
	return this.client.api;
};

module.exports = InstallPackage;
