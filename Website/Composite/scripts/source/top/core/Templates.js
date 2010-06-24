/**
 * @class
 * This can retrieve all sorts of stuff located in the root "templates" folder. 
 * Stuff can be retrieved as either pure text, DOMDocuments and DOMElements.
 */
function _Templates () {}

_Templates.prototype = {
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "Templates" ),
	
	/**
	 * @type {HashMap<string><object>}
	 */
	_cache : {},
	
	/**
	 * @type {int}
	 */
	_mode : null,
	
	/**
	 * @type {object}
	 */
	_modes : {
		MODE_PLAINTEXT		: 0,
		MODE_DOCUMENT		: 1,
		MODE_ELEMENT		: 2,
		MODE_DOCUMENTTEXT	: 3,
		MODE_ELEMENTTEXT	: 4
	},
	
	/**
	 * Get template as DOMDocument.
	 * @param {string} name
	 * @return {DOMDocument}
	 */
	getTemplateDocument : function ( name ) {
	
		this._mode = this._modes.MODE_DOCUMENT;
		return this._getIt ( name );
	},
	
	/**
	 * Get template as DOMElement.
	 * @param {string} name
	 * @return {DOMElement}
	 */
	getTemplateElement : function ( name ) {
	
		this._mode = this._modes.MODE_ELEMENT;
		return this._getIt ( name );
	},
	
	/**
	 * Get template as serialized DOMDocument.
	 * @param {string} name
	 * @return {string}
	 */
	getTemplateDocumentText : function ( name ) {
	
		this._mode = this._modes.MODE_DOCUMENTTEXT;
		return this._getIt ( name );
	},
	
	/**
	 * Get template as serialized DOMElement.
	 * @param {string} name
	 * @return {string}
	 */
	getTemplateElementText : function ( name ) {
	
		this._mode = this._modes.MODE_ELEMENTTEXT;
		return this._getIt ( name );
	},
	
	/**
	 * Superhacked method to fetch multiple "root" 
	 * nodes in textual form. The document structure 
	 * must take the form of an XHTML document...
	 * @param {string} name
	 * @return {string}
	 */
	getTemplateBodyText : function ( name ) {
		
		var tmp = this.getTemplateDocumentText ( name );
		tmp = tmp.split ( "<body>" )[ 1 ].split ( "</body>" )[ 0 ];
		return tmp;
	},
	
	/**
	 * Get template as plain text. This can read non-welformed templates.
	 * @param {string} name
	 * @return {string}
	 */
	getPlainText : function ( name ) {
	
		this._mode = this._modes.MODE_PLAINTEXT;
		return this._getIt ( name );
	},
	
	/**
	 * @param {string} name
	 * @return {object}
	 * @ignore
	 */ 
	_getIt : function ( name ) {
	
		var result = null;
		var entry = null;
		var isFresh = false;
		
		if ( !this._cache [ name ]) {
			
			isFresh = true;
			
			var uri = Constants.TEMPLATESROOT + "/" + name;
			var request = DOMUtil.getXMLHTTPRequest ();
			request.open ( "get", uri,  false );
			request.setRequestHeader ( "Content-Type", "text/xml; charset=UTF-8" );
			request.send ( null );
			
			switch ( this._mode ) {	
				case this._modes.MODE_PLAINTEXT :
					entry = request.responseText;
					break;
				default :
					entry = request.responseXML;
					break;
			}
			if ( entry == null ) {
				throw new Error ( "Templates: Could not read template. Malformed XML?" );
			} else {
				this._cache [ name ] = entry;
			}
		}
		
		entry = this._cache [ name ];
		
		switch ( this._mode ) {
			case this._modes.MODE_PLAINTEXT :
				result = entry;
				break;
			case this._modes.MODE_DOCUMENT :
				result = DOMUtil.cloneNode ( entry, true );
				break;
			case this._modes.MODE_ELEMENT :
				result = DOMUtil.cloneNode ( entry.documentElement, true );
				break;
			case this._modes.MODE_DOCUMENTTEXT :
				result = DOMSerializer.serialize ( entry, true );
				break;
			case this._modes.MODE_ELEMENTTEXT :
				result = DOMSerializer.serialize ( entry.documentElement, true );
				break;
		}
		
		/**
		 * Debug output for developers.
		 */
		if ( isFresh && Application.isDeveloperMode ) {
			this._logger.fine ( new String ( "Import \"" + name + "\":\n\n" + result ));
		}
		
		return result;
	}
}

/**
 * The instance that does it.
 */
var Templates = new _Templates ();