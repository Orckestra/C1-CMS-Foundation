/**
 * @type {Element}
 */
Format.element = null;

/**
 * @param {Element} element
 * @param {String} name
 * @returns {object}
 */
Format.get = function ( name ) {
	
	var result = null;
	var value = Format.element.getAttribute ( name );
	if ( value != null ) {
		result = Types.castFromString ( value );
	}
	return result;
}

/**
 * @type {List<Format>}
 */
Format.instances = new List ();

/**
 * The active TinyMCE element.
 * @type {Element}
 */
Format._tinyElement = null;

/**
 * Tracking the active TinyMCE element.
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {Element} element
 */
Format.handleNodeChange = function ( element ) {
	
	this._tinyElement = element;
}

/**
 * Configure TinyMCE instance.
 * @type {tinymce.Editor} tinyInstance
 */
Format.configure = function ( tinyInstance ) {
	
	Format.instances.each ( function ( format ) {
		tinyInstance.addQueryStateHandler ( format.id, function () {
			return Format.test ( format, tinyInstance );
		}, this );
	});
}

/**
 * Implement a test for TinyMCE "queryCommandState" action.
 * @param {Format} format
 * @param {tinymce.Editor} tinyInstance
 * @returns {boolean}
 */
Format.test = function ( format, tinyInstance ) {
	
	var result = false;
	
	var tag = null;
	var props = format.props;
	var element = Format._tinyElement;
	
	tag = props.block ? props.block : props.inline;
	if ( tag === undefined || element.nodeName.toLowerCase () == tag ) {
		var classes = props.classes;
		if ( props.classes !== undefined ) {
			var classes = new String ( props.classes );
			var res = true;
			new List ( classes.split ( " " )).each ( function ( c ) {
				if ( !CSSUtil.hasClassName ( element, c )) {
					res = false;
				}
				return res;
			});
			result = res;
		} else {
			result = true;
		}
	}
	
	return result;
}


//.......................................................................

/**
 * @param {Element} element
 * @returns {Format}
 */
function Format ( element ) {
	
	Format.instances.add ( this );
	this._construct ( element );
}

Format.prototype = {

	/**
	 * @type {String}
	 */
	id : null,
	
	/**
	 * Label.
	 * @type {String}
	 */
	label : null,
	
	/**
	 * Image.
	 * @type {String}
	 */
	image : null,
	
	/**
	 * Notes.
	 * @type {String}
	 */
	notes : null,
	
	/**
	 * Notes.
	 * @type {String}
	 */
	isRadio : null,
	
	/**
	 * Button config.
	 * @type {boolean}
	 */
	button : null,
	
	/**
	 * Select config.
	 * @type {boolean}
	 */
	select : null,
	
	/**
	 * Configures TinyMCE.
	 * @type {object}
	 */
	props : null,
	
	/**
	 * @type {number}
	 */
	priority : 0,
	
	/**
	 * Constructor action.
	 * @param {Element} element
	 */
	_construct : function ( element ) {
	
		Format.element = element;
	
		// basic properties
		this.id = Format.get ( "id" );
		this.label = Format.get ( "label" ); 
		this.image = Format.get ( "image" );
		this.notes = Format.get ( "notes" );
		
		// priroty (defaults to zero).
		var priority = Format.get ( "priority" );
		if ( priority != null ) {
			this.priority = priority; 
		}
		
		// is radio button?
		this.isRadio = element.parentNode.nodeName.toLowerCase () == "radiogroup";
		
		// build TinyMCE configuration object.
		this._propify ();
		
		// buttons and menuitems
		this._extras ( element );
	},
	
	/**
	 * Parse format properties.
	 */
	_propify : function () {
		
		this.props = {
			inline		: Format.get ( "inline" ),
			block 		: Format.get ( "block" ),
			classes 	: Format.get ( "classes" ), 
			selector 	: Format.get ( "selector" ),
			wrapper		: Format.get ( "wrapper" ),
		};
		
		// primitive validation
		if ( this.props.block != null && this.props.inline != null ) {
			var cry = "Conflicting format attributes: block, inline (#" + this.id + ")";
			if ( Application.isDeveloperMode ) {
				alert ( cry );
			}
			throw cry;
		}
		
		// wipe empty props
		for ( var prop in this.props ) {
			if ( this.props [ prop ] == null ) {
				delete this.props [ prop ];
			}
		}
	},
	
	/**
	 * Extract button and select configuration.
	 * @param {Element} element
	 */
	_extras : function ( element ) {
		
		var button = element.getElementsByTagName ( "button" ).item ( 0 );
		var select = element.getElementsByTagName ( "select" ).item ( 0 );
		
		if ( button != null ) {
			Format.element = button;
			var label = Format.get ( "label" );
			var image = Format.get ( "image" );
			var notes = Format.get ( "notes" );
			this.button = {
				label : label != null ? label : this.label,
				image : image != null ? image : this.image,
				notes : notes != null ? notes : this.notes
			}
		}
		
		if ( select != null ) {
			Format.element = select;
			var label = Format.get ( "label" );
			var image = Format.get ( "image" );
			var notes = Format.get ( "notes" );
			this.select = {
				label : label != null ? label : this.label,
				image : image != null ? image : this.image,
				notes : notes != null ? notes : this.notes
			}
		}
	}
};