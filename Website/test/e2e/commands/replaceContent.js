var util = require('util');
var events = require('events');

function ReplaceContent() {
  events.EventEmitter.call(this);
}

util.inherits(ReplaceContent, events.EventEmitter);

ReplaceContent.prototype.command = function(selector, newContent) {
	this.client.api.execute(function (selector, newContent) {
		var element = document.querySelector(selector);
		element.innerHTML = newContent;
	}, [selector, newContent], () => {
		this.emit('complete');
	});
	return this.client.api;
};

module.exports = ReplaceContent;
