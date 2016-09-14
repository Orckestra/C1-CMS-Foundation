var util = require('util');
var events = require('events');

function ContentTab() {
  events.EventEmitter.call(this);
}

ContentTab.prototype.command = function (tabName) {
	this.client.api
			.selectFrame('labelbox[label="'+tabName+'"]')
			.click('labelbox[label="'+tabName+'"]');
  return this.client.api;
};

module.exports = ContentTab;
