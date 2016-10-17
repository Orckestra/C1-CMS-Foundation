var events = require('events');

function AssertTreeNodeIsNotEmpty() {
  events.EventEmitter.call(this);
}

AssertTreeNodeIsNotEmpty.prototype.command = function (parentLabel, childLabel) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective()
        ._assertTreeNodeIsNotEmpty(parentLabel, childLabel);
    return this.client.api;
};

module.exports = AssertTreeNodeIsNotEmpty;
