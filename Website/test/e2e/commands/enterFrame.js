var util = require('util');
var events = require('events');

function EnterFrame() {
  events.EventEmitter.call(this);
}

util.inherits(EnterFrame, events.EventEmitter);

EnterFrame.prototype.command = function(selector) {
	this.client.api.element('css selector', selector, result => {
		if (!result.value.ELEMENT) {
			this.client.assertion(false, null, null, 'Frame <' + selector + '> was not found', this.abortOnFailure, this._stackTrace);
			this.emit('complete');
			return;
		}
		this.client.api.frame(
			result.value,
			() => {
				this.emit('complete');
			}
		);
	});
  return this.client.api;
};

module.exports = EnterFrame;
