var events = require('events');

function InstallPackage() {
  events.EventEmitter.call(this);
}

InstallPackage.prototype.command = function (packagePath, packageName) {
    this.client.api
		.selectPerspective("System")
		.selectTreeNodeAction("Packages", "Install Local Package...")
		.setFileFieldValue("Package file", packagePath + "\\" + packageName + '.zip')
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Finish")
		.pause(5000)
		.refresh()
		
	this.client.api
		.selectPerspective("System")
		.openTreeNode("Packages","Installed Packages")
		.openTreeNode("Installed Packages","Local Packages")
		.assertTreeNodeHasChild("Local Packages",packageName)
		.refresh()
		
	return this.client.api;
};

module.exports = InstallPackage;
