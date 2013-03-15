WebServiceErrorDialogPageBinding.prototype = new DialogPageBinding;
WebServiceErrorDialogPageBinding.prototype.constructor = WebServiceErrorDialogPageBinding;
WebServiceErrorDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function WebServiceErrorDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WebServiceErrorDialogPageBinding" );
	
	/**
	 * @type {SOAPFault}
	 */
	this._soapFault = null;
	
	/**
	 * @type {SOAPRequest}
	 */
	this._soapRequest = null;
	
	/**
	 * @type {SOAPRequestResponse}
	 */
	this._soapResponse = null;
}

/**
 * Identifies binding.
 */
WebServiceErrorDialogPageBinding.prototype.toString = function () {

	return "[WebServiceErrorDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#setPageArgument}
 * @param {SOAPFault} arg
 */
WebServiceErrorDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	this._soapFault 	= arg.soapFault;
	this._soapRequest 	= arg.soapRequest;
	this._soapResponse 	= arg.soapResponse;
	
	WebServiceErrorDialogPageBinding.superclass.setPageArgument.call ( this, arg );
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
WebServiceErrorDialogPageBinding.prototype.onBeforePageInitialize = function () {

	var span = this.bindingDocument.getElementById ( "operationname" );
	span.firstChild.data = this._soapFault.getOperationName ();
	
	var textarea = this.bindingDocument.getElementById ( "faultstring" );
	textarea.value = this._soapFault.getFaultString ();
	
	WebServiceErrorDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}