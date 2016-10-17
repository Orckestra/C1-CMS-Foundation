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
			function search(selector, frames) {
				var i, childFrame, selection;
				for (i = 0; i < frames.length; i++) {
					try {
						childFrame = frames[i];
						alert(childFrame.name || 'unnamed' + ' ' + i);
						selection = childFrame.document.evaluate('count('+selector+')',document,null,XPathResult.ANY_TYPE,null);
						if(selection.numberValue > 0){
							return true;
						}
						if(childFrame.length>0){
							search(selector,childFrame);
						}
					} catch (e) {
						//alert(e.message);
					}
				}
				return false;
			}
			return search(selector, window);
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
