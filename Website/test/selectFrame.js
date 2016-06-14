module.exports = function (browser, selector, activity) {
	browser
		.frame(null)
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
								frameResult.unshift(frame[i].name);
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
		function (result) {
			if (result.value) {
				result.value.forEach(function (key) {
					browser.frame(key);
				});
				activity();
				browser.frame(null);
			} else {
				throw new Error('Did not find selector "' + selector + '" in any frame.');
			}
		});
}
