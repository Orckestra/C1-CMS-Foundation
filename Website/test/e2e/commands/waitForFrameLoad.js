var util = require('util');
var events = require('events');

function WaitForFrameLoad() {
  events.EventEmitter.call(this);
	this.abortOnFailure = typeof this.client.api.globals.abortOnAssertionFailure == 'undefined' || this.client.api.globals.abortOnAssertionFailure;
}

util.inherits(WaitForFrameLoad, events.EventEmitter);

WaitForFrameLoad.prototype.command = function(selector, timeout) {
	if (!timeout) {
		throw new Error('waitForFrameLoaded() must have timeout.');
	}

	const complete = () => this.emit('complete');
	var isTimedOut = false;
	var interval = Math.max(Math.floor(timeout / 10), 5);
	var timeElapsed = interval;

	const client = this.client;

	var timer = setTimeout(() => {
		isTimedOut = true;
	}, timeout);

	function checkFrameLoaded() {
		client.api.execute(function (selector) {
			var frame = document.querySelector(selector);
			return frame.contentDocument.readyState === 'complete';
		}, [selector], (result) => {
			console.log(result.value);
			if (result.value) {
				clearTimeout(timer);
				client.assertion(true, null, null, 'Frame "' + selector + '" loaded within ' + timeElapsed + 'ms', this.abortOnFailure);
				complete();
			} else {
				if (isTimedOut) {
					client.assertion(false, null, null, 'Frame "' + selector + '" did not load within ' + timeout + 'ms', this.abortOnFailure, this._stackTrace);
				} else {
					console.log('not yet', timeElapsed);
					setTimeout(checkFrameLoaded, interval);
					timeElapsed += interval;
				}
			}
		});
	};
	checkFrameLoaded();
	return client.api;
};

module.exports = WaitForFrameLoad;
