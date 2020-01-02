var events = require('events');

function WaitForDialogClosed() {
	events.EventEmitter.call(this);
}

WaitForDialogClosed.prototype.command = function (timeout) {
	timeout = timeout || this.api.globals.timeouts.basic;
	this.client.api.waitForElementNotVisible("#mastercover", timeout);
	return this.client.api;
};

module.exports = WaitForDialogClosed;