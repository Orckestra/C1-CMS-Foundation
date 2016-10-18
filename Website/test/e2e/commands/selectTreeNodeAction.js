var events = require('events');

function SlectTreeNodeAction() {
  events.EventEmitter.call(this);
}

SlectTreeNodeAction.prototype.command = function (node,action) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective()
        ._rightClickonTreeNode(node);

    this.client.api.selectFrame('menuitem[label="' + action + '"]');
    content
        .click('menuitem[label="'+action+'"]');
	return this.client.api;
};

module.exports = SlectTreeNodeAction;
