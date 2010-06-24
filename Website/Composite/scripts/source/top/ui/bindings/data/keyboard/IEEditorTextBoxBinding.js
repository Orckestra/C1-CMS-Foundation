IEEditorTextBoxBinding.prototype = new EditorTextBoxBinding;
IEEditorTextBoxBinding.prototype.constructor = IEEditorTextBoxBinding;
IEEditorTextBoxBinding.superclass = EditorTextBoxBinding.prototype;

/**
 * Tab indent, tab preservation, no soft text wrap.
 * @class
 */
function IEEditorTextBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "IEEditorTextBoxBinding" );
}

/**
 * Identifies binding.
 */
IEEditorTextBoxBinding.prototype.toString = function () {
	
	return "[IEEditorTextBoxBinding]";
}

/**
 * Handle TAB key.
 * @param {boolean} isReverse
 */
IEEditorTextBoxBinding.prototype._handleTabKey = function ( isReverse ) {
	
	var range = this.bindingDocument.selection.createRange ();
	var isCollapsed = range.text == "";
	
	if ( isCollapsed && !isReverse ) {
	
		range.text = "\t"; // TODO: unindent single line on reverse!
		
	} else {
		
		var text = "";
		var length = range.text.length;
		
		while (( range.moveStart ( "word", -1 ) && range.text.charAt ( 1 ) != "\n" ));
		range.moveStart ( "character", 1 );
		
		var count = 0;
				
		var i = 0, line, lines = range.text.split ( "\n" );
		while (( line = lines [ i++ ]) != null ) {
			if ( isReverse ) {
				line = line.replace ( /^(\s)/mg, "" );
				count ++;
			} else {
				line = line.replace ( /^(.)/mg, "\t$1" );
			}
			text += line + ( lines [ i + 1 ] ? "\n" : "" )
		}
		
		range.text = text;
		range.moveStart ( "character", - length );
		if ( isReverse ) {
			range.moveStart ( "character", 2 * lines.length - 2 ); // seems to work...
		}
		range.select ();
	}
}

/**
 * Handle ENTER key.
 */
IEEditorTextBoxBinding.prototype._handleEnterKey = function () {

	var range = this.bindingDocument.selection.createRange ();
	var clone = range.duplicate ();

	while (( clone.moveStart ( "word", -1 ) && clone.text.indexOf ( "\n" ) ==-1 ));
	clone.moveStart ( "character", 1 );
	
	range.text = "\n" + clone.text.match ( /^(\s)*/ )[ 0 ] + "!";
	range.moveStart ( "character", -1 );
	range.select ();
	range.text = "";
	range.select ();
}