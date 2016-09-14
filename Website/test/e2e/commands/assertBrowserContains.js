var events = require('events');

function AssertBrowserContains() {
  events.EventEmitter.call(this);
}

AssertBrowserContains.prototype.command = function (selector, value) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective();
    content._assertBrowserContains(selector, value);
    return this.client.api;
};

module.exports = AssertBrowserContains;
