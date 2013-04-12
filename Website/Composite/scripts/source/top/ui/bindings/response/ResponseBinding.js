ResponseBinding.prototype = new Binding;
ResponseBinding.prototype.constructor = ResponseBinding;
ResponseBinding.superclass = Binding.prototype;

ResponseBinding.ACTION_SUCCESS = "response success";
ResponseBinding.ACTION_OOOOKAY = "response ooookay";
ResponseBinding.ACTION_FAILURE = "response failure";

/**
 * @class
 */
function ResponseBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ResponseBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ResponseBinding.prototype.toString = function () {

	return "[ResponseBinding]";
}

/**
 * Note that we evaluate status as soon as binding attaches.
 * @overloads {Binding#onBindingAttach}
 */
ResponseBinding.prototype.onBindingAttach = function () {

	ResponseBinding.superclass.onBindingAttach.call ( this );
	this.propertyMethodMap [ "checksum" ] = this._update;
	this._update ();
}

/**
 * Update stuff!
 */
ResponseBinding.prototype._update = function () {

	// Mark as Dirty
	if (this.getProperty("dirty") === true) {
		this.dispatchAction(Binding.ACTION_DIRTY);
	}
	/*
	* Any status updates? These ations get intercepted somewhere in PageBinding.
	* @see {PageBinding#_setupDotNet}
	*/
	var status = this.getProperty("status");
	if (status != null) {
		switch (status) {
			case "success":
				this.dispatchAction(ResponseBinding.ACTION_SUCCESS);
				break;
			case "failure":
				this.dispatchAction(ResponseBinding.ACTION_FAILURE);
				break;
			case "ooookay":
				this.dispatchAction(ResponseBinding.ACTION_OOOOKAY);
				break;
		}
	}

	/*
	* Any messages?
	*/
	var index = this.getProperty("messagequeueindex");
	if (index != null) {
		if (index > MessageQueue.index) {
			MessageQueue.update(true);
		}
	}
}