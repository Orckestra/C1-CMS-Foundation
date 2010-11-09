window.onload = function () {
			
	/*
	 * Enable designmode
	 */
	if ( top.Client.isMozilla ) {
		document.designMode = "on";
	} else {
		document.body.contentEditable = "true";
	}
	
	/*
	 * Empty body when activated
	 */
	var handler = {
		handleEvent : function () {
			if ( document.body.hasChildNodes ()) {
				document.body.removeChild ( document.body.firstChild );
				window.parent.bindingMap.page.enableOK ();
			}
			top.DOMEvents.removeEventListener ( 
				document, 
				top.DOMEvents.MOUSEDOWN, 
				this 
			);
		}
	}
	top.DOMEvents.addEventListener ( 
		document, 
		top.DOMEvents.MOUSEDOWN, 
		handler 
	);
}