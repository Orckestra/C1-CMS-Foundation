try {
	if ( top.Application != null ) {
		
		/*
		 * force unlock all - just in case.
		 */
		top.Application.unlock ( document.title, true );
		
		/*
		 * Instructions to close the dialog are stacked on the 
		 * MessageQueue. A timeout value of zero is not enough... 
		 */
		setTimeout ( function () {
			top.MessageQueue.update ();
		}, 50 );
	}
} catch ( exception ) {
	var browser = window.navigator.userAgent;
	if ( browser.toLowerCase ().indexOf ( "gecko" ) >-1 ) {
		throw exception;
	} else {
		/*
		 * Explorer may be so cornered in its pityful 
		 * disgrace that it cannot even resolve "top"   
		 * around here. Better do nothing about this 
		 * exception and hope for the best. The joke  
		 * is that it seems to do just fine even when 
		 * the exception is encountered. Ridiculous.
		 */
	}
}