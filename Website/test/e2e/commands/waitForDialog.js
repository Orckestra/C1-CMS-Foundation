var events = require('events');

function SelectDialog() {
  events.EventEmitter.call(this);
}

SelectDialog.prototype.command = function (timeout) {
	this.client.api.page.appWindow().enter();
	this.client.api.waitForFrameLoad('iframe[src*="/Composite/content/dialogs/standard/standard.aspx"]',timeout)
	//this.client.api.waitForFrameLoad('iframe[src*="/Composite/content/flow/FlowUi.aspx"]',timeout);
	        
    return this.client.api;
};

module.exports = SelectDialog;