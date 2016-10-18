var events = require('events');

function AssertTreeNodeHasChild() {
  events.EventEmitter.call(this);
}

AssertTreeNodeHasChild.prototype.command = function (parentLabel, childLabel) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective()
        ._assertTreeNodeHasChild(parentLabel, childLabel);
    return this.client.api;
};

module.exports = AssertTreeNodeHasChild;
