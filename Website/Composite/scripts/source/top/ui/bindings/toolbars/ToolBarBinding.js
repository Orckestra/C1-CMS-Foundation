ToolBarBinding.prototype = new Binding;
ToolBarBinding.prototype.constructor = ToolBarBinding;
ToolBarBinding.superclass = Binding.prototype;

ToolBarBinding.TYPE_TEXTONLY				= "textonly";
ToolBarBinding.TYPE_IMAGESONLY				= "imagesonly";
ToolBarBinding.TYPE_DEFAULT					= "imagesandtext";
ToolBarBinding.CLASSNAME_TEXTONLY 			= "textonly";
ToolBarBinding.CLASSNAME_IMAGESONLY 		= "imagesonly";
ToolBarBinding.CLASSNAME_IMAGESIZELARGE 	= "imagesizelarge";
ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE    = "imagesizexlarge";
ToolBarBinding.CLASSNAME_ICONSIZE_22        = "icons-s-22";
ToolBarBinding.IMAGESIZE_NORMAL 			= "normal";
ToolBarBinding.IMAGESIZE_LARGE 				= "large";
ToolBarBinding.ICONSIZE_22                  = "icons-s-22";

/**
 * @class
 * TODO: The toolbar is rigged up for quick disabling of images 
 * and text. This feature may be refactored out at some point...
 */
function ToolBarBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.hasImages = true;
	
	/**
	 * @type {boolean}
	 */
	this.hasText = true;
	
	/**
	 * @type {string}
	 */
	this._imageSize = ToolBarBinding.IMAGESIZE_NORMAL;
	
	/**
	 * @type {string}
	 */
	this.type = ToolBarBinding.TYPE_DEFAULT;
	
	/**
	 * Used to impose a default height to the toolbar.
	 * @type {boolean}
	 */
	this._hasDefaultContent = true;
	
	/**
	 * Right-aligned toolbarbody.
	 * @type {ToolBarBodyBinding}
	 * @private
	 */
	this._toolBarBodyRight = null;
	
	/**
	 * Left-aligned toolbarbody.
	 * @type {ToolBarBodyBinding}
	 * @private
	 */
	this._toolBarBodyLeft = null;
	
	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID, FitnessCrawler.ID ]);
	
	/**
	 * Enables us to invoke buildDOMContent already on binding registration. 
	 * This will come in handy when toolbar content is setup for lazy attachment.
	 * @type {boolean}
	 */
	this._hasDOMContent = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ToolBarBinding.prototype.toString = function () {

	return "[ToolBarBinding]";
}

/**
 * Attach classname to clear stylesheet floats.
 */
ToolBarBinding.prototype.onBindingRegister = function () {
	
	ToolBarBinding.superclass.onBindingRegister.call ( this );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
}

/**
 * Initialize layout settings.
 */
ToolBarBinding.prototype.onBindingAttach = function () {
	
	ToolBarBinding.superclass.onBindingAttach.call ( this );
	
	this.parseDOMProperties ();
	this.buildDOMContent ();
	
	this.addMembers (
		this.getChildBindingsByLocalName ( "toolbarbody" )
	);
}

/**
 * Invoked when toolbarbodys initialize. Indexes left and right 
 * toolbarbody. More bodys can be added, but we don't handle them.
 * @param {ToolBarBodyBinding} binding
 */
ToolBarBinding.prototype.onMemberInitialize = function ( binding ) {
	
	/*
	 * The left toolbarbody is the first toolbar encounted NOT righ-taligned.
	 * The right toolbarbody is the first right-aligned toolbar encountered.
	 */
	if ( binding instanceof ToolBarBodyBinding ) {
		if ( binding.isRightAligned ) {
			if ( !this._toolBarBodyRight ) {
				this._toolBarBodyRight = binding;
			}
		} else {
			if ( !this._toolBarBodyLeft ) {
				this._toolBarBodyLeft = binding;
			}
		}
	}
	
	ToolBarBinding.superclass.onMemberInitialize.call ( this, binding );
}

/**
 * Initialize toolbar size and type.
 */
ToolBarBinding.prototype.parseDOMProperties = function () {

	var imagesize = this.getProperty ( "imagesize" );
	var type = this.getProperty ( "type" );
	
	if ( imagesize ) {
		this.setImageSize ( imagesize );
	}
	if ( type ) {
		this.setType ( type );
	} else {
		this.setType ( this.type );
	}
}

/**
 * Build an invisible toolbargroup to set the default toolbar height. This way, 
 * we don't need to specify a fixed toolbar height; we can let toolbarbuttons 
 * padding and margin control the height. Notice that the group is added directly 
 * to the toolbar itself and not to a toolbarbody. This way, the toolbargroup can 
 * be ignored in future code, but it implies that toolbarbodies *should not* affect 
 * the height of the toolbar (they should have no borders, margins and paddings).
 */
ToolBarBinding.prototype.buildDOMContent = function () {
	
	if ( this._hasDefaultContent == true && !this._hasDOMContent ) {
		var groupBinding = ToolBarGroupBinding.newInstance ( this.bindingDocument );
		groupBinding.add ( ToolBarButtonBinding.newInstance ( this.bindingDocument ));
		groupBinding.isDefaultContent = true;
		this.add ( groupBinding );
		groupBinding.attachRecursive ();
		this._hasDOMContent = true;
		
	}
}

/**
 * A special classname "max" will maximize a toolbargroups width.
 * @implements {IFlexible}
 */
ToolBarBinding.prototype.flex = function () {
	
	var left = this._toolBarBodyLeft;
	var right = this._toolBarBodyRight;
	
	if ( left != null && left.hasClassName ( "max" )) {
		this._maxToolBarGroup ( left, right );
	}
	
	if ( right != null && right.hasClassName ( "max" )) {
		this._maxToolBarGroup ( right, left );
	}
}

/**
 * This is pretty hacked...
 * @param {ToolBarGroupBinding} max
 * @param {ToolBarGroupBinding} other
 */
ToolBarBinding.prototype._maxToolBarGroup = function ( max, other ) {
	
	var width = this.boxObject.getDimension ().w;
	var padding = CSSComputer.getPadding ( this.bindingElement );
	width -= ( padding.left + padding.right );
	if ( other != null ) {
		width -= other.boxObject.getDimension ().w;
		if ( !Client.isWindows ) {
			width -= 1; // eh!
		}
		if ( Client.isExplorer ) {
			width -= 15; // // eeeeeeeeeeeeeeeeeeh!
		}
	}
	
	max.bindingElement.style.width = width + "px";
}

/**
 * Handy fetch toolbargroup by index.
 * @param {int} index 
 * @return {ToolBarGroupBinding}
 */
ToolBarBinding.prototype.getToolBarGroupByIndex = function ( index ) {
	
	return this.getDescendantBindingsByLocalName ( "toolbargroup" ).get ( index );
}

/**
 * Add toolbargroup left-aligned.
 * @param {Binding} binding
 * @param {boolean} isBulkAdd Minimize css engine work
 * @return {Binding}
 */
ToolBarBinding.prototype.addLeft = function ( binding, isBulkAdd ) {

	var returnable = null;
	if ( this._toolBarBodyLeft != null ) {
		returnable = this._toolBarBodyLeft.add ( binding, isBulkAdd );
	} else {
		throw new Error ( "No left toolbarbody" );
	}
	return returnable;
}

/**
 * Add toolbargroup left-aligned first.
 * @param {Binding} binding
 * @param {boolean} isBulkAdd
 * @return {Binding}
 */
ToolBarBinding.prototype.addLeftFirst = function ( binding, isBulkAdd ) {

	var returnable = null;
	if ( this._toolBarBodyLeft ) {
		returnable = this._toolBarBodyLeft.addFirst ( binding, isBulkAdd );
	} else {
		throw new Error ( "No left toolbarbody" );
	}
	return returnable;
}

/**
 * Add toolbargroup right-aligned.
 */
ToolBarBinding.prototype.addRight = function ( binding ) {

	var returnable = null;
	if ( this._toolBarBodyRight ) {
		returnable = this._toolBarBodyRight.add ( binding );
	} else {
		throw new Error ( "No left toolbarbody" );
	}
	return returnable;
}

/**
 * Please dispose toolbar content with this method, taking care not to dispose toolbarbodies.
 */
ToolBarBinding.prototype.empty = function () {

	this.emptyLeft ();
	this.emptyRight ();
}

/**
 * Dispose left-aligned toolbar content.
 */
ToolBarBinding.prototype.emptyLeft = function () {

	if ( this._toolBarBodyLeft ) {
 		this._toolBarBodyLeft.empty ();
	}
}

/**
 * Dispose right-aligned toolbar content.
 */
ToolBarBinding.prototype.emptyRight = function () {

	if ( this._toolBarBodyRight ) {
 		this._toolBarBodyRight.empty ();
	}
}

/** 
 * Set image size.
 * @param {string} size
 */
ToolBarBinding.prototype.setImageSize = function ( size ) {

	switch ( size ) {
		case ToolBarBinding.IMAGESIZE_LARGE :
			this.attachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZELARGE );
			this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE );
			break;
		case ToolBarBinding.IMAGESIZE_XLARGE :
			this.attachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE );
			this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZELARGE );
			break;
	    case ToolBarBinding.ICONSIZE_22:
	        this.attachClassName(ToolBarBinding.CLASSNAME_ICONSIZE_22);
	        break;
		default :
			this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZELARGE );
			this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE );
			break;
	}
	this._imageSize = size;
	this.setProperty ( "imagesize", size );
}

/**
 * @return {string}
 */
ToolBarBinding.prototype.getImageSize = function () {
	
	return this._imageSize;
}

/** 
 * Show images only. Constructed so that you can't disable both images and text.
 */
ToolBarBinding.prototype.showImagesOnly = function () {
	
	this.detachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
	this.attachClassName ( ToolBarBinding.CLASSNAME_IMAGESONLY );
	this.hasImages = true;
	this.hasText = false;
}

/**
 * Show text only.
 */
ToolBarBinding.prototype.showTextOnly = function () {
	
	this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESONLY );
	this.attachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
	this.hasImages = false;
	this.hasText = true;
}

/**
 * Show both images and text.
 */
ToolBarBinding.prototype.showBoth = function () {
	
	this.detachClassName ( ToolBarBinding.CLASSNAME_IMAGESONLY );
	this.detachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
	this.hasImages = true;
	this.hasText = true;
}

/**
 * Set type.
 * @param {string} type 
 */
ToolBarBinding.prototype.setType = function ( type ) {
	
	switch ( type ) {
		case ToolBarBinding.TYPE_TEXTONLY :
			this.showTextOnly ();
			break;
		case ToolBarBinding.TYPE_IMAGESONLY :
			this.showImagesOnly ();
			break;
		default :
			this.showBoth ();
			break
	}
	this.setProperty ( "type", type );
}

/**
 * ToolBarBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarBinding}
 */
ToolBarBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbar", ownerDocument );
	return UserInterface.registerBinding ( element, ToolBarBinding );
}