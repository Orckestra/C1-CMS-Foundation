CharMapDialogPageBinding.prototype = new DialogPageBinding;
CharMapDialogPageBinding.prototype.constructor = CharMapDialogPageBinding;
CharMapDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function CharMapDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CharMapDialogPageBinding" );
}

/**
 * Identifies binding.
 */
CharMapDialogPageBinding.prototype.toString = function () {

	return "[CharMapDialogPageBinding]";
}

/**
 *
 */
CharMapDialogPageBinding.prototype.onBindingAttach = function () {

	CharMapDialogPageBinding.superclass.onBindingAttach.call ( this );
	
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEOUT );
	this.addEventListener ( DOMEvents.CLICK );
}

/**
 * @overloads {PageBinding#handleEvent}
 * @param {MouseEvent} e
 */
CharMapDialogPageBinding.prototype.handleEvent = function ( e ) {
	
	CharMapDialogPageBinding.superclass.handleEvent.call ( this, e );
	
	var e = e ? e : this.bindingWindow.event;
	var node = e.target ? e.target : e.srcElement;
	var p = this.bindingDocument.getElementById ( "selection" );
	
	if ( DOMUtil.getLocalName ( node ) == "a" ) {
		switch ( e.type ) {
			case "click" :
				this.response = Dialog.RESPONSE_ACCEPT;
				this.result = String.fromCharCode ( node.getAttribute ( "code" ));
				this.dispatchAction ( DialogPageBinding.ACTION_RESPONSE );
				break;
			default :
				p.firstChild.nodeValue = e.type == DOMEvents.MOUSEOVER ? node.getAttribute ( "text" ) : "";
				break;
		}
	}
}