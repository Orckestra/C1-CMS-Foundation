SimpleSelectorBinding.prototype = new DataBinding;
SimpleSelectorBinding.prototype.constructor = SimpleSelectorBinding;
SimpleSelectorBinding.superclass = DataBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function SimpleSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SimpleSelectorBinding" ); 
	
	/**
	 * @type {HTMLSelectElement}
	 */
	this._select = null;
	
	/**
	 * @type {boolean}
	 */
	this.isRequired = false;
	
	/**
	 * @type {boolean}
	 */
	this._isValid = true;
	
	/**
	 * @type {int}
	 */
	this._cachewidth = 0;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SimpleSelectorBinding.prototype.toString = function () {

	return "[SimpleSelectorBinding]";
}

/**
 * Find name, then register binding with DocumentManager.
 * @overwrites {Binding#onBindingRegister}
 */
SimpleSelectorBinding.prototype.onBindingRegister = function () {
	
	SimpleSelectorBinding.superclass.onBindingRegister.call ( this );
	
	var name = this.getProperty ( "name" );
	if ( name != null ) {
		this.setName ( name );
	}
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
SimpleSelectorBinding.prototype.onBindingAttach = function () {
	
	SimpleSelectorBinding.superclass.onBindingAttach.call ( this );
	
	this._select = this.getChildElementByLocalName ( "select" );
	var name = this.getName ();
	if ( name != null ) {
		this._select.name = name;
	}
	
	this._parseDOMProperties ();
	this._buildDOMContent ();
}

/**
 * Parse DOM properties.
 */
SimpleSelectorBinding.prototype._parseDOMProperties = function () {
	
	var onchange = this.getProperty ( "onchange" );
	this.isRequired = this.getProperty ( "required" ) == true;
	
	if ( this.hasCallBackID ()) {
		this._select.id = this.getCallBackID ();
	}
	if ( onchange ) {
		this.onValueChange = function () {
			Binding.evaluate ( onchange, this );
		}
	}
}

/**
 * Build DOM content.
 */
SimpleSelectorBinding.prototype._buildDOMContent = function () {
	
	this.bindingElement.tabIndex = 0;
	if ( Client.isExplorer == true ) {
		this.bindingElement.hideFocus = true;
	}
	
	/*
	 * Rig up select element.
	 */
	var self = this;
	this._select.onchange = function () {
		self.onValueChange ();
		self.dirty ();
		if ( !self._isValid ) {
			self.validate ();
		}
	};
	this._select.onfocus = function () {
		self.focus ( true );
	}
	if ( Client.isExplorer ) {
		this._buildDOMContentIE ();
	}
}

/**
 * Build DOM content especial for Internet Explorer.
 */
SimpleSelectorBinding.prototype._buildDOMContentIE = function () {

	if ( Client.isExplorer ) {
	
		/*
		 * Fix height for IE. We are hacking select elements  
		 * to expand when focused, showing long option texts. 
		 * Why should this be nescessary? It boggles the mind.
		 */
		this.bindingElement.style.height = this.bindingElement.offsetHeight + "px";
		this._cachewidth = this._select.offsetWidth;
		this._select.style.position = "absolute";
		
		/*
		 * This stuff must be done on mouseover and mouseout since    
		 * width must not be modified while evaluating focus and blur. 
		 */
		var self = this;
		this._select.onmouseover = function () {
			if ( !self.isFocused ) {
				self._hack ( true );
			}
		}
		
		this._select.onmouseout = function () {
			if ( !self.isFocused ) {
				self._hack ( false );
			}
		}
	}
}

/**
 * Fires when selection changes. Does nothing by default. Feel free 
 * to overwrite. And maybe refactor this methods name some day...
 */
SimpleSelectorBinding.prototype.onValueChange = function () {}

/**
 * Focus.
 * @overloads {DataBinding#focus}
 * @param {boolean} isMouseEvent
 * @implements {IData}
 */
SimpleSelectorBinding.prototype.focus = function ( isMouseEvent ) {
	
	SimpleSelectorBinding.superclass.focus.call ( this );
	
	if ( this.isFocused ) {
		if ( !isMouseEvent ) {
			FocusBinding.focusElement ( this._select );
			if ( Client.isExplorer ) {
				this._hack ( true );
			}
		}
		this.bindingWindow.standardEventHandler.enableNativeKeys ( false );
	}
};

/**
 * Blur.
 * @overloads {DataBinding#focus}
 * @implements {IData}
 */
SimpleSelectorBinding.prototype.blur = function () {
	
	SimpleSelectorBinding.superclass.blur.call ( this );
	
	if ( !this.isFocused ) {
		this._select.blur ();
		this.bindingWindow.standardEventHandler.disableNativeKeys ();
		if ( Client.isExplorer ) {
			this._hack ( false ); 
		}
		if ( this.isRequired ) {
			this.validate ();
		}
	}
};

/**
 * Let's hack!
 * @param {boolean} isHack
 */
SimpleSelectorBinding.prototype._hack = function ( isHack ) {
	
	if ( Client.isExplorer ) {
		this._select.style.width = isHack ? "auto" : this._cachewidth + "px";
		/*
		 * If hack wasn't really nescessary, we hack it right back.
		 */
		if ( isHack ) {
			if ( this._select.offsetWidth <= this._cachewidth ) {
				this._hack ( false );
			}
		}
	}
}

//ABSTRACT METHODS ............................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
SimpleSelectorBinding.prototype.validate = function () {
	
	var isValid = true;
	
	if ( this.isRequired ) {
		if ( this.getValue () == null ) {
			isValid = false;
		}
	}
	if ( isValid != this._isValid ) {
		if ( isValid ) {
			this.detachClassName ( DataBinding.CLASSNAME_INVALID );
		} else {
			this.attachClassName ( DataBinding.CLASSNAME_INVALID );
			
			/*
			 * Only "required" could have brought us here...
			 * Warning: This stuff is pretty hacked up!
			 */
			var select = this._select;
			var option = select.options [ select.selectedIndex ];
			var text = DOMUtil.getTextContent ( option );
			
			select.blur (); 
			select.style.color = "#A40000";
			select.style.fontWeight = "bold";
			if ( !Client.isExplorer6 ) {
				DOMUtil.setTextContent ( option, DataBinding.warnings [ "required" ]);
			}
			
			select.onfocus = function () {
				this.style.color = "black";
				this.style.fontWeight = "normal";
				this.onfocus = null;
				if ( !Client.isExplorer6 ) {
					DOMUtil.setTextContent ( option, text );
				}
			};
		}
		this._isValid = isValid;
	}
	
	return isValid;
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
SimpleSelectorBinding.prototype.manifest = function () {}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
SimpleSelectorBinding.prototype.getValue = function () {
	
	var result = null;
	var select = this._select;
	var option = select.options [ select.selectedIndex ];
	var hasValue = true;
	if ( Client.isExplorer ) { // hasAttribute must be new to IE8. We hack it.
		var html = option.outerHTML.toLowerCase ();
		if ( html.indexOf ( "value=" ) ==-1 ) {
			hasValue = false;
		}
	}
	if ( hasValue ) {
		result = option.getAttribute ( "value" ); // option.value returns the textContent!
	}
	return result;
}

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
SimpleSelectorBinding.prototype.setValue = function ( value ) {}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
SimpleSelectorBinding.prototype.getResult = function () {
	
	return this.getValue ();
}

/**
 * Set result.
 * @implements {IData}
 * @param {object} value
 */
SimpleSelectorBinding.prototype.setResult = function ( value ) {
	
	this.setValue ( value );
}

/**
 * SimpleSelectorBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SimpleSelectorBinding}
 */
SimpleSelectorBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_XHTML, "select", ownerDocument );
	return UserInterface.registerBinding ( element, SimpleSelectorBinding );
}