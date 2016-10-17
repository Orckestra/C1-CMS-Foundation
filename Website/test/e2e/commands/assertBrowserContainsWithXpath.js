var events = require('events');

function AssertBrowserContains() {
  events.EventEmitter.call(this);
}

AssertBrowserContains.prototype.command = function (selector) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective();
    content._assertBrowserContains(selector);
    return this.client.api;
};

module.exports = AssertBrowserContains;
