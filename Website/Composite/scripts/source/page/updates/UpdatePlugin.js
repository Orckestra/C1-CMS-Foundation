/* 
 * A plugin may be registered like this - note the optional compact syntax: 
 * 
 * UpdateManager.plugins.push ({
 * 		handleElement : function ( element ) { return true; },
 * 		updateElement : function ( element ) { return false; }
 * });
 */

/**
 * Handle input and textarea elements (with an ID attribute specified). 
 * The plugin is registered with the UpdateManager in the end of this file. 
 */
function UpdatePlugin () {
		
	/**
	 * Handle element? Return true to invoke method updateElement below.
	 * @param {Element} element Remember, this is an XML element, not HTML
	 * @param {Element} oldelement
	 * @return {boolean} 
	 */
	this.handleElement = function ( element, oldelement ) {
		
		var result = false;
		
		switch ( element.nodeName.toLowerCase ()) {
			
			case "input" :
			case "textarea" :
				
				/*
				 * By default, we handle any input element with a given ID. 
				 * Special input IDs are better left to the UpdateManager.
				 * We have ASP.NET hardcoded into this stuff, so you may 
				 * choose to adapt the setup to any preferred framework.
				 */
				switch ( element.getAttribute ( "id" )) {
					case "__EVENTTARGET" :
					case "__EVENTARGUMENT" :
					case "__VIEWSTATE" :
					case "__EVENTVALIDATION" :
						result = false;
						break;
				}
				break;
		}
		return result;
	};
	
	/**
	 * Update element. Return true if the UpdateManager should stop 
	 * crawling the DOM subtree in search for further updates.
	 * @param {Element} element
	 * @param {Element} oldelement
	 * @return {boolean} True to stop crawling
	 */
	this.updateElement = function ( element, oldelement ) {
		
		/*
		 * Compare the server XML response to the actual HTML input 
		 * field values on page. If the server sends another value, 
		 * we assume that it REALLY wants to update fields values.
		 */
		var id = element.getAttribute ( "id" );
		var input = document.getElementById ( id );
		if ( input != null ) {
			var value = null;
			switch ( input.nodeName.toLowerCase ()) {
				case "input" :
					value = element.getAttribute ( "value" );
					break;
				case "textarea" :
					value = element.textContent ? element.textContent : element.text;
					break;
			}
			
			/*
			 * Fallback value.
			 */
			if ( value == null ) {
				value = "";
			}
			
			/*
			 * TODO: Other attributes could have been  
			 * updated, they are now skipped completely!!!
			 */
			if ( value != input.value ) {
				input.value = value; 
				UpdateManager.report ( "Property [value] updated on field \"" + id  + "\"" );
			}
		}
		
		/*
		 * Return true to stop crawling (no need for input and textarea). 
		 * False will come in handy if you choose to do a ReplaceUpdate...
		 */
		return true;
	};
};

/**
 * Register plugin.
 */
UpdateManager.plugins.push ( new UpdatePlugin ());
