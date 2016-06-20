SlideInViewBinding.prototype = new ViewBinding;
SlideInViewBinding.prototype.constructor = SlideInViewBinding;
SlideInViewBinding.superclass = ViewBinding.prototype;

SlideInViewBinding.TRANSITION_CLASSNAME = "transition";

/**
 * @class
 */
function SlideInViewBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("SlideInViewBinding");

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
	return binding;
}