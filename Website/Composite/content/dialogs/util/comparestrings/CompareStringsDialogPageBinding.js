CompareStringsDialogPageBinding.prototype = new DialogPageBinding;
CompareStringsDialogPageBinding.prototype.constructor = CompareStringsDialogPageBinding;
CompareStringsDialogPageBinding.superclass = DialogPageBinding.prototype;

CompareStringsDialogPageBinding.URL_CONTENT = "comparestringscontent.html";

/**
 * @class
 * @implements {IData}
 */
function CompareStringsDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CompareStringsDialogPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._newval = null;
	
	/**
	 * @type {string}
	 */
	this._oldval = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
CompareStringsDialogPageBinding.prototype.toString = function () {

	return "[CompareStringsDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBindingAttach}
 */
CompareStringsDialogPageBinding.prototype.onBindingAttach = function () {
	
	CompareStringsDialogPageBinding.superclass.onBindingAttach.call ( this );
	
	/*
	 * Setup to inject iframe as soon as it is loaded. 
	 * Also disabling the contextmenu...
	 */
	var self = this;
	bindingMap.win.addActionListener ( WindowBinding.ACTION_ONLOAD, {
		handleAction : function ( action ) {
			var url = action.target.getURL ();
			if ( url == CompareStringsDialogPageBinding.URL_CONTENT ) {
				self._compare ();
				DOMEvents.addEventListener (
					action.target.getContentDocument (),
					DOMEvents.CONTEXTMENU, {
						handleEvent : function ( e ) {
							DOMEvents.preventDefault ( e );
						}
					}
				);
			}
			action.consume ();
		}
	});
}

/**
 * Store page arguments.
 */
CompareStringsDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	CompareStringsDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this._string1 = arg.string1;
	this._string2 = arg.string2;
}

/**
 * Compare!
 */
CompareStringsDialogPageBinding.prototype._compare = function () {
	
	var string1 = this._string1;
	var string2 = this._string2;
	
	/*
	 * Conjure up the DiffService.
	 */
	if ( top.DiffService == null ) {
		top.DiffService	= WebServiceProxy.createProxy ( Constants.URL_WSDL_DIFFSERVICE );
	}
	
	/*
	 * Summon diff result and inject to iframe.
	 */
	var doc = bindingMap.win.getContentDocument ();
	var markup = null;
	
	if ( string1 != null && string2 != null ) {
		markup = this._getMarkup ( 
			new List (
				top.DiffService.GetDifference ( string1, string2, "\n" )
			)
		);
	} else if ( string1 == null || string2 == null ) {
		markup = this._getSpecialMarkup ( string1, string2 );
	} else { 	
		markup = "<p style=\"color:red;\">Nothing to compare!</p>";
	}
	
	if ( markup != null ) {
		doc.body.innerHTML = markup;
	}
}

/**
 * Build markup for a real diff-comparison.
 * @param {List<object>} diffs
 */
CompareStringsDialogPageBinding.prototype._getMarkup = function ( diffs ) {

	var markup = "<pre>";
	var linecount = 0;
	var self = this;
	
	diffs.each ( function ( diff ) {
		
		markup += "<span class=\"type" + String ( diff.DiffType ) + "\" ";
		switch ( diff.DiffType ) {
			case 1 :
				markup += "title=\"This text was DELETED between two versions\" ";
				break;
			case 2 :
				markup += "title=\"This text was ADDED between two versions\" ";
				break;
		}
		markup += ">";
		var lines = new List ( diff.Lines );
		lines.each ( function ( line ) {
			if ( line != null ) {
				markup += self._encode ( line ) + "<br/>";
			}
		});
		markup += "</span>";
	});
	
	markup += "</pre>";
	return markup;
}

/**
 * When one string is null.
 * @param {string} string1
 * @param {string} string2
 * @return
 */
CompareStringsDialogPageBinding.prototype._getSpecialMarkup = function ( string1, string2 ) {
	
	var classname = string1 == null ? "type2" : "type1";
	markup = "<pre><span class=\"" + classname + "\">";
	
	var self = this;
	var string = string1 == null ? string2 : string1;
	var lines = new List ( string.split ( "\n" ));
	lines.each ( function ( line ) {
		markup += self._encode ( line ) + "<br/>";
	});
	markup += "</span></pre>";
	return markup;
}

/**
 * HTML-encode line. And some other tricks.
 * @param {string} line
 * @return {string}
 */
CompareStringsDialogPageBinding.prototype._encode = function ( line ) {
	
	line = line.replace ( /&/g, "&amp;" );
	line = line.replace ( /\"/g, "&quot;" );
	line = line.replace ( /</g, "&lt;" );
	line = line.replace ( />/g, "&gt;" );
	
	/*
	 * Note that we boldly assume all TABS to be 
	 * locating in the leading section of the line.
	 */
	var index = line.lastIndexOf ( "\t" );
	if ( index >-1 ) {
		line = line.substring ( 0, index ) + "<em>" + line.substring ( index + 1, line.length ) + "</em>";
		line = line.replace ( /\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;" );
	} else {
		line = "<em>" + line + "</em>";
	}
	
	return line;
}