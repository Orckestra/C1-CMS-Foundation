var util = require('util');
var events = require('events');

function DoubleClick() {
  events.EventEmitter.call(this);
}

util.inherits(DoubleClick, events.EventEmitter);

DoubleClick.prototype.command = function (selector) {
	this.client.api.element('css selector', selector, result => {
		if (!result.value.ELEMENT) {
			this.client.assertion(false, null, null, 'Element <' + selector + '> was not found', this.abortOnFailure, this._stackTrace);
			this.emit('complete');
			return;
		}
		var element = result.value.ELEMENT;
		this.client.api.moveTo(element, null, null, () => {
			this.client.api.doubleClick(() => this.emit('complete'));
		});
	});
  return this.client.api;
};

module.exports = DoubleClick;
