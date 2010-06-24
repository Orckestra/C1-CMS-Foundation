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
 * @implements {IActionListener}
 * @overloads {DialogPageBinding#handleAction}
 * @param {Action} action
 */
TextDialogPageBinding.prototype.handleAction = function ( action ) {
	
	TextDialogPageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case Binding.ACTION_DIRTY :
			bindingMap.buttonAccept.enable ();
			bindingMap.buttonAccept.focus ();
			break;
	}
}

/**
 * Cleanup editor content and assing to dialogpage as result.
 * @overwrites {DialogPageBinding#onDialogAccept}
 */
TextDialogPageBinding.prototype.onDialogAccept = function () {
	
	var text = this.bindingWindow.bindingMap.text.getResult ();
	if ( text != this._defaulttext ) {
		
		var result = "";
		var BULLET = "* ";
		var lines = new List ( text.split ( "\n" ));
		
		lines.each ( function ( line ) {
			
			// remove leading whitespace
			line = line.replace( /^(\s)*/, "" );
			
			// allow paste of HTML stuff (move this somewhere else?)
			line = line.replace( /\&/, "&amp;" );
			line = line.replace( /\</, "&lt;" );
			line = line.replace( /\>/, "&gt;" );
			line = line.replace( /\"/, "&quot;" );

			// ditch bullets
			if ( line.length >= 2 && line.substring ( 0, 2 ) == BULLET ) {
				line = line.substring ( 2, line.length );
			}
			
			// wrap in paragraph...
			if ( line.length > 0 ) {
				result += "<p>" + line + "</p>\n";
			}
		});
		
		this.result = result;
	} else {
		this.result = null;
	}
	
	this.onDialogResponse ();
}