LabelBinding.prototype = new Binding;
LabelBinding.prototype.constructor = LabelBinding;
LabelBinding.superclass = Binding.prototype;

/*
 * Can be used to indicate that a dialog window will 
 * open. Looks more elegant than three regular dots.
 */
LabelBinding.DIALOG_INDECATOR_SUFFIX = String.fromCharCode ( 8230 ); // "…".charCodeAt ( 0 );
LabelBinding.DEFAULT_IMAGE = "${root}/images/blank.png";
LabelBinding.EXPLORER_IMAGE_FILTER = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${url}',sizingMethod='crop');"
LabelBinding.CLASSNAME_GRAYTEXT = "graytext";
LabelBinding.CLASSNAME_FLIPPED = "flipped";

/**
 * @class
 */
function LabelBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LabelBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.hasImage = false;

	/**
	 * @type {boolean}
	 */
	this.hasLabel = false;

	/**
	 * Image and text position reversed?
	 * @type {boolean}
	 */
	this.isFlipped = false;
	
	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/** 
 * Identifies binding.
 */
LabelBinding.prototype.toString = function () {

	return "[LabelBinding]";
}


/** 
 * Can't remember why we need to build DOM content in the registration phase...
 * @overloads {Binding#onBindingRegister}
 */
LabelBinding.prototype.onBindingRegister = function () {
	
	LabelBinding.superclass.onBindingRegister.call ( this );
	
	if ( this.isBindingBuild ) {
		this.shadowTree.labelBody = this._getBuildElement ( "labelbody" );
	} else {
		this.shadowTree.labelBody = DOMUtil.createElementNS ( 
			Constants.NS_UI, "ui:labelbody", this.bindingDocument 
		);
		this.bindingElement.appendChild ( this.shadowTree.labelBody );
	}
}

/** 
 * @overloads {Binding#onBindingAttach}
 */
LabelBinding.prototype.onBindingAttach = function () {
	
	LabelBinding.superclass.onBindingAttach.call ( this );
	
	if ( this.isBindingBuild ) {
		var element = this._getBuildElement ( "labeltext" );
		if ( element ) {
			this.shadowTree.labelText = element;
			this.shadowTree.text = element.firstChild;
			this.hasLabel = true;
		}
	} else {
		
		var label = this.getProperty ( "label" );
		var image = this.getProperty ( "image" );
		var tooltip = this.getProperty ( "tooltip" );
		
		if ( label ) {
			this.setLabel ( label, false );
		}
		if ( image ) {
			this.setImage ( image, false );
		}
		if ( tooltip ) {
			this.setToolTip ( tooltip );
		}
		this.buildClassName ();
	}
}

/**
 * @param {string} label
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
LabelBinding.prototype.setLabel = function ( label, isNotBuildingClassName ) {

	label = label != null ? label : "";
	
	if ( !this.hasLabel ) {
		this.buildLabel ();
	}
	this.shadowTree.text.data = Resolver.resolve ( label );
	this.setProperty ( "label", label );
	if ( !isNotBuildingClassName ) {
		this.buildClassName ();
	}
}

/**
 * @return {string}
 */
LabelBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}

/**
 * Set image.
 * @param {string} url Eh - this could be a boolean!
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
LabelBinding.prototype.setImage = function ( url, isNotBuildingClassName ) {
	
	if ( url != false ) {
		url = url ? url : LabelBinding.DEFAULT_IMAGE;
		var resolverUrl = Resolver.resolve(url);
		if (resolverUrl.classes) {
			this.setAlphaTransparentBackdrop(false);
			this.setImageClasses(resolverUrl.classes);
		}
		else {
			this.setImageClasses();
			this.setAlphaTransparentBackdrop(
				resolverUrl
			);
		}
		this.setProperty ( "image", url );
		this.hasImage = true;
		if ( !isNotBuildingClassName ) {
			this.buildClassName ();
		}
	} else {
		this.setAlphaTransparentBackdrop(false);
		this.setImageClasses();
		this.deleteProperty ( "image" );
		this.hasImage = false;
		this.buildClassName ();
	}
}

/**
 * Set image class.
 * @param {string} url
 */
LabelBinding.prototype.setImageClasses = function (classes) {

	if (this.shadowTree.labelBody) {
		if (!classes) {
			if (this.shadowTree.icon) {
				this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
				this.shadowTree.icon = null;
			}
		} else {
			if (!this.shadowTree.icon) {
				this.shadowTree.icon = DOMUtil.createElementNS(
					Constants.NS_UI, "ui:icon", this.bindingDocument
				);

				this.shadowTree.labelBody.insertBefore(this.shadowTree.icon, this.shadowTree.labelBody.firstChild);
			}
			this.shadowTree.icon.className = classes;
		}
	}
}


/**
 * Set image.
 * @param {string} url
 */
LabelBinding.prototype.setDefaultImage = function ( url ) {
	
	this.setImage ( LabelBinding.DEFAULT_IMAGE );
}

/**
 * Attaches a background-image to the labelbody 
 * element, supporting 24bit alphatransparency.
 * @param {string} url
 */
LabelBinding.prototype.setAlphaTransparentBackdrop = function ( url ) {
	
	if ( this.shadowTree.labelBody ) { // sometimes it glitches in moz...
		if ( url != false ) {
			url = Resolver.resolve ( url );
			if ( Client.isExplorer6 ) {
				this.shadowTree.labelBody.style.filter = LabelBinding.EXPLORER_IMAGE_FILTER.replace ( "${url}", url );
			} else {
				this.shadowTree.labelBody.style.backgroundImage = "url('" + url + "')";
			}
		} else {
			if ( Client.isExplorer6 ) {
				this.shadowTree.labelBody.style.filter = "none";
			} else {
				this.shadowTree.labelBody.style.backgroundImage = "none";
			}
		}
	}
}

/**
 * @return {string}
 */
LabelBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}

/**
 * For some reason, setting tooltip on the label may not work reliably 
 * in Explorer. Always check the result if you use this method.
 * @param {string} tooltip
 */
LabelBinding.prototype.setToolTip = function ( tooltip ) {
	
	this.setProperty ( "tooltip", tooltip );
	
	/*
	 * Some guy keeps setting tooltips equal to the labels of things. 
	 * If a tooltip has nothing new to say, it's better not to show it,  
	 * since the tooltip may obscure the view while navigating trees etc. 
	 * TODO: fix that guy instead!
	 */
	if ( tooltip != this.getLabel ()) {
		this.setProperty ( "title", Resolver.resolve ( tooltip ));
	}
}

/**
 * @return {string}
 */
LabelBinding.prototype.getToolTip = function ( tooltip ) {

	return this.getProperty ( "tooltip" );
}

/**
 * Flip image and text position. This is not supported in IE6.
 * @param @optional {boolean} isFlipped.
 */
LabelBinding.prototype.flip = function ( isFlipped ) {
	
	isFlipped = isFlipped == null ? true : isFlipped; 
	var classname = LabelBinding.CLASSNAME_FLIPPED;
	
	if ( !Client.isExplorer6 ) {
		this.isFlipped = isFlipped;
		if ( isFlipped ) {
			this.attachClassName ( classname );
		} else {
			this.detachClassName ( classname );
		}
	}
}

/**
 * Build the various label elements: A "labelbody" element 
 * containing a "labeltext" element containing a textnode. 
 * These extra elements will come in handy for CSS purposes.
 */
LabelBinding.prototype.buildLabel = function () {
	
	if ( !this.hasLabel ) {
		this.shadowTree.labelText = DOMUtil.createElementNS ( 
			Constants.NS_UI, "ui:labeltext", this.bindingDocument 
		);
		this.shadowTree.text = this.bindingDocument.createTextNode ( "" );
		this.shadowTree.labelText.appendChild ( this.shadowTree.text );
		this.shadowTree.labelBody.appendChild ( this.shadowTree.labelText );
		this.hasLabel = true;
	}
}

/**
 * Builds the CSS classname, taking care to preserve externally applied classnames.
 */
LabelBinding.prototype.buildClassName = function () {
	
	var class1 = "textonly";
	var class2 = "imageonly";
	var class3 = "both";
	
	if ( this.hasLabel && this.hasImage ) {
		this.detachClassName ( class1 );	
		this.detachClassName ( class2 );	
		this.attachClassName ( class3 );
	} else if ( this.hasLabel ) {
		this.detachClassName ( class3 );	
		this.detachClassName ( class2 );	
		this.attachClassName ( class1 );
	} else if ( this.hasImage ) {
		this.detachClassName ( class3 );	
		this.detachClassName ( class1 );	
		this.attachClassName ( class2 );
	}
}

/**
 * LabelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {LabelBinding}
 */
LabelBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:labelbox", ownerDocument );
	return UserInterface.registerBinding ( element, LabelBinding );
}