var events = require('events');

function SelectPerspective() {
  events.EventEmitter.call(this);
}

SelectPerspective.prototype.command = function (perspective) {
    var content = this.client.api.page.content();
	content.waitForBrowserFrame(perspective);
	var systemView = this.client.api.page.systemView();
	systemView
        .enter(perspective)
		
	return this.client.api;
};

module.exports = SelectPerspective;
