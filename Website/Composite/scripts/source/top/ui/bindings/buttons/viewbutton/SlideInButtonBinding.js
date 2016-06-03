SlideInButtonBinding.prototype = new ToolBarButtonBinding;
SlideInButtonBinding.prototype.constructor = SlideInButtonBinding;
SlideInButtonBinding.superclass = ToolBarButtonBinding.prototype;

SlideInButtonBinding.VIEWSET_ID = "slideinviews";
SlideInButtonBinding.VIEWSET_CLASSNAME = "slidein";

/**
* @class
*/
function SlideInButtonBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("SlideInButtonBinding");

	this.responseAction = PageBinding.ACTION_RESPONSE;

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
SlideInButtonBinding.prototype.toString = function () {

	return "[SlideInButtonBinding]";
}

/**
* @overloads {ToolBarButtonBinding#onBindingAttach}
*/
SlideInButtonBinding.prototype.onBindingAttach = function () {

	SlideInButtonBinding.superclass.onBindingAttach.call(this);
};

/**
* Build popup when perspective changes. If no
* views are associated, the button will disable.
* @overloads {ToolBarButtonBinding#handleBroadcast}
* @param {string} broadcast
* @param {object} arg
*/
SlideInButtonBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SlideInButtonBinding.superclass.handleBroadcast.call(this, broadcast, arg);
}


/**
 * Open view when clicked.
 * @overwrites {ButtonBinding#oncommand}
 */
SlideInButtonBinding.prototype.oncommand = function () {

	var handle = this.getProperty("handle");
	var url = this.getProperty("url");
	var definition = null;

	if (handle != null) {
		definition = ViewDefinitions[handle];
	}
	else if (url != null) {
		definition = new HostedViewDefinition({
			url: url
		});
	}

	if (definition != null) {

		var bodyBinding = UserInterface.getBinding(this.bindingDocument.body);

		var viewset = this.bindingWindow.bindingMap[SlideInButtonBinding.VIEWSET_ID];
		if (viewset == null) {
			var viewsetelement = DOMUtil.createElementNS(Constants.NS_UI, "ui:viewset", this.bindingDocument);
			viewsetelement.setAttribute("id", SlideInButtonBinding.VIEWSET_ID);
			viewset = UserInterface.registerBinding(viewsetelement, ViewSetBinding);
			viewset.bindingElement.style.zIndex = 5;
			viewset.attachClassName(SlideInButtonBinding.VIEWSET_CLASSNAME);

			bodyBinding.bindingElement.insertBefore(
					viewset.bindingElement,
					bodyBinding.bindingElement.firstChild
			);
			viewset.attach();
		}

		this._viewBinding = ViewBinding.newInstance(this.bindingDocument);
		this._viewBinding.setDefinition(definition);
		viewset.add(this._viewBinding);

		this._viewBinding.attach();
		this._viewBinding.snapToBinding(bodyBinding);
		this._viewBinding.addActionListener(this.responseAction, this);
	}
}


/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SlideInButtonBinding.prototype.handleAction = function (action) {

	SlideInButtonBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		case this.responseAction:
			if (this._viewBinding != null && this._viewBinding.getContentWindow() === binding.bindingWindow) {
				this._viewBinding.dispose();
				this._viewBinding = null;
			}
			action.consume();
			break;
	}
}


/**
 * @overloads {ButtonBinding#setURL}
 * @param {string} url
 */
SlideInButtonBinding.prototype.setURL = function (url) {

	this.setProperty("url", url);
}