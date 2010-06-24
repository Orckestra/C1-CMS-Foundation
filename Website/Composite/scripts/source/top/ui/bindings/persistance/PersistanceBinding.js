PersistanceBinding.prototype = new Binding;
PersistanceBinding.prototype.constructor = PersistanceBinding;
PersistanceBinding.superclass = Binding.prototype;

/**
 * Access ID for IEs 
 * userdata behavior.
 */
PersistanceBinding.USERDATAKEY = "persistance";

/**
 * Access ID for Firefox
 * globalStorage object.
 */
PersistanceBinding.GLOBALSTOREKEY = document.location.host;

/**
 * Default persistance XML document.
 * Loaded for first time user.
 */
PersistanceBinding.TEMPLATE = "storagetemplates/persistance.xml";

/**
 * @class
 * Persistance comes bundled with an element and a binding because    
 * IE handles this stuff via the "userdata behavior". Anyway,  
 * it's good to externalize this code from {@link Persistance}.
 */
function PersistanceBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PersistanceBinding" );
	
	/**
	 * @type {XPathResolver}
	 */
	this._resolver = null; 
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
PersistanceBinding.prototype.toString = function () {

	return "[PersistanceBinding]";
}

/**
 * Get persistance.
 * @return {HashMap<string><HashMap<string><string>>} 
 */
PersistanceBinding.prototype.getPersistanceMap = function () {
	
	var doc = null;
	var map = null;
	
	/*
	 * First we retrieve XML  
	 * from user filesystem.
	 */
	if ( Client.isExplorer == true ) {
		doc = this._getDocExplorer ();
	} else {
		doc = this._getDocMozilla ();
	}
	
	/*
	 * Next we parse XML into a 
	 * hashmap like structure.
	 */
	if ( doc != null ) {
		
		/*
		 * We store the doc on a variable 
		 * so that we can back it up later.
		 */
		this._document = doc;
		this.logger.fine ( DOMSerializer.serialize ( doc, true ));
		map = this._getPersistanceMap ( this._document );
	}
	
	return map;
}

/**
 * Persist.
 * @param {HashMap<string><HashMap<string><string>>} map
 */
PersistanceBinding.prototype.persist = function ( map ) {
	
	var doc = this._getPersistanceDoc ( map );
	alert ( DOMSerializer.serialize ( doc, true ));
	if ( Client.isExplorer == true ) {
		this._persistDocExplorer ( doc );
	} else {
		this._persistDocMozilla ( doc );
	}
}

/**
 * Parse XML document into a hashmap.
 * @param {DOMDocument} doc
 * @return {HashMap<string><HashMap<string><string>>}
 */
PersistanceBinding.prototype._getPersistanceMap = function ( doc ) {
	
	var map = {};
	
	if ( this._resolver == null ) {
		this._resolver = new XPathResolver ();
		this._resolver.setNamespacePrefixResolver ({
			"p" : Constants.NS_PERSISTANCE
		});
	}
	
	var list = this._resolver.resolveAll ( "p:persist", doc.documentElement );
	while ( list.hasNext ()) {
		
		var persist = list.getNext ();
		var id = persist.getAttribute ( "id" )
		map [ id ] = {};
		
		var atts = this._resolver.resolveAll ( "p:att", persist );
		while ( atts.hasNext ()) {
			
			var att = atts.getNext ();
			var name = att.getAttribute ( "name" );
			var value = att.getAttribute ( "value" );
			
			map [ id ][ name ] = value;
		}
	}
	
	return map;
}

/**
 * Parse hashmap into a XML document.
 * @param {HashMap<string><HashMap<string><string>>} map
 * @return {DOMDocument} doc
 */
PersistanceBinding.prototype._getPersistanceDoc = function ( map ) {
	
	var doc = this._document;
	var elm = doc.documentElement;
	
	/*
	 * Stamp the document with current build number. 
	 * Later builds may choose to delete persisted props.
	 */
	elm.setAttribute ( "version", Installation.versionString );
	
	/*
	 * Empty document (loaded on startup).
	 */
	while ( elm.hasChildNodes ()) {
		elm.removeChild ( elm.lastChild );
	}
	
	/*
	 * Build document from map.
	 */
	for ( var id in map ) {
		var persist = DOMUtil.createElementNS ( Constants.NS_PERSISTANCE, "persist", doc );
		persist.setAttribute ( "id", id );
		for ( var name in map [ id ]) {
			var att = DOMUtil.createElementNS ( Constants.NS_PERSISTANCE, "att", doc );
			att.setAttribute ( "name", name );
			att.setAttribute ( "value", map [ id ][ name ]);
			persist.appendChild ( att );
		}
		elm.appendChild ( persist );
	}
	
	return doc;
}

/**
 * Fetch the XML document in Explorer.
 * @return {DOMDocument}
 */
PersistanceBinding.prototype._getDocExplorer = function () {

	this.bindingElement.load ( PersistanceBinding.USERDATAKEY );
	var doc = this.bindingElement.XMLDocument;

	/*
	 * First time startup? Load clean 
	 * persistance template from filesystem.
	 */
	if ( doc.documentElement.namespaceURI == "" ) {
	
		var file = PersistanceBinding.TEMPLATE;
		var text = Templates.getTemplateElementText ( file );
		doc.loadXML ( text );
		
		/*
		 * Delete the xml comment!
		 */
		var elm = doc.documentElement;
		while ( elm.hasChildNodes ()) {
			elm.removeChild ( elm.firstChild );
		}
	}
	
	return doc;
}

/**
 * Backup the XML document in Explorer.
 * @return {DOMDocument}
 */
PersistanceBinding.prototype._persistDocExplorer = function ( doc ) {
	
	var text = DOMSerializer.serialize ( doc, true );
	this.bindingElement.XMLDocument.loadXML ( text );
	this.bindingElement.save ( PersistanceBinding.USERDATAKEY );
}

/**
 * Fetch the XML document in Mozilla.
 * @return {DOMDocument}
 */
PersistanceBinding.prototype._getDocMozilla = function () {
	
	delete window.globalStorage [ PersistanceBinding.GLOBALSTOREKEY ].persistance; /* !!!!!!!!!!! */
	
	var doc = null;
	var serialized = window.globalStorage [ PersistanceBinding.GLOBALSTOREKEY ].persistance;
	
	/*
	 * Parse the serialized storage 
	 * entry into a DOMDocument.
	 */
	if ( serialized ) {
		doc = XMLParser.parse ( serialized );
		
	/*
	 * Fetch doc from templates,
	 * removing the XML comment.
	 */
	} else {
		var file = PersistanceBinding.TEMPLATE;
		doc = Templates.getTemplateDocument ( file );
		var elm = doc.documentElement;
		while ( elm.hasChildNodes ()) {
			elm.removeChild ( elm.lastChild );
		}
	}
	
	return doc;
}

/**
 * Backup the XML document in Mozilla.
 */
PersistanceBinding.prototype._persistDocMozilla = function ( doc ) {
	
	/*
	 * We could - in theory - simply backup the hashmap structure. 
	 * But let's stick to the same setup as Internet Explorer, 
	 * the XML document is easier to debug and print out anyway. 
	 * We have to store it in serialized form...
	 */
	var serialized = DOMSerializer.serialize ( doc, true );
	window.globalStorage [ PersistanceBinding.GLOBALSTOREKEY ].persistance = serialized;
}