var events = require('events');

function AssertBrowserContainsAttribute() {
  events.EventEmitter.call(this);
}

AssertBrowserContainsAttribute.prototype.command = function (selector,attribute, value) {
    var content = this.client.api.page.content();
	var systemView = this.client.api.page.systemView();
	systemView
		.enterActivePerspective();
    content._assertBrowserContainsAttribute(selector,attribute, value);
    return this.client.api;
};

module.exports = AssertBrowserContainsAttribute;
