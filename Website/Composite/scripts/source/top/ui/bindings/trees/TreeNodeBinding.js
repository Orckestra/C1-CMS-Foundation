TreeNodeBinding.prototype = new Binding;
TreeNodeBinding.prototype.constructor = TreeNodeBinding;
TreeNodeBinding.superclass = Binding.prototype;

TreeNodeBinding.DEFAULT_FOLDER_CLOSED 		= "${icon:folder}";
TreeNodeBinding.DEFAULT_FOLDER_OPEN			= "${icon:folder_active}";
TreeNodeBinding.DEFAULT_FOLDER_DISABLED 	= "${icon:default}";
TreeNodeBinding.DEFAULT_ITEM 				= "${root}/images/icons/harmony/composite/default_16.png";
TreeNodeBinding.DEFAULT_ITEM_DISABLED		= "${icon:default}";

TreeNodeBinding.ACTION_OPEN					= "treenodeopen";
TreeNodeBinding.ACTION_CLOSE				= "treenodeclose";
TreeNodeBinding.ACTION_ONFOCUS				= "treenodeonfocus";
TreeNodeBinding.ACTION_ONMULTIFOCUS			= "treenodeonmultifocus";
TreeNodeBinding.ACTION_FOCUSED				= "treenodefocused";
TreeNodeBinding.ACTION_BLUR					= "treenodeblur";
TreeNodeBinding.ACTION_COMMAND				= "treenodecommand";
TreeNodeBinding.ACTION_DISPOSE				= "treenodedisposed";

TreeNodeBinding.CLASSNAME_DRAGGED = "dragged";
TreeNodeBinding.HEIGHT = 19; /* TODO: doublecheck - was 16 */
TreeNodeBinding.INDENT = 16 + 18;

/**
 * @class
 * TreeNodeBinding.
 * @param {DOMElement} bindingElement
 */
function TreeNodeBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeNodeBinding" );

	/**
	 * @type {boolean}
	 */
	this.hasBeenOpened = false;

	/**
	 * @type {boolean}
	 */
	this.isDisabled	= false;

	/**
	 * @type {boolean}
	 */
	this.isFocused = false;

	/**
	 * @type {boolean}
	 */
	this.isOpen = false;

	/**
	 * @type {boolean}
	 */
	this.isPinned = false;

	/**
	 * @type {boolean}
	 */
	this.isContainer = false;

	/**
	 * @type {ImageProfile}
	 */
	this.imageProfile = null;

	/**
	 * @type {string}
	 */
	this.image = null;

	/**
	 * @type {string}
	 */
	this.imageHover = null;

	/**
	 * @type {string}
	 */
	this.imageActive = null;

	/**
	 * @type {string}
	 */
	this.imageDisabled = null;

	/**
	 * The ancestor TreeBinding.
	 * @type {TreeBinding}
	 */
	this.containingTreeBinding = null;

	/*
	 * Return this.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TreeNodeBinding.prototype.toString = function () {

	return "[TreeNodeBinding]";
}

/**
 * Serialize binding.
 */
TreeNodeBinding.prototype.serialize = function () {

	var result = TreeNodeBinding.superclass.serialize.call ( this );
	if ( result ) {

		result.label = this.getLabel ();
		result.image = this.getImage ();

		var handle = this.getHandle ();
		if ( handle && handle != this.key ) {
			result.handle = handle;
		}
		if ( this.isOpen ) {
			result.open = true;
		}
		if ( this.isDisabled ) {
			result.disabled = true;
		}
		if ( this.dragType ) {
			result.dragtype = this.dragType;
		}
		if ( this.dragAccept ) {
			result.dragaccept = this.dragAccept;
		}
	}
	return result;
}

/**
 * @overloads {Binding#onBindingRegister}
 */
TreeNodeBinding.prototype.onBindingRegister = function () {

	TreeNodeBinding.superclass.onBindingRegister.call ( this );

	this.propertyMethodMap [ "label" ] = this.setLabel;
	this.propertyMethodMap [ "image" ] = this.setImage;
	this.propertyMethodMap [ "tooltip" ] = this.setToolTip;
	// this.propertyMethodMap [ "focus" ] is handled by method handleElement...

}

/**
 * Overloads {Binding#onBindingAttach}
 */
TreeNodeBinding.prototype.onBindingAttach = function () {

	TreeBinding.superclass.onBindingAttach.call ( this );

	this.isOpen	= this.isOpen ? true : this.getProperty ( "open" );
	this.isPinned = this.isPinned ? true : this.getProperty("pin");
	if ( !this.isContainer ) {
		this.isContainer = this.hasChildren ();
	}
	this.buildDOMContent ();
	this.assignDOMEvents ();
	if ( this.isDisabled ) {
		this.labelBinding.attachClassName ( LabelBinding.CLASSNAME_GRAYTEXT );
	}
	this.addActionListener ( TreeNodeBinding.ACTION_FOCUSED );
	this.addEventListener ( UpdateManager.EVENT_AFTERUPDATE );

	/*
	 * We do this last so that the tree may at this point change label etc.
	 */
	this._registerWithAncestorTreeBinding ();
}

/**
 * Overloads {Binding#onBindingDispose}
 */
TreeNodeBinding.prototype.onBindingDispose = function () {

	if ( this.isAttached ) {
		if ( this.dragger != null ) { // TODO: is this needed?
			this.labelBinding.removeEventListener ( DOMEvents.MOUSEDOWN, this.dragger );
			this.labelBinding.removeEventListener ( DOMEvents.MOUSEMOVE, this.dragger );
			this.labelBinding.removeEventListener ( DOMEvents.MOUSEUP, this.dragger );
			this.disableDragging ();
			this.dragger.dispose ();
		}
		this.dispatchAction ( TreeNodeBinding.ACTION_DISPOSE );
		this.containingTreeBinding.unRegisterTreeNodeBinding ( this );
		this.labelBinding.dispose ();
	}
	TreeNodeBinding.superclass.onBindingDispose.call ( this );
}

/**
 * Register with containing {@link TreeBinding}.
 * To conserve computations, a pointer to the tree
 * is copied from the nearest parent tree member.
 * We cannot simply target the parent element
 * since this could be a {@link UpdatePanelBinding}.
 */
TreeNodeBinding.prototype._registerWithAncestorTreeBinding = function () {

	var node = this.bindingElement;
	while (( node = node.parentNode ) != null && !this.containingTreeBinding ) {
		var binding = UserInterface.getBinding ( node );
		if ( binding && binding.containingTreeBinding ) {
			this.containingTreeBinding = binding.containingTreeBinding;
		}
	}
	if ( this.containingTreeBinding ) {
		this.containingTreeBinding.registerTreeNodeBinding ( this );
	} else  {
		alert ( this.bindingElement.parentNode.nodeName );
		throw "TreeNodeBinding attached outside TreeBodyBinding";
	}
}

/**
 * The treenode will get registered by this index.
 * Subclasses can overwrite this method for added pleasure.
 * @return {string}
 */
TreeNodeBinding.prototype.getHandle = function () {

	var result = this.key;
	var handle = this.getProperty ( "handle" );
	if ( handle ) {
		result = handle;
	}
	return result;
}

/**
 * Set handle.
 * @param {string} handle
 */
TreeNodeBinding.prototype.setHandle = function ( handle ) {

	this.setProperty ( "handle", handle );
}

/**
 * Build DOM content.
 */
TreeNodeBinding.prototype.buildDOMContent = function () {

	var url				= this.getProperty ( "url" );
	var label 			= this.getProperty ( "label" );
	var tooltip 		= this.getProperty ( "tooltip" );
	var oncommand 		= this.getProperty ( "oncommand" );
	var onfocus 		= this.getProperty ( "onbindingfocus" );
	var onblur 			= this.getProperty ( "onbindingblur" );
	var focused 		= this.getProperty ( "focused" );
	var callbackid 		= this.getProperty ( "callbackid" );

	/*
	 * Build URL
	 */
	if ( url ) {
		var link = DOMUtil.createElementNS ( Constants.NS_XHTML, "a", this.bindingDocument );
		link.href = url;
		this.bindingElement.appendChild ( link );
		this.shadowTree.link = link;
	}

	/*
	 * Build label
	 */
	this.labelBinding = LabelBinding.newInstance ( this.bindingDocument )
	if ( url ) {
		this.shadowTree.link.appendChild ( this.labelBinding.bindingElement );
	} else {
		this.addFirst ( this.labelBinding );
	}
	this.shadowTree.label = this.labelBinding; // in order to exclude from serialization!

	if ( this.dragger != null ) { // have to transfer listeners to make the setup work!

		this.removeEventListener ( DOMEvents.MOUSEDOWN, this.dragger );
		this.removeEventListener ( DOMEvents.MOUSEMOVE, this.dragger );
		this.removeEventListener ( DOMEvents.MOUSEUP, this.dragger );

		this.labelBinding.addEventListener ( DOMEvents.MOUSEDOWN, this.dragger );
		this.labelBinding.addEventListener ( DOMEvents.MOUSEMOVE, this.dragger );
		this.labelBinding.addEventListener ( DOMEvents.MOUSEUP, this.dragger );

	}

	// TEMP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Binding.prototype._initializeBindingDragAndDropFeatures overload??? DRAGREJECT!
	if ( this.isContainer && !this.dragAccept ) {
		this.acceptor = new BindingAcceptor ( this );
	}

	if ( label != null ) {
		this.setLabel ( label );
	}
	if ( tooltip != null ) {
		this.setToolTip ( tooltip );
	}
	if ( !this.imageProfile ) {
		this._computeImageProfile ();
	}
	this.setImage (
		this.computeImage ()
	);
	if ( this.isContainer ) {
		this.updateClassNames ();
	}

	var manager = this.bindingWindow.WindowManager;

	if ( oncommand != null ) {
		this.oncommand = function () {
			Binding.evaluate ( oncommand, this );
		};
	}
	if ( onfocus != null ) {
		this.onfocus = function () {
			Binding.evaluate ( onfocus, this );
		};
	}
	if ( onblur != null ) {
		this.onblur = function () {
			Binding.evaluate ( onblur, this );
		};
	}

	if ( focused == true ) {
		this.focus ();
	}

	/*
	 * Setup ASP.NET callback. One can only wonder why we need a
	 * hidden field in order to communicate with the server...
	 */
	if ( callbackid != null ) {
		Binding.dotnetify ( this, callbackid );
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
TreeNodeBinding.prototype.handleAction = function ( action ) {

	TreeNodeBinding.superclass.handleAction.call ( this, action );

	switch ( action.type ) {

		/*
		 * Make sure that a focused treenode is always
		 * visible by opening ancestor treenodes.
		 */
		case TreeNodeBinding.ACTION_FOCUSED :
			if ( action.target != this ) {
				if ( this.isContainer && !this.isOpen ) {
					this.open ( true );
				}
			}
			break;
	}
}

/**
 * Enable dragging. Special setup, adding event listeners to
 * label, because treenodes consume the onmousedown event.
 * @overwrites {Binding#enableDragging}
 */
TreeNodeBinding.prototype.enableDragging = function () {

	/*
	 * DISABLED!
	 *
	this.isDraggable = true;
	if ( this.dragger == null ) {
		this.dragger = new BindingDragger ( this );
	}
	*/
}

/**
 * Disable dragging.
 * @overwrites {Binding#disableDragging}
 */
TreeNodeBinding.prototype.disableDragging = function () {

	this.isDraggable = false;
	/*
	if ( this.dragger != null ) { handled by method onBindingDispose!
		this.dragger = null;
	}
	*/
}

/**
 * Accept dragged binding.
 * @implements {IAcceptable}
 * @param {Binding} binding
 * @param @optional {int} index
 * @return {boolean}
 */
TreeNodeBinding.prototype.accept = function ( binding, index ) {

	var isAccept = true;

	if ( binding instanceof TreeNodeBinding ) {

		var isAncestor = false;
		var element = this.bindingElement;
		var treeElement = this.containingTreeBinding.bindingElement;

		while ( !isAncestor && element != treeElement ) {
			if ( element == binding.getBindingElement ()) {
				isAncestor = true;
			} else {
				element = element.parentNode;
			}
		}

		if ( isAncestor ) {
			Dialog.error ( "Not Allowed", "You cannot move a folder into itself." );
			isAccept = false;
		} else {
			this.acceptTreeNodeBinding ( binding, index );
		}
	} else {
		isAccept = false;
	}

	return isAccept;
}

/**
 * Accept treenode.If properties get lost in transfer, remember
 * to update the {@link TreeNodeBinding#serialize} method.
 * @param {Binding} binding
 * @param @optional {int}
 */
TreeNodeBinding.prototype.acceptTreeNodeBinding = function ( binding, index ) {

	var serial = binding.serializeToString ();
	var parser = new BindingParser ( this.bindingDocument );
	var element	= parser.parseFromString ( serial ).getFirst ();

	index = index ? index : this.containingTreeBinding.getDropIndex ();
	var children = this.getChildElementsByLocalName ( "treenode" );
	this.bindingElement.insertBefore ( element, children.get ( index ));
	this.bindingWindow.DocumentManager.attachBindings (
		this.bindingElement
	);

	/*
	 * This part does not work because the "image" attribute
	 * has been set on bindingElement opon binding attach.
	 * Fortunately we don't need it just now.
	 *
	if ( !this.isContainer ) {
		this.isContainer = true;
		this.isOpen = true;
		this.updateClassNames ();
		this._computeImageProfile ();
		alert ( this.imageProfile.getDefaultImage ());
		this.setImage (
			this.computeImage ()
		);
	}
	*/

	binding.dispose ();
}

/**
 * Show acceptance.
 * @implements {IAcceptable}
 */
TreeNodeBinding.prototype.showAcceptance = function () {

	this.containingTreeBinding.enablePositionIndicator ( this );
}

/**
 * Show acceptance.
 * @implements {IAcceptable}
 */
TreeNodeBinding.prototype.hideAcceptance = function () {

	this.containingTreeBinding.disablePositionIndicator ();
}

/**
 * Compute ImageProfile.
 */
TreeNodeBinding.prototype._computeImageProfile = function () {

	var image 			= this.getProperty ( "image" );
	var imageActive 	= this.getProperty ( "image-active" );
	var imageDisabled 	= this.getProperty ( "image-disabled" );

	imageActive = imageActive ? imageActive : this.isContainer ?
		image ? image : TreeNodeBinding.DEFAULT_FOLDER_OPEN :
		image ? image : TreeNodeBinding.DEFAULT_ITEM;

	imageDisabled = imageDisabled ? imageDisabled : this.isContainer ?
		image ? image : TreeNodeBinding.DEFAULT_FOLDER_DISABLED :
		image ? image : TreeNodeBinding.DEFAULT_ITEM_DISABLED;

	image = image ? image : this.isContainer ?
		TreeNodeBinding.DEFAULT_FOLDER_CLOSED : TreeNodeBinding.DEFAULT_ITEM;

	this.imageProfile = new ImageProfile ({
		image 			: image,
		imageHover 		: null,
		imageActive 	: imageActive,
		imageDisabled 	: imageDisabled
	});
}

/**
 * Assign DOM events.
 * @private
 */
TreeNodeBinding.prototype.assignDOMEvents = function () {

	/*
	 * Note that mouseover and mouseout are only relevant for folders.
	 * TODO: erect a "converttofolder" method to handle this?
	 */
	this.labelBinding.addEventListener ( DOMEvents.DOUBLECLICK, this );
	this.labelBinding.addEventListener ( DOMEvents.MOUSEDOWN, this );
	this.labelBinding.addEventListener ( DOMEvents.MOUSEOVER, this );
	this.labelBinding.addEventListener ( DOMEvents.MOUSEOUT, this );
}

/**
 * Set image.
 * @param {string} url
 */
TreeNodeBinding.prototype.setImage = function ( url ) {

	this.setProperty ( "image", url );
	if ( this.isAttached ) {
		this.labelBinding.setImage ( url );
	}
}

/**
 * Set label.
 * @param {string} label
 */
TreeNodeBinding.prototype.setLabel = function ( label ) {

	this.setProperty ( "label", String ( label ));
	if ( this.isAttached ) {
		this.labelBinding.setLabel ( String ( label ));
	}
}

/**
 * Set tooltip.
 * @param {string} tooltip
 */
TreeNodeBinding.prototype.setToolTip = function ( tooltip ) {

	this.setProperty ( "tooltip", String ( tooltip ));
	if ( this.isAttached ) {
		this.labelBinding.setToolTip ( String ( tooltip ));
	}
}

/**
 * Get image.
 * @return {string}
 */
TreeNodeBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}

/**
 * Get label.
 * @return {string}
 */
TreeNodeBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}


/**
 * Get tooltip.
 * @return {string}
 */
TreeNodeBinding.prototype.getToolTip = function () {

	return this.getProperty ( "tooltip" );
}

/**
 * Compute image.
 * @return {string}
 */
TreeNodeBinding.prototype.computeImage = function () {

	var defaultImage = this.imageProfile.getDefaultImage ();
	var activeImage = this.imageProfile.getActiveImage ();
	activeImage = activeImage ? activeImage : defaultImage;

	return this.isOpen ? activeImage : defaultImage;
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
TreeNodeBinding.prototype.handleEvent = function ( e ) {

	TreeNodeBinding.superclass.handleEvent.call ( this, e );

	var target 		= DOMEvents.getTarget ( e );
	var label		= this.labelBinding.bindingElement;
	var labelBody 	= this.labelBinding.shadowTree.labelBody;
	var labelText	= this.labelBinding.shadowTree.labelText;

	/*
	 * Tree navigation.
	 */
	switch ( e.type ) {

		case DOMEvents.MOUSEDOWN :
			if (target == label) {
				this._onAction(e);
			} else {
				if (!this.isDisabled) {
					this._onFocus(e);
				}
			}
			break;

		case DOMEvents.DOUBLECLICK :
			this._onAction ( e );
			break;

		case UpdateManager.EVENT_AFTERUPDATE :

			/*
			 * Hack a glitch where UpdateManager would
			 * insert treenodes before our label.
			 */
			if ( target.parentNode == this.bindingElement && target.__updateType == Update.TYPE_INSERT ) {
				var label = this.labelBinding.bindingElement;
				if ( DOMUtil.getLocalName ( target ) == "treenode" ) {
					if ( target == this.bindingElement.firstChild ) {
						this.bindingElement.insertBefore ( target, label.nextSibling );
					}
				}
				break;
			}
			break;
	}

	/*
	 * Drag session timeouts.
	 */
	if ( BindingDragger.isDragging && this.isContainer && !this.isOpen ) {
		switch ( e.type ) {
			case DOMEvents.MOUSEOVER :
			case DOMEvents.MOUSEOUT :
			 	switch ( target ) {
					case label :
					case labelBody :
					case labelText :
						this._folderDragOverTimeout ( e );
						break;
				}
				break;
		}
	}
}

/**
 * When dragging over a closed folder, the folder should open.
 * Let's do it by setting and clearing a timeout.
 * @param {MouseEvent} e
 */
TreeNodeBinding.prototype._folderDragOverTimeout = function ( e ) {

	var self = this;
	switch ( e.type ) {
		case DOMEvents.MOUSEOVER :
			this._dragTimeout = this.bindingWindow.setTimeout ( function () {
				self.open ();
			}, 500 );
			break;
		case DOMEvents.MOUSEOUT :
			this.bindingWindow.clearTimeout ( this._dragTimeout );
			break;
	}
}

/**
 * Treenode action.
 * @param {MouseEvent} e
 * @private
 */
TreeNodeBinding.prototype._onAction = function ( e ) {

	var isAction = true;

	if ( e.type == "mousedown" ) {
		var isLeftButton = e.button == ( e.target ? 0 : 1 );
		if ( !isLeftButton ) {
			isAction = false;
		}
	}
	if ( isAction ) {
		if ( this.isContainer ) {
			if ( !this.isOpen ) {
				this.open ();
			} else {
				this.close ();
			}
		} else {
			this.fireCommand ();
		}
	}
}

/**
 * Fire treenode command.
 */
TreeNodeBinding.prototype.fireCommand = function () {

	if ( this.oncommand ) {
		this.oncommand ();
	}
	this.dispatchAction ( TreeNodeBinding.ACTION_COMMAND );
}

/**
 * This will dispatch an event to the containing TreeBinding
 * which in turn will invoke the focus method below.
 * @param {MouseEvent}
 */
TreeNodeBinding.prototype._onFocus = function ( e ) {

	var isMultiSelection = false;
	if ( e != null ) {
		isMultiSelection = e.shiftKey;
	}
	this.dispatchAction ( isMultiSelection ?
		TreeNodeBinding.ACTION_ONMULTIFOCUS :
		TreeNodeBinding.ACTION_ONFOCUS
	);
	if ( e != null ) {
		this.stopPropagation ( e );
	}
	if ( this.onfocus != null ) {
		this.onfocus ();
	}
	if ( e != null ) {
		if ( this.hasCallBackID ()) {
			this.callback ();
		}
	}
}

/**
 * Call the server. This must be done whenever the client is
 * setting the focus; it should not be done when the server
 * is setting the focus. Also invoked by the TreeBinding!
 * @see {TreeBinding#_focusDefault}
 * @returns
 */
TreeNodeBinding.prototype.callback = function () {

	if ( this.hasCallBackID ()) {
		var self = this;
		setTimeout ( function () { // minimize freezing sensation
			self.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
		}, 0 );
	}
}

/**
 * Focus the treenode managed. This method should only be invoked by the {@link TreeBinding}.
 */
TreeNodeBinding.prototype.invokeManagedFocus = function () {

	if ( !this.isFocused ) {
		this.isFocused = true;
		this.setProperty ( "focused", true );
		this.labelBinding.attachClassName ( "focused" );
		this.dispatchAction ( TreeNodeBinding.ACTION_FOCUSED );
	}
}

/**
 * Focus the treenode (public access point).
 */
TreeNodeBinding.prototype.focus = function () {

	this.setProperty ( "focused", true );
	if ( this.isAttached ) {
		this._onFocus ();
	}
}

/**
 * Blur the treenode. This method is invoked by the {@link TreeBinding}.
 */
TreeNodeBinding.prototype.blur = function () {

	if ( this.isFocused ) {
		this.isFocused = false;
		this.deleteProperty ( "focused" );
		this.labelBinding.detachClassName ( "focused" );
		if ( this.onblur ) {
			this.onblur ();
		}
		this.dispatchAction ( TreeNodeBinding.ACTION_BLUR );
	}
}

/**
 * Preventing event propagation internally in the tree
 * while still broadcasting a global mousedown event.
 * @param {MouseEvent} e
 * @private
 */
TreeNodeBinding.prototype.stopPropagation = function ( e ) {

	if ( e.type == "mousedown" ) {
		EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, e );
		this.dispatchAction ( Binding.ACTION_ACTIVATED );
	}
	DOMEvents.stopPropagation ( e );
}

/**
 * Open container.
 */
TreeNodeBinding.prototype.open = function () {

	if ( this.isContainer && !this.isOpen ) {
		this.isOpen = true;
		this.setProperty ( "open", true );
		this.dispatchAction ( TreeNodeBinding.ACTION_OPEN	);
		this.setImage ( this.computeImage ());
		this.updateClassNames ();
		this.hasBeenOpened = true;
	}
}

/**
 * Close container.
 */
TreeNodeBinding.prototype.close = function () {

	if ( this.isContainer && this.isOpen && !this.isPinned) {
		this.isOpen = false;
		this.setProperty ( "open", false );
		this.dispatchAction ( TreeNodeBinding.ACTION_CLOSE );
		this.setImage ( this.computeImage ());
		this.updateClassNames ();
	}
}

/**
 * Updates treenode classnames when a container type node is handled.
 */
TreeNodeBinding.prototype.updateClassNames = function () {

	if ( this.isContainer ) {
		if ( !this.hasClassName ( "container" )) {
			this.attachClassName ( "container" );
		}
		if ( this.isOpen ) {
			this.detachClassName ( "closed" );
			this.attachClassName ( "open" );
			this.labelBinding.detachClassName ( "closed" );
			this.labelBinding.attachClassName ( "open" );
		} else {
			this.detachClassName ( "open" );
			this.attachClassName ( "closed" );
			this.labelBinding.detachClassName ( "open" );
			this.labelBinding.attachClassName ( "closed" );
		}
	} else {
		if ( this.hasClassName ( "container" )) {
			this.detachClassName ( "container" );
			this.labelBinding.detachClassName ( "closed" );
			this.labelBinding.detachClassName ( "open" );
			// TODO: modify this.isOpen property?
		}
	}
}

/**
 * Dispose descendant treenodes.
 */
TreeNodeBinding.prototype.empty = function () {

	var descendants = this.getDescendantBindingsByLocalName ( "treenode" );
	descendants.each ( function ( treenode ) {
		treenode.dispose ();
	});
}

/**
 * Show dragged status.
 * TODO: implement some interface around here!
 */
TreeNodeBinding.prototype.showDrag = function () {

	this.attachClassName ( TreeNodeBinding.CLASSNAME_DRAGGED );
}

/**
 * Hide dragged status.
 * TODO: implement some interface around here!
 */
TreeNodeBinding.prototype.hideDrag = function () {

	this.detachClassName ( TreeNodeBinding.CLASSNAME_DRAGGED );
}

/**
 * Has children?
 * @return {boolean}
 */
TreeNodeBinding.prototype.hasChildren = function () {

	return this.bindingElement.hasChildNodes ();
}

/**
 * Server trying to maintain focus on this treenode?
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 */
TreeNodeBinding.prototype.handleElement = function ( element ) {

	/*
	 * The problem here is that the server may move focus to
	 * this treenode in one postback response, but if the
	 * next response KEEPS he focus there are no CHANGES
	 * to the response. This way, user may be allowed to
	 * change focus in second attempt. Always nice to have
	 * the UI state on both the client and the server...
	 */
	var focused = element.getAttribute ( "focused" );
	if ( focused == "true" ) {
		if ( !this.isFocused ) {
			this.focus ();
		}
	}

	return false; // continue updates as normally!
}

/**
 * TreeNodeBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeNodeBinding}
 */
TreeNodeBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treenode", ownerDocument );
	return UserInterface.registerBinding ( element, TreeNodeBinding );
}