var events = require('events');

function SlectTreeNodeAction() {
  events.EventEmitter.call(this);
}

SlectTreeNodeAction.prototype.command = function (node,action,bundle) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	var browser = this.client.api;
	systemView
		.enterActivePerspective()
        ._rightClickonTreeNode(node);

	this.client.api.selectFrame('menuitem[label="' + action + '"]');
	if(bundle==null){
		content
			.click('menuitem[label="'+action+'"]');
	}
	else{
		this.client.api.moveToElement('menuitem[label="' + bundle + '"]', 5, 5, function(){
			browser.pause(browser.globals.timeouts.little);
			content
				.click('menuitem[label="'+action+'"]');
		});
	}
	return this.client.api;
};

module.exports = SlectTreeNodeAction;
