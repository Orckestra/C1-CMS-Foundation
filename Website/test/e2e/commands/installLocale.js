var events = require('events');

function InstallLocale() {
  events.EventEmitter.call(this);
}

InstallLocale.prototype.command = function (language, code) {

		this.client.api
		.selectPerspective("System")
		.selectTreeNodeAction("Languages", "Add Language")
		.clickDataBySibilings("Languages")
		.clickLabel(language)
		.assertFieldValue(null, "URL mapping name", code)
		.clickDialogButton("OK")
		.waitForDialogClosed(this.api.globals.timeouts.loading)
		.openTreeNode("Languages")
		.assertTreeNodeHasChild("Languages", language)
		.refresh()

	return this.client.api;
};

module.exports = InstallLocale;
