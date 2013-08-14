ResponsePageBinding.prototype = new DialogPageBinding;
ResponsePageBinding.prototype.constructor = ResponsePageBinding;
ResponsePageBinding.superclass = DialogPageBinding.prototype;

/**
* @class
*/
function ResponsePageBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("ResponsePageBinding");
	
	/**
	 * @type {string}
	 */
	this.responseid = null;
}

/**
* Identifies binding.
*/
ResponsePageBinding.prototype.toString = function () {

	return "[ResponsePageBinding]";
};


/**
 * Parse DOM properties.
 */
ResponsePageBinding.prototype.parseDOMProperties = function() {

	ResponsePageBinding.superclass.parseDOMProperties.call(this);
	
	var responseid = this.getProperty("responseid");
	this.responseid = responseid;
}

/**
* @overloads {DialogPageBinding#onBindingAttach}
*/
ResponsePageBinding.prototype.onBindingAttach = function () {

	ResponsePageBinding.superclass.onBindingAttach.call(this);

	this.addActionListener(ResponseBinding.ACTION_SUCCESS);
	this.addActionListener(ResponseBinding.ACTION_FAILURE);
	this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};


/**
* @overloads {DialogPageBinding#handleAction}
* @param {Action} action
*/
ResponsePageBinding.prototype.handleAction = function (action) {

	ResponsePageBinding.superclass.handleAction.call(this, action);

	switch (action.type) {

		case ResponseBinding.ACTION_SUCCESS:
			this.onDialogAccept();
			break;

		case ResponseBinding.ACTION_FAILURE:
			// server action expected!
			break;
	}
};

/**
* @overloads {DialogPageBinding#onBindingAccept}
*/
ResponsePageBinding.prototype.onDialogAccept = function () {

	this.response = Dialog.RESPONSE_ACCEPT;
	if (this.responseid && this.bindingDocument.getElementById(this.responseid)) {
		this.result = this.bindingDocument.getElementById(this.responseid).value;
	}

	ResponsePageBinding.superclass.onDialogAccept.call(this);
};