var util = require('util');
var events = require('events');

function LeaveFrame() {
  events.EventEmitter.call(this);
}

util.inherits(LeaveFrame, events.EventEmitter);

LeaveFrame.prototype.command = function() {
	return this.client.api.frameParent(() => this.emit('complete'));
};

module.exports = LeaveFrame;
