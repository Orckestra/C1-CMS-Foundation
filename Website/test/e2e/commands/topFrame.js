var util = require('util');
var events = require('events');

function TopFrame() {
  events.EventEmitter.call(this);
}

util.inherits(TopFrame, events.EventEmitter);

TopFrame.prototype.command = function(selector) {
	return this.client.api.frame(null, () => this.emit('complete'));
};

module.exports = TopFrame;
