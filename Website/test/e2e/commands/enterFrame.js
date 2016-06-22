var util = require('util');
var events = require('events');

function EnterFrame() {
  events.EventEmitter.call(this);
}

util.inherits(EnterFrame, events.EventEmitter);

EnterFrame.prototype.command = function(selector) {
	this.client.api.element('css selector', selector, result => {
		this.client.api.frame(
			result.value,
			() => this.emit('complete')
		);
	});
  return this.client.api;
};

module.exports = EnterFrame;
