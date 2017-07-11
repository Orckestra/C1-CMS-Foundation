RequestBinding.prototype = new Binding;
RequestBinding.prototype.constructor = RequestBinding;
RequestBinding.superclass = Binding.prototype;

/**
 * This must be BOTH the client-id and the callback-id.
 * @type {String}
 */
RequestBinding.CALLBACK_ID = "__REQUEST";

/**
 * This is the client-id of the input field that we must 
 * poluate in order to let the server know who we are...
 * @type {String}
 */
RequestBinding.INPUT_ID = "__CONSOLEID";

RequestBinding.VIEW_ID = "__VIEWID";

/**
 * @class
 */
function RequestBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RequestBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
RequestBinding.prototype.toString = function () {

	return "[RequestBinding]";
}
 
/**
 * @overloads {Binding#onBindintAttach}
 */
RequestBinding.prototype.onBindingAttach = function () {
	
	RequestBinding.superclass.onBindingAttach.call ( this );
	
	this.setCallBackID ( RequestBinding.CALLBACK_ID );
	Binding.dotnetify ( this );
	
	var input = this.bindingDocument.getElementById ( RequestBinding.INPUT_ID );
	if ( input != null ) {
		input.value = Application.CONSOLE_ID;
	}

	input = this.bindingDocument.getElementById(RequestBinding.VIEW_ID);
	if (input != null) {

		var viewBinding = this.getAncestorBindingByType(ViewBinding, true);
		if (viewBinding != null && viewBinding.getHandle)
		{
			input.value = viewBinding.getHandle();
		}
		
	}
}

/**
 * Postback message. Defaults to current EditorPageBinding#message
 * @param {String} message
 */
RequestBinding.prototype.postback = function ( message) {
	
	message = message != null ? message : EditorPageBinding.message;
	this.shadowTree.dotnetinput.value = message;
	this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
}