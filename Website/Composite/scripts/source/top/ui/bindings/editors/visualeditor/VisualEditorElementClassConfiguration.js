/**
 * Considered internal to this class.
 * @type {Map<string><VisualEditorElementClassConfiguration>}
 */
VisualEditorElementClassConfiguration._configurations = new Map ();

/**
 * Caching configurations to save a few server requests.
 * @param {string} classconfig
 * @return {VisualEditorElementClassConfiguration}
 */
VisualEditorElementClassConfiguration.getConfiguration = function ( classconfig ) {
	
	var configs = VisualEditorElementClassConfiguration._configurations;
	if ( !configs.has ( classconfig )) {
		configs.set ( classconfig, new VisualEditorElementClassConfiguration (
			EditorConfigurationService.GetElementClassConfiguration ( classconfig ) 
		));
	};
	return configs.get ( classconfig );
};

/**
 * @class
 * @param {DOMDocument} doc
 */
function VisualEditorElementClassConfiguration ( doc ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorElementClassConfiguration" );
	
	/**
	 * @type {HashMap<string><List>}
	 */
	this._elements = {};
	
	/*
	 * populate! 
	 */
	var resolver = new XPathResolver ();
	var elements = resolver.resolveAll ( "elements/element", doc );
	while ( elements.hasNext ()) {
		var element = elements.getNext ();
		var elementname = element.getAttribute ( "name" );
		this._elements [ elementname ] = new List ();
		var classnames = resolver.resolveAll ( "class", element );
		while ( classnames.hasNext ()) {
			var classname = classnames.getNext ().getAttribute ( "name" );
			this._elements [ elementname ].add ( classname );
		}
	}
};

/**
 * @param {string} name 
 * @return {List<string>}
 */
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement = function ( name ) {
	
	var result = null;
	if ( this._elements [ name ]) {
		result = this._elements [ name ].copy ();
	} else {
		result = new List ();
	}
	return result;
};