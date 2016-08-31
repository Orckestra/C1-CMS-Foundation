SlideInButtonBinding.prototype = new ToolBarButtonBinding;
SlideInButtonBinding.prototype.constructor = SlideInButtonBinding;
SlideInButtonBinding.superclass = ToolBarButtonBinding.prototype;



/**
* @class
*/
function SlideInButtonBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("SlideInButtonBinding");



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
		this._viewBinding = SlideInViewBinding.newInstance(this.bindingDocument);
		this._viewBinding.setDefinition(definition);
		this._viewBinding.attach();
		this._viewBinding.snapToBinding(bodyBinding);
	}
}

/**
 * @overloads {ButtonBinding#setURL}
 * @param {string} url
 */
SlideInButtonBinding.prototype.setURL = function (url) {

	this.setProperty("url", url);
}