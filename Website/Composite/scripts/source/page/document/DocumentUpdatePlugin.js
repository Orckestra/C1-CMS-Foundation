/**
 * Integrate the UpdateManager framework with the amazing world of Bindings.
 * Accessed through instance variable "DocumentManager" declared below.
 */
function _DocumentUpdatePlugin () {

	if ( window.UpdateManager != null ) {
		UpdateManager.plugins.push ( this );
		this._setup ();
	}
}

_DocumentUpdatePlugin.prototype = {

	/**
	 * Identification.
	 * @return {String}
	 */
	toString : function () {

		return "[DocumentUpdatePlugin]";
	},

	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "DocumentUpdatePlugin [" + document.title + "]" ),

	/**
	 * True while UpdateManager is in action.
	 * @type {boolean}
	 */
	_isUpdating : false,

	/**
	 * Used to delegate element updates of type "attribute" to the associated binding.
	 * In other words, let the binding know that the elements attributes were updated.
	 * Remember that this must be wired up using the bindings "propertyMethodMap" thingy.
	 * @type {Map<String><String>}
	 */
	_attributesbuffer : null,

	/**
	 * Instead of attaching bindings on sight - when new elements are inserted - we
	 * collect elements in a buffer and attach bindings them in the final phase.
	 * This way, newly attached bindings may be fully aware of document structure.
	 * Note: Updated attributes are evaluated "on sight", should this be changed?
	 * @type {List<Element>}
	 */
	_elementsbuffer : null,

	/**
	 * Debug DOM before and after? This throws out a pretty
	 * verbose log statement, so let's not keep it enabled.
	 */
	isDebugging : Application.isDeveloperMode, // Application.isDeveloperMode

	/**
	 * Store before-DOM serialization here so that we
	 * may debug before and after in a single output.
	 * @type {String}
	 */
	_oldDOM : null,

	/**
	 * Refocus last focused binding after replace.
	 * @type {String}
	 */
	_focusID : null,

	/**
	 * UpdateManager configuration and modification.
	 */
	_setup : function () {

		/*
		 * Prepare UpdatManager for hard work.
		 */
		UpdateManager.isDebugging = Application.isDeveloperMode;
		UpdateManager.hasSoftAttributes = true;
		UpdateManager.hasSoftSiblings = true;

		/*
		 * Setup update listeners and handle potential errors.
		 */
		DOMEvents.addEventListener ( document, DOMEvents.BEFOREUPDATE, this );
		DOMEvents.addEventListener ( document, DOMEvents.AFTERUPDATE, this );
		DOMEvents.addEventListener ( document, DOMEvents.ERRORUPDATE, this );
		DOMEvents.addEventListener ( window, DOMEvents.UNLOAD, this );

		/*
		 * This evil hackery fixes the glitch where a the Gecko serializer
		 * would mess up the prefixes on HTML and UI elements. Since these
		 * elements reside in the same namespace, Gecko is perfectly
		 * entitled to do so. Unfortunately, it is also perfectly entitled
		 * to ignore the evil hack presented below, but it does seem to work.
		 * TODO: Verify this after https://bugzilla.mozilla.org/show_bug.cgi?id=368437
		 */
		if ( Client.isFirefox ) {
			UpdateAssistant.serialize = function ( element ) {
				element = element.cloneNode ( true ); // don't modify UpdateManager.currentDOM!
				element.setAttributeNS ( Constants.NS_NS, "xmlns", Constants.NS_XHTML );
				element.setAttributeNS ( Constants.NS_NS, "xmlns:ui", Constants.NS_UI );
				return this._serializer.serializeToString ( element );
			};
		}

	},

	/**
	 * @implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {

		var target = DOMEvents.getTarget ( e );

		switch ( e.type ) {

			case DOMEvents.BEFOREUPDATE :
				this._beforeUpdate ( target );
				break;

			case DOMEvents.AFTERUPDATE :
				this._afterUpdate ( target );
				break;

			case DOMEvents.ERRORUPDATE :
				this._errorUpdate ();
				break;

			case DOMEvents.UNLOAD :
				if ( Application.hasLock ( this )) {
					Application.unlock ( this );
				}
				break;
		}
	},

	/**
	 * Invoked before an update AND before any updates.
	 * @param {Element} target
	 */
	_beforeUpdate : function ( target ) {

		var isBeginUpdate = ( target == document.documentElement );

		if ( isBeginUpdate ) {

			this._elementsbuffer = new List ();

			this._isUpdating = true;
			Application.lock ( this ); // TODO: doesn't work in IE

			// notify containing page
			// TODO: nice method to locate the page!
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				var page = root.getDescendantBindingByType ( PageBinding );
				if ( page != null ) {
					page.onBeforeUpdates ();
				}
			}

			var binding = FocusBinding.focusedBinding;
			if ( binding != null ) {
				this._focusID = binding.getID ();
			}

			if ( this.isDebugging ) {
				this._oldDOM = DOMSerializer.serialize ( UpdateManager.currentDOM, true );
			}

		} else {

			switch ( target.__updateType ) {
				case Update.TYPE_REPLACE :
				case Update.TYPE_REMOVE :
					DocumentManager.detachBindings ( target );
					break;
				case Update.TYPE_ATTRIBUTES :
					this._backupattributes ( target, false );
					break;
			}
		}
	},

	/**
	 * Invoked after an update AND after all updates.
	 * @param {Element} target
	 */
	_afterUpdate : function ( target ) {

		var isFinishedUpdate = ( target == document.documentElement );

		if ( isFinishedUpdate ) {

			/*
			 * Register and attach new bindings.
			 */
			var buffer = this._elementsbuffer;

			if ( buffer.hasEntries ()) {
				buffer.each(function (element) {
					DocumentManager.attachBindings(element);
				});
			}

			/*
			 * Unlock UI.
			 */
			this._isUpdating = false;
			Application.unlock ( this );

			// notify containing page
			// TODO: nice method to locate the page!
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				var page = root.getDescendantBindingByType ( PageBinding );
				if ( page != null ) {
					page.onAfterUpdates ();
				}
			}

			var binding = FocusBinding.focusedBinding;
			if ( binding == null ) {
				var element = document.getElementById ( this._focusID );
				if ( element != null ) {
					var binding = UserInterface.getBinding ( element );
					if ( binding != null ) {
						binding.focus ();
					}
				}
			}
			this._focusID = null;

			// debug before and after DOM
			if ( UpdateManager.summary != "" ) {
				if ( this.isDebugging ) {
					var newDOM = DOMSerializer.serialize ( UpdateManager.currentDOM, true );
					var debug = "NEW DOM: " + document.title + "\n\n" + newDOM + "\n\n";
					debug += "OLD DOM: " + document.title + "\n\n" + this._oldDOM;
					this._logger.debug ( debug );
					this._oldDOM = null;
				}
				this._logger.fine ( UpdateManager.summary );
			}

		} else {

			switch ( target.__updateType ) {
				case Update.TYPE_REPLACE :
				case Update.TYPE_INSERT :
					if( target.__isAttached !== false)
						this._elementsbuffer.add ( target );
					break;
				case Update.TYPE_ATTRIBUTES :
					this._backupattributes ( target, true );
					break;
			}

			/*
			 * Dispatch updated status from nearest Binding.
			 * TODO: Stamp the __updateType for any reason?
			 */
			switch ( target.id ) {

				case "__VIEWSTATE" :
				case "__EVENTTARGET" :
				case "__EVENTARGUMENT" :
				case "__EVENTVALIDATION" :
				case "__LASTFOCUS" :
				case "__REQUEST" :
				case "__RESPONSE" :
				case "__CONSOLEID" :
					break;

				default :

					/*
					 * Note that the Binding.ACTION_UPDATED action is not
					 * always targetted at the binding that got updated;
					 * but it will let a dialog know that layout was changed...
					 */
					var binding = UserInterface.getBinding ( target );
					while ( binding == null && target != null ) {
						binding = UserInterface.getBinding ( target );
						target = target.parentNode;
					}
					if ( binding != null ) {
						binding.dispatchAction ( Binding.ACTION_UPDATED );
					}
					break;
			}
		}
	},

	/**
	 * Update error!
	 */
	_errorUpdate : function () {

		Application.unlock ( this );
		var cry = "UpdateManager dysfunction:\n\n" + UpdateManager.errorsmessage;
		this._logger.error ( cry + "\n\n" + UpdateManager.pendingResponse );
		if ( Application.isDeveloperMode ) {
			alert ( cry );
		}
	},

	/**
	 * Backup attributes for comparison with updated attributes.
	 * @param {Element} element
	 * @param {boolean} isRestore
	 */
	_backupattributes : function ( element, isRestore ) {

		var binding = UserInterface.getBinding ( element );
		if ( binding != null ) {

			if ( isRestore ) {

				var buffer = this._attributesbuffer;
				var map = new Map ();

				buffer.each ( function ( name, old ) {
					var now = element.getAttribute ( name );
					if ( now != null ) {
						if ( now != old ) {
							map.set ( name, Types.castFromString ( now ));
						}
					} else {
						map.set ( name, null );
					}
				});
				new List ( element.attributes ).each ( function ( att ) {
					if ( att.specified ) {
						if ( !buffer.has ( att.nodeName )) {
							map.set ( att.nodeName, Types.castFromString ( att.nodeValue ));
						}
					}
				});
				map.each ( function ( name, value ) {
					var method = binding.propertyMethodMap [ name ];
					if ( method != null ) {
						method.call ( binding, value );
					}
				});

			} else {

				var map = new Map ();
				new List ( element.attributes ).each ( function ( att ) {
					if ( att.specified ) {
						map.set ( att.nodeName, att.nodeValue );
					}
				});
				this._attributesbuffer = map;
			}
		}
	},


	// UPDATEPLUGIN METHODS ..............................................

	/**
	 * Handle element?
	 * @implements {IUpdateHandler}
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @return {boolean}
	 */
	handleElement : function ( newelement, oldelement ) {

		// since we know that the element has a specied ID...
		var binding = window.bindingMap [ newelement.getAttribute ( "id" )];
		if ( binding != null ) {
			return binding.handleElement ( newelement, oldelement );
		}
	},

	/**
	 * Update element.
	 *	@implements {IUpdateHandler}
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @return {boolean}
	 */
	updateElement : function ( newelement, oldelement ) {

		var binding = window.bindingMap [ newelement.getAttribute ( "id" )];
		if ( binding != null ) {
			return binding.updateElement ( newelement, oldelement );
		}
	}
}

/**
 * The instance that does it.
 * @type {_DocumentUpdatePlugin}
 */
var DocumentUpdatePlugin = new _DocumentUpdatePlugin ();
