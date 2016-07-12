var util = require('util');
var events = require('events');

function WaitForFrameLoad() {
  events.EventEmitter.call(this);
	this.abortOnFailure = typeof this.client.api.globals.abortOnAssertionFailure == 'undefined' || this.client.api.globals.abortOnAssertionFailure;
}

util.inherits(WaitForFrameLoad, events.EventEmitter);

WaitForFrameLoad.prototype.command = function(selector, timeout) {
	if (!timeout) {
		throw new Error('waitForFrameLoad() must have timeout.');
	}

	const complete = () => this.emit('complete');
	var isTimedOut = false;
	var interval = Math.max(Math.floor(timeout / 10), 5);
	var timeElapsed = interval;
	var timedRecheck, timeoutTimer;

	const client = this.client;

	timeoutTimer = setTimeout(() => {
		clearTimeout(timedRecheck);
		client.assertion(false, null, null, 'Frame <' + selector + '> did not load within ' + timeout + 'ms', this.abortOnFailure, this._stackTrace);
		complete();
	}, timeout);

	function checkFrameLoaded() {
		client.api.execute(function (selector) {
			var frame = document.querySelector(selector);
			return frame.contentDocument.readyState === 'complete';
		}, [selector], (result) => {
			if (result.value === true) {
				clearTimeout(timeoutTimer);
				client.assertion(true, null, null, 'Frame <' + selector + '> loaded within ' + timeElapsed + 'ms', this.abortOnFailure);
				complete();
			} else {
				timedRecheck = setTimeout(checkFrameLoaded, interval);
				timeElapsed += interval;
			}
		});
	};
	checkFrameLoaded();
	return client.api;
};

module.exports = WaitForFrameLoad;
