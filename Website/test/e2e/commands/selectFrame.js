var util = require('util');
var events = require('events');

function SelectFrame() {
  events.EventEmitter.call(this);
}

util.inherits(SelectFrame, events.EventEmitter);

SelectFrame.prototype.command = function(selector) {
	this.client.api
		.topFrame()
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
			if (result.value) {
				result.value.forEach(key => this.client.api.frame(key));
				this.emit('complete');
			} else {
				throw new Error('Did not find selector "' + selector + '" in any frame.');
			}
		});
	return this.client.api;
};

module.exports = SelectFrame;
