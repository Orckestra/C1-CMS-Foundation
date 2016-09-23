var events = require('events');

function OpenNode() {
  events.EventEmitter.call(this);
}

OpenNode.prototype.command = function (parentLabel,childLabel) {
	var systemView = this.client.api.page.systemView();
		systemView
			.enterActivePerspective()
			._openTreeNode(parentLabel,childLabel);
  return this.client.api;
};

module.exports = OpenNode;
