SlideInViewBinding.prototype = new ViewBinding;
SlideInViewBinding.prototype.constructor = SlideInViewBinding;
SlideInViewBinding.superclass = ViewBinding.prototype;

SlideInViewBinding.TRANSITION_CLASSNAME = "transition";

SlideInViewBinding.VIEWSET_ID = "slideinviews";
SlideInViewBinding.VIEWSET_CLASSNAME = "slidein";

/**
 * @class
 */
function SlideInViewBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("SlideInViewBinding");

	this.responseAction = PageBinding.ACTION_RESPONSE;

	/*
	 * Returnable.
	 */
	return this;
};

/**
 * Identifies binding.
 */
SlideInViewBinding.prototype.toString = function () {

	return "[SlideInViewBinding]";
};

/**
 * @overloads {ViewBinding#onBindingAttach}
 */
SlideInViewBinding.prototype.onBindingAttach = function () {

	SlideInViewBinding.superclass.onBindingAttach.call(this);

	this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);

	this.addActionListener(this.responseAction, this);
}

SlideInViewBinding.prototype.slideToBinding = function (binding) {

	this._snapBinding = binding;

	// Initialize when first shown, creating and loading the WindowBinding
	if ( !this._isViewBindingInitialized ) {
		this.initialize ();
	}
}


/**
 * @overwrites {ViewBinding#show}
 */
SlideInViewBinding.prototype.show = function () {

	if (!this.isVisible) {
		var dimension = this._snapBinding.boxObject.getDimension();
		this.bindingElement.style.left = String(dimension.w) + "px";
		this.attachClassName(SlideInViewBinding.TRANSITION_CLASSNAME);
	}

	SlideInViewBinding.superclass.show.call(this);
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SlideInViewBinding.prototype.handleAction = function (action) {

	SlideInViewBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		case this.responseAction:
			if (this.getContentWindow() === binding.bindingWindow) {
				var self = this;
				setTimeout(function() {
					self.dispose();
				}, 0);
			}
			action.consume();
			break;
	}
}


/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SlideInViewBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SlideInViewBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
			if (this.isVisible == true) {
				this.updatePositionDimension();
			}
			break;
	}
}

/**
 * SlideInViewBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ViewBinding}
 */
SlideInViewBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:view", ownerDocument);
	var binding = UserInterface.registerBinding(element, SlideInViewBinding);
	binding.windowBinding = binding.add(WindowBinding.newInstance(ownerDocument));

	var viewset = binding.bindingWindow.bindingMap[SlideInViewBinding.VIEWSET_ID];
	if (viewset == null) {

		var bodyBinding = UserInterface.getBinding(binding.bindingDocument.body);
		var viewsetelement = DOMUtil.createElementNS(Constants.NS_UI, "ui:viewset", binding.bindingDocument);
		viewsetelement.setAttribute("id", SlideInViewBinding.VIEWSET_ID);
		viewset = UserInterface.registerBinding(viewsetelement, ViewSetBinding);
		viewset.bindingElement.style.zIndex = 5;
		viewset.attachClassName(SlideInViewBinding.VIEWSET_CLASSNAME);

		bodyBinding.bindingElement.insertBefore(
				viewset.bindingElement,
				bodyBinding.bindingElement.firstChild
		);
		viewset.attach();
	}

	viewset.add(binding);

	return binding;
}