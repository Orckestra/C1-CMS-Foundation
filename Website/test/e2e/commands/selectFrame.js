var util = require('util');
var events = require('events');

function SelectFrame() {
  events.EventEmitter.call(this);
}

util.inherits(SelectFrame, events.EventEmitter);

SelectFrame.prototype.command = function(selector, noReset) {
	if (!noReset) {
		this.client.api.topFrame()
	}
	this.client.api
		.execute(function (selector) {
			function checkFrame(frame) {
				var node = frame.document.querySelector(selector);
				if (node) {
					return [];
				} else {
					for (var i = 0; i < frame.length; i += 1) {
						try {
							var frameResult = checkFrame(frame[i]);
							if (frameResult) {
								frameResult.unshift(i);
								return frameResult;
							}
						} catch (_) {}
					}
					return null;
				}
			}
			return checkFrame(window);
		},
		[selector],
		result => {
			if (Array.isArray(result.value)) {
				result.value.forEach(key => this.client.api.frame(key));
				// this.client.assertion(true, null, null, 'Found element <' + selector + '> and entered frame containing it' + (noReset ? ' without resetting to top frame' : ''), this.abortOnFailure);
			} else {
				this.client.assertion(false, null, null, 'Did not find selector <' + selector + '> in any frame.', this.abortOnFailure, this._stackTrace);
			}
			this.emit('complete');
		});
	return this.client.api;
};

module.exports = SelectFrame;
