module.exports = {
	click: function(browser, actionHandle) {
		browser
			.execute(function(actionHandle) {
				var buttons = UserInterface
					.getBinding(document.body)
					.getDescendantBindingsByType(ButtonBinding, true);
				var ourButton = null;
				buttons.each(function(button) {
					if (button.associatedSystemAction &&
						button.associatedSystemAction.getHandle() == actionHandle) {
						ourButton = button;
					}
				});

				var parentFrameKeys = [];
				if (ourButton) {
					var node = ourButton.bindingWindow.frameElement;
					while (node) {
						parentFrameKeys.push(node.name);
						node = DOMUtil.getParentWindow(node).frameElement;
					}
					return {
						key: ourButton.getID(),
						windowKeys: parentFrameKeys.reverse
					};
				} else {
					return null;
				}

			}, [actionHandle], function(result) {
				if (!result.value) throw new Error("Button not found");
				console.log(result.value);
				result.value.windowKeys.forEach(function (key) {
					browser.frame(key);
				});
				browser
					.click('#' + result.value.key);
				browser.frame(null);
			});
	}
};
