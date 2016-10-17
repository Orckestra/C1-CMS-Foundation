DataInputBinding.prototype = new DataBinding;
DataInputBinding.prototype.constructor = DataInputBinding;
DataInputBinding.superclass = DataBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function DataInputBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DataInputBinding" );

	/**
	 * @type {string}
	 */
	this.type = null;

	/**
	 * @type {boolean}
	 */
	this.isRequired = false;

	/**
	 * @type {RegExp}
	 */
	this.expression = null;

	/**
	 * @type {boolean}
	 */
	this.isPassword = false;

	/**
	 * Used to cache value while displaying error messages.
	 * @type {string}
	 */
	this._value = null;

	/**
	 * @type {boolean}
	 */
	this._isValid = true;

	/**
	 * When invalid, this property flags whether or not _testDirty
	 * we are invalid because we are "required". Not to
	 * be confused with isRequired.
	 * @type {boolean}
	 */
	this._isInvalidBecauseRequired = false;

	/**
	 * True when invalid because of minlength.
	 * @type {boolean}
	 */
	this._isInvalidBecauseMinLength == true;

	/**
	 * True when invalid because of minlength.
	 * @type {boolean}
	 */
	this._isInvalidBecauseMinLength == true;

	/**
	 * True when invalid because of maxlength.
	 * @type {boolean}
	 */
	this._isInvalidBecauseMaxLength == true;

	/**
	 * @type {object}
	 */
	this._sessionResult = null;

	/**
	 * @type {boolean}
	 */
	this.isDisabled = false;

	/**
	 * @type {boolean}
	 */
	this.isReadOnly = false;

	/**
	 * @type {function}
	 */
	this._dirtyinterval = null;

	/**
	 * @type {boolean}
	 */
	this._isAutoSelect = false;

	/**
	 * @type {integer}
	 */
	this.minlength = null;

	/**
	 * @type {integer}
	 */
	this.maxlength = null;

	/**
	 * Is autopostback?
	 * @type {boolean}
	 */
	this._isAutoPost = false;

	/**
	 * Autopost timeout.
	 * @type {function}
	 */
	this._timeout = null;

	/**
	 * Autopost time (start when idle, reset onkeydown).
	 * @type {int}
	 */
	this._time = 1500;

	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters = new List([DocumentCrawler.ID, FocusCrawler.ID]);


	/**
	* Enable spellcheck?
	* @type {boolean}
	*/
	this.spellcheck = true;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DataInputBinding.prototype.toString = function () {

	return "[DataInputBinding]";
}

/**
 * @overloads {DataBinding#onBindingRegister}
 */
DataInputBinding.prototype.onBindingRegister = function () {

	DataInputBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "value" ] = this.setValue;
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
DataInputBinding.prototype.onBindingAttach = function () {

	DataInputBinding.superclass.onBindingAttach.call ( this );

	this._parseDOMProperties ();
	this._buildDOMContent ();
	this._attachDOMEvents ();
}

/**
 * Disposing an invalid DataInputBinding will automatically
 * make it valid in the greater scheme of this.
 * @overloads {Binding#onBindingDispose}
 */
DataInputBinding.prototype.onBindingDispose = function () {

	DataInputBinding.superclass.onBindingDispose.call ( this );

	//if ( Client.isExplorer && this.isFocused ) {
	//	this.unsubscribe ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, this );
	//}
	if ( this._dirtyinterval ) {
		window.clearInterval ( this._dirtyinterval );
	}
	if ( !this._isValid ) {
		this.dispatchAction ( Binding.ACTION_VALID );
	}
}

/**
 * Parse DOM properties.
 */
DataInputBinding.prototype._parseDOMProperties = function () {

	this.type = this.getProperty("type");
	this.isRequired = this.getProperty("required");
	this.isPassword = this.getProperty("password") == true;
	this.minlength = this.getProperty("minlength");
	this.maxlength = this.getProperty("maxlength");
	this._isAutoPost = this.getProperty("autopost") == true;
	this.spellcheck = this.getProperty("spellcheck") !== false;
	if (this.type == "programmingidentifier") this.spellcheck = false;
	if (this.type == "programmingnamespace") this.spellcheck = false;

	/*
	* Regular expression?
	*/
	var regexrule = this.getProperty("regexrule");
	if (regexrule != null) {
		this.expression = new RegExp(regexrule)
	}

	/*
	* Here's a quick hack - we should probably formalize this.
	*/
	var onblur = this.getProperty("onbindingblur");
	if (onblur != null) {
		this.onblur = function () {
			Binding.evaluate(onblur, this);
		};
	}

	/*
	* Here's another quick hack.
	*/
	var onvaluechange = this.getProperty("onvaluechange");
	if (onvaluechange != null) {
		this.onValueChange = function () {
			Binding.evaluate(onvaluechange, this);
		};
	}

	/*
	* Certain types should present a default error (balloon). Specifying
	* the error *directly* on the binding will overwrite the default error.
	*/
	if (this.error == null && this.type != null) {
		var error = DataBinding.errors[this.type];
		if (error != null) {
			this.error = error;
		}
	}
}

/**
 * Build DOM content.
 */
DataInputBinding.prototype._buildDOMContent = function () {

	this.shadowTree.input = this._getInputElement();
	this.shadowTree.box = DOMUtil.createElementNS(Constants.NS_UI, "ui:box", this.bindingDocument);

	if (Client.isExplorer == true) {
		this.bindingElement.hideFocus = true;
	}

	var value = this.getProperty("value");
	if (value != null) {
		this.setValue(String(value));
	}

	var name = this.getProperty("name");
	if (name != null) {
		this.setName(name);
	}

	var isDisabled = this.getProperty("isdisabled");
	if (isDisabled == true) {
		this.setDisabled(true);
	}

	var isReadOnly = this.getProperty("readonly");
	if (isReadOnly == true) {
		this.setReadOnly(true);
	}

	var isAutoSelect = this.getProperty("autoselect");
	if (isAutoSelect == true) {
		this._isAutoSelect = true;
	}

	this.shadowTree.box.appendChild(
		this.shadowTree.input
	);

	this.bindingElement.appendChild(
		this.shadowTree.box
	);

	var placeholder = this.getProperty("placeholder");
	if (placeholder) {
		this.shadowTree.input.setAttribute("placeholder", Resolver.resolve ( placeholder ));
	}

	if (this.spellcheck && Client.hasSpellcheck) {
		var currentLang = Localization.currentLang();
		if (currentLang != null) {
			this.shadowTree.input.setAttribute("spellcheck", "true");
			this.shadowTree.input.setAttribute("lang", Localization.currentLang());
		} else {
			this.shadowTree.input.setAttribute("spellcheck", "false");
		}
	}
	else {
		this.shadowTree.input.setAttribute("spellcheck", "false");
	}

	if (Localization.isRtl !== Localization.isUIRtl)
	{
		this.shadowTree.input.setAttribute("dir", Localization.isRtl?"rtl":"ltr");
	}
	/*
	* Setup ASP.NET identity.
	*/
	if (this.hasCallBackID()) {
		// Binding.dotnetify not needed - we already have an input element!
	} else if (this._isAutoPost) {
		this.logger.warn("Autopost " + this.toString() + " without a callbackid?");
	}
}

/**
 * Get input element! Isolated for subclasses to overwrite.
 * @return {HTMLInputElement}
 */
DataInputBinding.prototype._getInputElement = function () {

	var element = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", this.bindingDocument );
	element.type = this.isPassword == true ? "password" : "text";
	element.tabIndex = -1;
	return element;
}

/**
 * Attach DOM events.
 */
DataInputBinding.prototype._attachDOMEvents = function () {

	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.FOCUS, this );
	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.BLUR, this );
	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.KEYDOWN, this );
	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.KEYPRESS, this );

	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.DRAGOVER, this);
	DOMEvents.addEventListener ( this.shadowTree.input, DOMEvents.DROP, this );

}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {Event} e
 */
DataInputBinding.prototype.handleEvent = function (e) {

	DataInputBinding.superclass.handleEvent.call(this, e);

	if (this.isFocusable == true) {
		switch (e.type) {
			case DOMEvents.DRAGOVER:
				// the dragover event needs to be canceled to allow firing the drop event
				DOMEvents.preventDefault(e);
				break;
			case DOMEvents.DROP:
				if (e.dataTransfer) {
					this.setValue(e.dataTransfer.getData("Text"));
					this.checkDirty();
					this.validate(true);
				}
				DOMEvents.preventDefault(e);
				break;
			case DOMEvents.FOCUS:
			case DOMEvents.BLUR:
				this._handleFocusAndBlur(e.type == DOMEvents.FOCUS);
				break;

			case DOMEvents.KEYPRESS:
				switch (e.keyCode) {
					case KeyEventCodes.VK_BACK:
					case KeyEventCodes.VK_INSERT:
					case KeyEventCodes.VK_DELETE:
						this._testDirty();
						break;
				}
				break;

			case DOMEvents.KEYDOWN:

				this._testDirty();

				switch (e.keyCode) {

					/*
					* Prevent ENTER from submitting containing form.
					*/
					case KeyEventCodes.VK_ENTER:
						this._handleEnterKey(e);
						break;

					/*
					* Prevent ESC from reverting new value to original
					* value (we create input with JS, so our original
					* is empty). This behavior is seen in Explorer only.
					*/
					case KeyEventCodes.VK_ESCAPE:
						DOMEvents.preventDefault(e);
						break;
				}

				/*
				* Autopost stuff.
				*/
				if (this.isFocusable && this._isAutoPost) {
					if (this._timeout != null) {
						top.window.clearTimeout(this._timeout);
					}
					var self = this;
					this._timeout = top.window.setTimeout(function () {
						if (Binding.exists(self)) {
							self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
						}
					}, this._time);
				}

				break;
		}
	}
}

/**
 * Handle DOM focus and blur.
 * @param {boolean} isFocus
 */
DataInputBinding.prototype._handleFocusAndBlur = function ( isFocus ) {

	if ( isFocus ) {
		this.focus ( true );
		this.bindingWindow.standardEventHandler.enableNativeKeys ();
		//if ( Client.isExplorer == true ) {
		//	var self = this;
		//	setTimeout ( function () {
		//		if ( Binding.exists ( self ) == true ) {
		//			self.subscribe ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN );
		//		}
		//	}, 0 );
		//}
	} else {
		this.blur ( true );
		this.bindingWindow.standardEventHandler.disableNativeKeys ();
		//if ( Client.isExplorer == true ) {
		//	this.unsubscribe ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN );
		//}
	}
}

/**
 * Handle ENTER key, preventing form submit. Isolated so that subclasses can overwrite.
 * @param {KeyEvent} e
 */
DataInputBinding.prototype._handleEnterKey = function ( e ) {

	DOMEvents.preventDefault ( e );
	DOMEvents.stopPropagation ( e );
	EventBroadcaster.broadcast ( BroadcastMessages.KEY_ENTER );
}

///**
// * Due to some cataclysmic malfunction in Explorer, the input element may still
// * be registered as document.activeElement when the help popup is opened - even
// * though the focus is obviously lost! This setup will force it to blur. Don't
// * enable this in Mozilla - it will cause stuff to loose focus spontaniously.
// * @implements {IBroadcastListener}
// * @param {string} broadcast
// * @param {object} arg
// */
//DataInputBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

//	DataInputBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

//	var self = this;

//	switch ( broadcast ) {

//		/*
//		 * The timeout allows another databinding to claim the focus first.
//		 * Remember that the arg can be a Binding (untill we rafactor), so
//		 * it actually doesn't make sanse that this operation doesn't fail.
//		 */
//		case BroadcastMessages.MOUSEEVENT_MOUSEDOWN :

//			if ( Client.isExplorer == true ) {
//				var target = DOMEvents.getTarget ( arg );
//				if ( target != this.shadowTree.input ) {
//					setTimeout ( function () {
//						if ( Binding.exists ( self ) == true ) {  // what devilship could require this?
//							if ( self.isFocused == true ) {
//								self.blur ();
//							}
//						}
//					}, 100 );
//				}
//			}
//			break;
//	}
//}

/**
 * Focus.
 * @overloads {DataBinding#focus}
 * @param {boolean} isDomEvent
 */
DataInputBinding.prototype.focus = function ( isDomEvent ) {

	if ( !this.isFocused && !this.isReadOnly && !this.isDisabled ) {
		DataInputBinding.superclass.focus.call ( this );
		if ( this.isFocused == true ) {
			this._focus ();
			if ( this._isAutoSelect == true ) {
				if ( isDomEvent ) {
					var self = this, element = this.bindingElement, handler = {
						handleEvent : function () {
							self.select ();
							DOMEvents.removeEventListener ( element, DOMEvents.MOUSEUP, this );
						}
					};
					DOMEvents.addEventListener ( element, DOMEvents.MOUSEUP, handler );
				} else {
					this.select ();
				}
			}
			this.onfocus ();
			if ( !isDomEvent ) {
				/*
				 * Timeout fixes a few strange problems...
				 */
				var input = this.shadowTree.input;
				setTimeout ( function () {
					FocusBinding.focusElement ( input );
				}, 0 );
			}
		}
	}
}

/**
 * Select contained text.
 */
DataInputBinding.prototype.select = function () {

	var input = this.shadowTree.input;

	setTimeout ( function () {
		if ( Client.isExplorer == true ) {
			var range = input.createTextRange();
			range.moveStart ( "character", 0 );
			range.moveEnd ( "character", input.value.length );
			range.select ();
		} else {
	    	input.setSelectionRange ( 0, input.value.length );
		}
	}, 0 );
}

/**
 * Blur.
 * @overloads {DataBinding#blur}
 * @param {boolean} isDomEvent
 */
DataInputBinding.prototype.blur = function ( isDomEvent ) {

	if ( this.isFocused == true ) {
		DataInputBinding.superclass.blur.call ( this );
		if ( !isDomEvent ) {
			this.shadowTree.input.blur ();
		}
		this._blur ();
	}
}

/**
 * Setup validation on focus.
 * @private
 */
DataInputBinding.prototype._focus = function () {

	if ( !this._isValid ) {
		if ( this.isPassword ) {
			if ( Client.isMozilla ) {
				this.shadowTree.input.type = "password";
				this.setValue ( this._value );
			}
		} else {
			this.setValue ( this._value );
		}
		this.shadowTree.input.className = "";
	}

	this._sessionResult = this.getResult ();

	var self = this;

	this._dirtyinterval = window.setInterval ( function () {
		if ( Binding.exists ( self ) == true ) {
			self.checkDirty ();
			if ( !self._isValid ) {
				self.validate ( true );
			}
		} else {
			window.clearInterval ( self._dirtyinterval );
			self._dirtyinterval = null;
		}
	}, 500 );
}

/**
 * Validate on blur.
 * @private
 */
DataInputBinding.prototype._blur = function () {

	if ( this._dirtyinterval ) {
		window.clearInterval ( this._dirtyinterval );
		this._dirtyinterval = null;
	}

	this.checkDirty();

	this._isValid = true; // prepare for next validation
	this._normalizeToValid(); // reset styling and stuff
	this.validate ( true );

	if ( Types.isFunction ( this.onblur )) {
		this.onblur ();
	}
	if ( this._isValid ) {
		if ( this.getResult () != this._sessionResult ) {
			/*
			 * If autopostback, remember that this._timeout may still be active now!
			 */
			this.onValueChange ();
		}
	}
}

/**
 * Overwrite this!
 */
DataInputBinding.prototype.onfocus = function () {}

/**
 * Overwrite this!
 */
DataInputBinding.prototype.onblur = function () {}

/**
 * Check dirty.
 */
DataInputBinding.prototype.checkDirty = function () {

	if ( !this.isDirty ) {
		if ( this.getResult () != this._sessionResult ) {
			this.dirty ();
		}
	}
}

/**
 * TODO: This seems to do more or less the same
 * as the method declared above. Fix this please.
 */
DataInputBinding.prototype._testDirty = function () {

	var val = this.getValue ();
	var self = this;
	setTimeout ( function () {
		if ( Binding.exists ( self )) {
			if ( self.getValue () != val ) {
				self.dirty ();
			}
		}
	}, 0 );
};

/**
 * Fires when input looses focus and value is changed.
 * Does nothing by default. Feel free to overwrite.
 */
DataInputBinding.prototype.onValueChange = function () {}

/**
 * Validate.
 * @implements {IData}
 * @param {boolean} isInternal Regrettably, this was added to fix bugs when
 * 		the blur event would update the text content  immideately followed by
 * 		a page validation. This would cause glitches with minlength etc...
 * @return {boolean}
 */
DataInputBinding.prototype.validate = function ( isInternal ) {

	if ( isInternal == true || this._isValid ) {

		var isValid = this.isValid ();

		if ( isValid != this._isValid ) {

			this._isValid = isValid;

			if ( !isValid ) {

				this.attachClassName ( DataBinding.CLASSNAME_INVALID );
				this._value = this.getValue ();
				this.dispatchAction ( Binding.ACTION_INVALID );

				if ( !this.isFocused ) {

					var message = null;
					if ( this._isInvalidBecauseRequired == true ) {
						message = DataBinding.warnings [ "required" ];
					} else if ( this._isInvalidBecauseMinLength == true ) {
						message = DataBinding.warnings [ "minlength" ];
						message = message.replace ( "{0}", String ( this.minlength ));
					} else if ( this._isInvalidBecauseMaxLength == true ) {
						message = DataBinding.warnings [ "maxlength" ];
						message = message.replace ( "{0}", String ( this.maxlength ));
					} else {
						message = DataBinding.warnings [ this.type ];
					}

					this.shadowTree.input.className = DataBinding.CLASSNAME_WARNING;
					if ( message != null ) {
						if ( this.isPassword ) {
							if ( Client.isMozilla ) {
								this.shadowTree.input.type = "text";
								this.setValue ( message );
							}
						} else {
							this.setValue ( message );
						}
					}
				}

			} else {
				this._normalizeToValid ();
			}
		}
	}

	return this._isValid;
}

/**
 * Normalize invalid binding, marking the binding valid.
 */
DataInputBinding.prototype._normalizeToValid = function () {

	if ( this._isValid ) {
		if ( this.hasClassName ( DataBinding.CLASSNAME_INVALID )) {
			this.detachClassName ( DataBinding.CLASSNAME_INVALID );
		}
		this.shadowTree.input.className = "";
		this.dispatchAction ( Binding.ACTION_VALID );
	}
};

/**
 * @return {boolean}
 */
DataInputBinding.prototype.isValid = function () {

	var isValid = true;
	this._isInvalidBecauseRequired = false;
	this._isInvalidBecauseMinLength = false;
	this._isInvalidaBecuaseMaxLength = false;
	var value = this.getValue ();

	if ( value == "" ) {
		if ( this.isRequired == true ) {
			isValid = false;
			this._isInvalidBecauseRequired = true;
		}
	} else if ( this.type != null ) {
		var expression = DataBinding.expressions [ this.type ];
		if ( !expression.test ( value )) {
			isValid = false;
		}
	} else if ( this.expression != null ) {
		if ( !this.expression.test ( value )) {
			isValid = false;
		}
	}
	if ( isValid && this.minlength != null ) {
		if ( value.length < this.minlength ) {
			this._isInvalidBecauseMinLength = true;
			isValid = false;
		}
	}
	if ( isValid && this.maxlength != null ) {
		if ( value.length > this.maxlength ) {
			this._isInvalidBecauseMaxLength = true;
			isValid = false;
		}
	}
	return isValid;
}

/**
 * @param {boolean} isDisabled
 */
DataInputBinding.prototype.setDisabled = function ( isDisabled ) {

	if ( isDisabled != this.isDisabled ) {
		if ( isDisabled ) {
			this.attachClassName ( "isdisabled" );
		} else {
			this.detachClassName ( "isdisabled" );
		}
		var input = this.shadowTree.input;
		if ( isDisabled ) {
			this._disabledHandler = {
				handleEvent : function ( e ) {
					DOMEvents.preventDefault ( e );
					DOMEvents.stopPropagation ( e );
				}
			}
			DOMEvents.addEventListener ( input, DOMEvents.MOUSEDOWN, this._disabledHandler );
		} else {
			DOMEvents.removeEventListener ( input, DOMEvents.MOUSEDOWN, this._disabledHandler );
			this._disabledHandler = null;
		}
		if ( Client.isExplorer ) { // is this needed?
			this.shadowTree.input.disabled = isDisabled;
			this.shadowTree.input.unselectable = isDisabled ? "on" : "off";
		}
		this.isDisabled = isDisabled;
		this.isFocusable = !isDisabled;
		this.dispatchAction ( FocusBinding.ACTION_UPDATE );
	}
}

/**
 * @param {boolean} isReadOnly
 */
DataInputBinding.prototype.setReadOnly = function ( isReadOnly ) {

	if ( isReadOnly != this.isReadOnly ) {
		if ( isReadOnly ) {
			this.attachClassName ( "readonly" );
		} else {
			this.detachClassName ( "readonly" );
		}
		if (this.shadowTree.input) {
	        this.shadowTree.input.readOnly = isReadOnly;
	    }
	    this.isReadOnly = isReadOnly;
	}
}

/**
 * Disable.
 */
DataInputBinding.prototype.disable = function () {

	if ( !this.isDisabled ) {
		this.setDisabled ( true );
	}
}

/**
 * Enable.
 */
DataInputBinding.prototype.enable = function () {

	if ( this.isDisabled ) {
		this.setDisabled ( false );
	}
}

/**
 * Handle element update.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 * @return {boolean}
 */
DataInputBinding.prototype.handleElement = function ( element ) {

	return true;
};

/**
 * Update element.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 * @return {boolean}
 */
DataInputBinding.prototype.updateElement = function ( element ) {

	var newval = element.getAttribute ( "value" );
	var newtype = element.getAttribute ( "type" );
	var newmax = element.getAttribute ( "maxlength" );
	var newmin = element.getAttribute ( "minlength" );
	var newrequired = element.getAttribute("required") === "true";
	var newreadonly = element.getAttribute("readonly") === "true";

	if ( newval == null ) {
		newval = "";
	}

	if (this.isReadOnly != newreadonly) {
		this.setReadOnly(newreadonly);
	}

	var manager = this.bindingWindow.UpdateManager;
	if ( this.getValue () != newval ) {
		manager.report ( "Property [value] updated on binding \"" + this.getID () + "\"" );
		this.setValue ( newval );
	}
	if ( this.type != newtype ) {
		manager.report ( "Property [type] updated on binding \"" + this.getID () + "\"" );
		this.type = newtype;
	}
	if ( this.maxlength != newmax ) {
		manager.report ( "Property [maxlength] updated on binding \"" + this.getID () + "\"" );
		this.maxlength = newmax;
	}
	if ( this.minlength != newmin ) {
		manager.report ( "Property [minlength] updated on binding \"" + this.getID () + "\"" );
		this.minlength = newmin;
	}
	if (this.isRequired != newrequired) {
	    manager.report("Property [required] updated on binding \"" + this.getID() + "\"");
	    this.isRequired = newrequired;
	}

	return true;
};

/**
 * Manifest. Because postback without validation may happen,
 * we may need override validation message and post an empty
 * string to the server. "Save" is a validated postback, so
 * the non-validating string is not made permanent by this.
 * @implements {IData}
 */
DataInputBinding.prototype.manifest = function () {
    if (this._timeout != null) {
        top.window.clearTimeout(this._timeout);
    }
	if ( !this._isValid ) {
		this.setValue ( "" ); // post empty to the server
		this._isValid = true; // prepare for next validation
		this._normalizeToValid (); // reset styling and stuff
	}
}

/**
 * Clean.
 * @overloads {DataBinding#clean}
 * @implements {IData}
 */
DataInputBinding.prototype.clean = function () {

	DataInputBinding.superclass.clean.call ( this );
	this._sessionResult = this.getResult ();
}

/**
 * Set value.
 * @param {String} value
 */
DataInputBinding.prototype.setValue = function ( value ) {

	if ( value === null ) {
		value = "";
	}
	if ( value != this.getValue ()) {
		this.setProperty ( "value", value );
		if ( this.shadowTree.input != null ) {
			this.shadowTree.input.value = String ( value );
		}
	}
}

/**
 * Get value.
 * @implements {IData}
 * @return {string}
 */
DataInputBinding.prototype.getValue = function () {

	var result = null;
	if ( this.shadowTree.input != null ) {
		result = this.shadowTree.input.value;
	} else {
		result = this.getProperty ( "value" );
	}
	return result;
}

/**
 * Set name.
 * Overloads {DataBinding#setName}
 * @param {string} name
 */
DataInputBinding.prototype.setName = function ( name ) {

	DataInputBinding.superclass.setName.call ( this, name );

	if ( this.isAttached == true ) {
		this.shadowTree.input.name = name;
	}
}

/**
 * Get result. Unlike getValue, the result is qualified according to type property.
 * @implements {IData}
 * @return {object}
 */
DataInputBinding.prototype.getResult = function () {

	var result = this.getValue ();

	switch ( this.type ) {
		case DataBinding.TYPE_NUMBER :
		case DataBinding.TYPE_INTEGER :
			result = Number ( result );
			break;
	}
	return result;
}

/**
 * Set result.
 * @implements {IData}
 * @param {object} result
 */
DataInputBinding.prototype.setResult = DataInputBinding.prototype.setValue;

/**
 * DataInputBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DataInputBinding}
 */
DataInputBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:datainput", ownerDocument );
	return UserInterface.registerBinding ( element, DataInputBinding );
}