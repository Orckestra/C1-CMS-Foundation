LocalStoreBinding.prototype = new Binding;
LocalStoreBinding.prototype.constructor = LocalStoreBinding;
LocalStoreBinding.superclass = Binding.prototype;

LocalStoreBinding.STORE_PERSISTANCE = "localstorepersistance";

/**
 * Get local store.
 * @param id
 * @return {DOMDocument}
 */
LocalStoreBinding.getLocalStore = function ( id ) {
	
	
}

/**
 * @class
 */
function LocalStoreBinding () {
	
	/*
	 * Global pointer.
	 */
	LocalStore._bindingInstance = this;
	
	/*
	 * Returnable 
	 */
	return this;
}

/**
 * Identifies binding
 * @return {string}
 */
LocalStoreBinding.prototype.toString = function () {
	
	return "[LocalStoreBinding]";
}

/**
 * @param {string} id
 */
LocalStoreBinding.prototype.getLocalStore = function ( id ) {
	
}


LocalStoreBinding.prototype.onBindingRegister = function () {
	
	LocalStoreBinding.superclass.onBindingRegister.call ( this );
	
	if ( Client.isExplorer == true ) {
		
		/*
		this.bindingElement.setAttribute ( "fisse", "hej" );
		this.bindingElement.save ( "test" );
		this.bindingElement.removeAttribute ( "fisse" );
		*/
		
		this.bindingElement.load ( "persistance" );
		
		var doc = this.bindingElement.XMLDocument;
		
		/*
		var el = doc.createElement ( "FISTER" );
		doc.replaceChild ( el, doc.documentElement );
		*/
		
		alert ( DOMSerializer.serialize ( doc, true ));
		
		// this.bindingElement.save ( "persistance" );
		
		/*
		var doc = this.bindingElement.XMLDocument;
		doc.documentElement.removeChild ( doc.documentElement.firstChild );
		alert ( DOMSerializer.serialize ( doc, true ));
		
		if ( !doc.documentElement.hasChildNodes ()) {
			doc.documentElement.appendChild ( doc.createElement ( "Fisse" ));
			this.bindingElement.save ( "Fisterloegsovs" );
		}
		*/
		
	} else {
		
		var host = document.location.host;
		var storage = window.globalStorage;
		// var doc = Templates.getTemplateDocument ( "soapenvelope.xml" );
		//alert ( DOMSerializer.serialize ( doc, true ));
		/*
		try {
			storage [ host ].TEST = doc;
		} catch ( e ) {
			alert ( e );
		}
		*/
		//alert ( storage [ host ].TEST );
	}
}