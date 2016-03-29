AddressBarBinding.prototype = new DataInputBinding;
AddressBarBinding.prototype.constructor = AddressBarBinding;
AddressBarBinding.superclass = DataInputBinding.prototype;

/**
 * @class
 */
function AddressBarBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("AddressBarBinding");

	/**
	* @type {PathBinding}
	*/
	this.pathBinding = null;

	/**
	 * Key to validate that result of async request is actual
	 * @type {string}
	 */
	this._stateKey = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
AddressBarBinding.prototype.toString = function () {

	return "[AddressBarBinding]";
}

/**
 * @overloads {DataInputBinding#onBindingAttach}
 */
AddressBarBinding.prototype.onBindingAttach = function () {

	AddressBarBinding.superclass.onBindingAttach.call(this);

	this.pathBinding = PathBinding.newInstance(this.bindingDocument);
	this.shadowTree.box.appendChild(this.pathBinding.bindingElement);
	this.pathBinding.attach();
}



/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
AddressBarBinding.prototype.handleEvent = function (e) {

	AddressBarBinding.superclass.handleEvent.call(this, e);

	switch (e.type) {
		case DOMEvents.CLICK:
			if (e.target === this.pathBinding.bindingElement) {
				this._hideBreadcrumb();
				this.shadowTree.input.value = "";
				this.shadowTree.input.focus();

			}
			break;
	}
}


/**
 * Blur.
 * @implements {IData}
 */
AddressBarBinding.prototype.blur = function () {

	AddressBarBinding.superclass.blur.call(this);
	if (this.isBreadcrumb && !this.shadowTree.input.value && !this.pathBinding.isVisible)
		this._showBreadcrumb();
}


/**
 * Show breadcrumb
 */
AddressBarBinding.prototype.showBreadcrumb = function (node, parents) {

	this._stateKey = KeyMaster.getUniqueKey();

	var pathBinding = this.pathBinding;
	pathBinding.detachRecursive();
	pathBinding.bindingElement.innerHTML = "";

	if (parents != undefined) {
		parents.reverse().each(
			function(parent) {
				var button = ToolBarButtonBinding.newInstance(pathBinding.bindingDocument);

				button.setLabel(parent.getLabel());

				pathBinding.add(button);
				button.attach();
				button.entityToken = parent.getEntityToken();
				button.node = parent; //?
				button.oncommand = function() {
					this.dispatchAction(PathBinding.ACTION_COMMAND);
				}

			}, this
		);
	}

	if (node != undefined) {
		var button = ToolBarButtonBinding.newInstance(pathBinding.bindingDocument);
		button.setLabel(node.getLabel());
		pathBinding.add(button);
		button.attach();
	}

	this.shadowTree.input.value = "";
	this.shadowTree.input.style.display = "none";
	this.pathBinding.show();
	this.isBreadcrumb = true;
}


/**
 * Hide breadcrumb
 */
AddressBarBinding.prototype.showAddreesbar = function (url) {

	this.newState();

	var stateKey = this.getState();
	var self = this;
	PageService.ConvertRelativePageUrlToAbsolute(url, function (result) {
		if (stateKey === self.getState()) {
			self.setValue(result);
		}
	});
	this._hideBreadcrumb();
	this.isBreadcrumb = true;
}


/**
 * Hide breadcrumb
 */
AddressBarBinding.prototype._hideBreadcrumb = function () {
	this.pathBinding.hide();
	this.shadowTree.input.style.display = "block";
}


/**
 * Hide breadcrumb
 */
AddressBarBinding.prototype._showBreadcrumb = function () {
	this.shadowTree.input.style.display = "none";
	this.pathBinding.show();
}


/**
 * new State
 */
AddressBarBinding.prototype.newState = function () {

	this._stateKey = KeyMaster.getUniqueKey();
	return this._stateKey;
}

/**
 * new State
 */
AddressBarBinding.prototype.getState = function () {

	return this._stateKey;
}
