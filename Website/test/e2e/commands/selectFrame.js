var util = require('util');
var events = require('events');
var Q = require('q');

function SelectFrame() {
	events.EventEmitter.call(this);
}

util.inherits(SelectFrame, events.EventEmitter);

function elementPresentPromise(client, selector) {
	return new Promise(resolve => {
		client.element('css selector', selector, result => {
			if (result.error) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

function elementListPromise(client, selector) {
	return new Promise((resolve, reject) => {
		client.elements('css selector', selector, result => {
			if (result.error) {
				reject(result.error);
			} else {
				resolve(result.value);
			}
		});
	});
}

function framePromise(client, element) {
	return new Promise((resolve, reject) => {
		client.frame(element, result => {
			if (result.error) {
				reject(result.error);
			} else {
				resolve();
			}
		});
	});
}

function frameParentPromise(client) {
	return new Promise((resolve, reject) => {
		client.frameParent(result => {
			if (result.error) {
				reject(result.error);
			} else {
				resolve();
			}
		});
	});
}

function promiseSome(list, iterator) {
	var p = Promise.resolve(false);
	list.forEach((item, index) => {
		p = p.then(result => {
			if (result) {
				return true;
			} else {
				return iterator(item);
			}
		})
	});
	return p;
}

function findSelectorInsideFrame(client, selector) {
	return elementPresentPromise(client, selector).then(found => {
		return !!found ||
			elementListPromise(client, 'iframe')
			.then(frames => promiseSome(frames, frame =>
				framePromise(client, frame)
				.then(() => {
					return findSelectorInsideFrame(client, selector);
				})
				.then(result => {
					if (result) {
						return true;
					} else {
						return frameParentPromise(client).then(Promise.resolve(false));
					}
				})
				.catch(err => {
					// if (err) {
					// 	console.error('Enter frame failed:', err);
					// }
					return false;
				})
			))
	});
}

function retry(operation, delay) {
	return operation().then(function(reason) {
		if(reason){
			return true;
		}
		if(delay>60000){
			return false;
		}
		console.log('did not find selector retrying after '+delay+' ms');
        return Q.delay(delay).then(retry.bind(null, operation, delay * 2 ));
		
    });
}


SelectFrame.prototype.command = function(selector, noReset) {
	var reset = noReset ? Promise.resolve() : framePromise(this.client.api, null);
	reset
	.then(() => retry(()=>findSelectorInsideFrame(this.client.api, selector),500))
	.then(found => {
		if (!found) {
			this.client.assertion(false, 'not found', 'found', 'Did not find selector <' + selector + '> in any frame.', this.abortOnFailure, this._stackTrace);
		// } else {
		// 	this.client.assertion(true, null, null, 'Found element <' + selector + '> and entered frame containing it' +
		// 		(noReset
		// 		? ' without resetting to top frame'
		// 		: ''), this.abortOnFailure);
		}
		this.emit('complete');
	})
	.catch(err => {
		this.client.assertion(false, err, null, 'Attempt to find <' + selector + '> failed horribly');
		this.emit('complete');
	});
}

module.exports = SelectFrame;
