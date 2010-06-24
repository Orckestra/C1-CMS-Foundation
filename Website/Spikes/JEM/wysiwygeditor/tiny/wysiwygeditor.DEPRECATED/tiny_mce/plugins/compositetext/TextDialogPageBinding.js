TextDialogPageBinding.prototype = new DialogPageBinding;
TextDialogPageBinding.prototype.constructor = TextDialogPageBinding;
TextDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function TextDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TextDialogPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._defaulttext = null;
}

/**
 * Identifies binding.
 */
TextDialogPageBinding.prototype.toString = function () {
	
	return "[TextDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
TextDialogPageBinding.prototype.onBeforePageInitialize = function () {

	this._defaulttext = this.bindingWindow.bindingMap.text.getResult ();
	TextDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Cleanup editor content and assing to dialogpage as result.
 * @overloads {DialogPageBinding#onDialogAccept}
 */
TextDialogPageBinding.prototype.onDialogAccept = function () {
	
	var text = this.bindingWindow.bindingMap.text.getResult ();
	if ( text != this._defaulttext ) {
		
		var result = "";
		var BULLET = "* ";
		var lines = new List ( text.split ( "\n" ));
		
		lines.each ( function ( line ) {
			line = line.replace( /\s+/, "" ); // remove leading whitespace
			if ( line.length >= 2 && line.substring ( 0, 2 ) == BULLET ) { // ditch bullets
				line = line.substring ( 2, line.length );
			}
			result += "<p>" + line + "</p>\n";
		});
		
		this.result = result;
	}
	
	TextDialogPageBinding.superclass.onDialogAccept.call ( this );
}