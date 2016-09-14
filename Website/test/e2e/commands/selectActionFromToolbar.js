var events = require('events');

function SelectActionFromToolbar() {
  events.EventEmitter.call(this);
}

SelectActionFromToolbar.prototype.command = function (perspective,node,action) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
        .enter(perspective)
		._selectTreeNode(node)
			.leaveFrame()
		content
			.click('toolbarbutton[label="'+action+'"]')
	return this.client.api;
};

module.exports = SelectActionFromToolbar;
