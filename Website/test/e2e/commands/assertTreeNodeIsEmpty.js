var events = require('events');

function AssertTreeNodeIsEmpty() {
  events.EventEmitter.call(this);
}

AssertTreeNodeIsEmpty.prototype.command = function (parentLabel, childLabel) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective()
        ._assertTreeNodeIsEmpty(parentLabel, childLabel);
    return this.client.api;
};

module.exports = AssertTreeNodeIsEmpty;
