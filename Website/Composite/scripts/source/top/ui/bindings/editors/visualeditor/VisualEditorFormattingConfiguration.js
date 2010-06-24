/**
 * Considered internal to this class.
 * @type {Map<string><VisualEditorFormattingConfiguration>}
 */
VisualEditorFormattingConfiguration._configurations = new Map ();

/**
 * Populated when the editor is first loaded, see below.
 * @type {HashMap<string><string>}
 */
VisualEditorFormattingConfiguration._options = null;

/**
 * Caching configurations to save a few server requests.
 * @param {string} formatconfig
 * @return {VisualEditorFormattingConfiguration}
 */
VisualEditorFormattingConfiguration.getConfiguration = function ( formatconfig ) {
	
	var configs = VisualEditorFormattingConfiguration._configurations;
	if ( !configs.has ( formatconfig )) {
		configs.set ( formatconfig, new VisualEditorFormattingConfiguration ());
	};
	return configs.get ( formatconfig );
};

/**
 * Get all POSSIBLE formatting options.
 */
VisualEditorFormattingConfiguration._getOptions = function () {
	
	if ( VisualEditorFormattingConfiguration._options == null ) {
		
		var p = "Composite.Web.VisualEditor";	
		VisualEditorFormattingConfiguration._options = {
				"p" 			: StringBundle.getString ( p, "FormatSelector.LabelParagraph" ),
				"address" 		: StringBundle.getString ( p, "FormatSelector.LabelAddress" ),
				"blockquote" 	: StringBundle.getString ( p, "FormatSelector.LabelBlockQuote" ),
				"div"			: StringBundle.getString ( p, "FormatSelector.LabelDivision" ),
				"h1"			: StringBundle.getString ( p, "FormatSelector.LabelHeading1" ),
				"h2"			: StringBundle.getString ( p, "FormatSelector.LabelHeading2" ),
				"h3"			: StringBundle.getString ( p, "FormatSelector.LabelHeading3" ),
				"h4"			: StringBundle.getString ( p, "FormatSelector.LabelHeading4" ),
				"h5"			: StringBundle.getString ( p, "FormatSelector.LabelHeading5" ),
				"h6"			: StringBundle.getString ( p, "FormatSelector.LabelHeading6" )
		};
	}
	
	return VisualEditorFormattingConfiguration._options;
}

/**
 * @class
 * @param {string} config
 */
function VisualEditorFormattingConfiguration ( config ) {
	
	/**
	 * @type {HashMap<string><string>}
	 */
	this._options = VisualEditorFormattingConfiguration._getOptions ();
}

/**
 * Get formatting.
 */
VisualEditorFormattingConfiguration.prototype.getFormattingOptions = function () {
	
	return this._options;
}