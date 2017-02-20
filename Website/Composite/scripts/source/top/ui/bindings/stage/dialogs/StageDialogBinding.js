StageDialogBinding.prototype = new DialogBinding;
StageDialogBinding.prototype.constructor = StageDialogBinding;
StageDialogBinding.superclass = DialogBinding.prototype;

/**
 * @class
 * The StageDialogBinding builds a bridge between dialogs and pages.
 * TODO: Consider why and how some of this stuff can be moved to regular dialogs.
 */
function StageDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageDialogBinding" );

	/**
	 * @type {ViewBinding}
	 */
	this._viewBinding = null;

	/**
	 * @type {ContextContainer}
	 */
	this._contextContainer = null;

	/**
	 * @type {DialogPageBinding}
	 */
	this._pageBinding = null;

	/**
	 * @type {IDialogResponseHandler}
	 */
	this._dialogResponseHandler = null;

	/**
	 * First loaded PageBinding may set a width and height.
	 * Subsequent PageBindings may only increase the height.
	 * @type {boolean}
	 */
	this._isFirstPage = true;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
StageDialogBinding.prototype.toString = function () {

	return "[StageDialogBinding]";
}

/**
 * @overloads {DialogBinding#onBindingRegister}
 */
StageDialogBinding.prototype.onBindingRegister = function () {

	StageDialogBinding.superclass.onBindingRegister.call ( this );

	this.addActionListener ( PageBinding.ACTION_INITIALIZED );
	this.addActionListener ( PageBinding.ACTION_DETACHED );
	this.addActionListener ( DialogPageBinding.ACTION_RESPONSE );
	this.addActionListener ( Binding.ACTION_INVALID );
	this.addActionListener ( Binding.ACTION_VALID );
	this.addActionListener ( ViewBinding.ACTION_LOADED );
	this.addActionListener ( ViewBinding.ACTION_ONCLOSE );
	this.addActionListener ( ViewBinding.ACTION_CLOSED );
	this.addActionListener ( ErrorBinding.ACTION_INITIALIZE );
	this.addActionListener ( PageBinding.ACTION_UPDATING );
	this.addActionListener ( PageBinding.ACTION_UPDATED );
	this.addActionListener ( DialogBinding.ACTION_CLOSE );

	this.subscribe ( BroadcastMessages.KEY_ESCAPE );
}

/**
 * By default, show only the close control.
 * @overloads {DialogBinding#onBindingAttach}
 */
StageDialogBinding.prototype.onBindingAttach = function () {

	StageDialogBinding.superclass.onBindingAttach.call ( this );
	this.defaultSetup ();
}

/**
 * Prepare new ViewBinding.
 * @param {DialogViewDefinition} definition
 */
StageDialogBinding.prototype.prepareNewView = function ( definition ) {

	if ( definition instanceof DialogViewDefinition ) {

		var viewBinding = ViewBinding.newInstance ( this.bindingDocument );
		viewBinding.setDefinition ( definition );
		viewBinding.setType ( ViewBinding.TYPE_DIALOGVIEW );

		// TODO: move to method
		if ( definition.handler ) {
			if ( Interfaces.isImplemented ( IDialogResponseHandler, definition.handler )) {
				this._dialogResponseHandler = definition.handler;
			} else {
				throw "IDialogResponseHandler not implemented";
			}
		}

		/*
		FLOATING DOCKS!
		var setBinding = UserInterface.getBinding ( this.bindingElement.parentNode );
		viewBinding.snapToBinding ( this._body );
		setBinding.add ( viewBinding );
		*/

		this._viewBinding = viewBinding;
		this._body.add ( viewBinding );
		viewBinding.attach ();
		viewBinding.initialize ();
	}
}




/**
 * @implements {IActionListener}
 * @overloads {DialogBinding#handleAction}
 * @param {Action} action
 */
StageDialogBinding.prototype.handleAction = function ( action ) {

	StageDialogBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {

		case PageBinding.ACTION_INITIALIZED :
			this._handleInitializedPageBinding ( binding );
			action.consume ();
			break;

		case PageBinding.ACTION_DETACHED :
			if ( binding.bindingDocument == this._viewBinding.getContentDocument ()) {
				this._pageBinding = null;
			}
			action.consume ();
			break;

		case DialogPageBinding.ACTION_RESPONSE :
			if ( binding.response ) {
				this._handleDialogPageResponse ( binding );
			}
			action.consume ();
			break;

		case Binding.ACTION_INVALID :
			this._disableDialogAcceptButton ( true );
			action.consume ();
			break;

		case Binding.ACTION_VALID :
			this._disableDialogAcceptButton ( false );
			action.consume ();
			break;

		case ViewBinding.ACTION_ONCLOSE :
			this.close ();
			action.consume ();
			break;

		case ViewBinding.ACTION_CLOSED :
			this._isFirstPage = true;
			action.consume ();
			break;

		case ErrorBinding.ACTION_INITIALIZE :
			action.consume ();
			break;

		case PageBinding.ACTION_UPDATING :
			this._isUpdating = true;
			action.consume ();
			break;

		case PageBinding.ACTION_UPDATED :
			if ( this._isUpdating ) {
				this._isUpdating = false;
				this._fit ();
			}
			action.consume ();
			break;

		/*
		 * TODO: Are we adding this listener in the first place?
		 */
		case Binding.ACTION_UPDATED :
			if ( !this._isUpdating ) {
				this._fit ();
			}
			action.consume ();
			break;

		case DialogBinding.ACTION_CLOSE :
			if ( binding == this ) {
				this._viewBinding.dispose ();
				this.defaultSetup ();
			}
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
StageDialogBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	StageDialogBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	switch ( broadcast ) {

		case BroadcastMessages.KEY_ESCAPE :
			if ( this.isVisible == true ) { // RENAME ISOPEN!
				if ( !PopupBinding.hasActiveInstances ()) {
					this._defaultClose ();
				}
			}
			break;
	}
}

/**
 * Release the FitnessCrawler. Fit all members.
 * @param {boolean} isForce
 */
StageDialogBinding.prototype._fit = function ( isForce ) {

	var crawler = new FitnessCrawler ();
	var list = new List ();
	if ( isForce ) {
		crawler.mode = FitnessCrawler.MODE_BRUTAL;
	}
	crawler.crawl ( this.bindingElement, list );
	crawler.dispose ();

	if ( list.hasEntries ()) {
		/*
		 * Fit all fitness members, starting from the innermost
		 * location in the subtree. Then dispose the member list.
		 */
		list.reverse ();
		list.each ( function ( binding ) {
			binding.fit ( isForce );
		});
		list.dispose ();
		this._fitMe ();
	}
};

/**
 * Keeping myself fit.
 * @param {List<IFit>}
 */
StageDialogBinding.prototype._fitMe = function () {

	if ( this._pageBinding != null ) {

		this._pageBinding.enableAutoHeightLayoutMode ( true );
		this._fixAutoHeight ( this._pageBinding );
		this._pageBinding.enableAutoHeightLayoutMode ( false );

		var height = this.getDimension ().h;
		this.reflex ( true );

		// Still the same height? Explorer can mess it up here.
		var self = this;
		if ( this.getDimension ().h == height ) {
			var self = this;
			setTimeout ( function () {
				self.reflex ( true );
			}, 0 );
		}
	}
}

/**
 * @param {MenuItemBinding} menuItemBinding
 */
StageDialogBinding.prototype._handleContextMenuItemBinding = function ( menuItemBinding ) {

	var cmd = menuItemBinding.getProperty ( "cmd" );

	switch ( cmd ) {
		case DialogTitleBarPopupBinding.CMD_CLOSE :
			this._defaultClose ();
			break;
		case DialogTitleBarPopupBinding.CMD_REFRESH :
			this._titlebar.setLabel ( DockTabBinding.LABEL_TABLOADING );
			this._titlebar.setImage ( DockTabBinding.IMG_TABLOADING );
			this._pageBinding = null;
			this._viewBinding.reload ( Application.isDeveloperMode );
			break;
		case DialogTitleBarPopupBinding.CMD_VIEWSOURCE :
		case DialogTitleBarPopupBinding.CMD_VIEWGENERATED :
		case DialogTitleBarPopupBinding.CMD_VIEWSERIALIZED :
			this._viewSource ( cmd );
			break;
		default :
			alert ( "TODO!" );
			break;
	}
}

/**
 * View source.
 * @param {string} cmd
 */
StageDialogBinding.prototype._viewSource = DockTabBinding.prototype._viewSource;

/**
 * @param {PageBinding} pageBinding
 */
StageDialogBinding.prototype._handleInitializedPageBinding = function ( pageBinding ) {

	if ( pageBinding.bindingDocument == this._viewBinding.getContentDocument ()) {

		if ( pageBinding instanceof DialogPageBinding ) {
			if ( this._pageBinding == null ) { // grab image and label only from first page!
				this._parsePageBinding ( pageBinding );
			}
			this._pageBinding = pageBinding;
			if ( pageBinding.height == "auto" ) {
				pageBinding.enableAutoHeightLayoutMode ( true );
				this._fixAutoHeight ( pageBinding );
				pageBinding.enableAutoHeightLayoutMode ( false );
				this.reflex ( true );
			}
		}
		if ( StatusBar.state == StatusBar.BUSY ) {
			StatusBar.clear ();
		}
		if ( this._isFirstPage ) {
			EventBroadcaster.broadcast ( BroadcastMessages.VIEW_COMPLETED, this._viewBinding.getHandle ());
			EventBroadcaster.broadcast ( BroadcastMessages.STAGEDIALOG_OPENED );
		}

	} else if ( pageBinding.isDialogSubPage ) {

		this._pageBinding.enableAutoHeightLayoutMode ( true );
		this._fixAutoHeight ( pageBinding );
		this._pageBinding.enableAutoHeightLayoutMode ( false );

		this._fit ( true );
		this.reflex ( true );
	}

	/*
	 * Flip this flag!
	 */
	this._isFirstPage = false;
}

/**
 * TODO: store a local isValid variable and re-do this on wizard page load!
 * @param {boolean} isDisabled
 */
StageDialogBinding.prototype._disableDialogAcceptButton = function ( isDisabled ) {

	var buttonElement = this._viewBinding.getContentDocument ().getElementById ( "dialogacceptbutton" );
	if ( buttonElement ) {
		var buttonBinding = UserInterface.getBinding ( buttonElement );
		buttonBinding.setDisabled ( isDisabled );
	}
}

/**
 * Handle DialogPage response.
 * @param {DialogPageBinding} binding
 */
StageDialogBinding.prototype._handleDialogPageResponse = function (binding) {

	// TODO: rig this up so that we close the dialog before handling the response!
	if (this._dialogResponseHandler != null) {
		this._dialogResponseHandler.handleDialogResponse(
			binding.response, binding.result != null ? binding.result : null
		);
	}

	var self = this;
	setTimeout(function () {
		self.close();
	}, 0);
}

/**
 * Make sure that the close button fires a returnvalue of "cancel".
 * @overloads {DialogBinding#handleInvokedControl}
 * @param {ControlBinding} control
 */
StageDialogBinding.prototype.handleInvokedControl = function ( control ) {

	if ( control.controlType == ControlBinding.TYPE_CLOSE ) {
		this._defaultClose ();
	}

	StageDialogBinding.superclass.handleInvokedControl.call ( this, control );
}

/**
 * Assinging contextmenu to titlebar.
 * @overloads {DialogBinding#buildDescendantBindings}
 */
StageDialogBinding.prototype.buildDescendantBindings = function () {

	StageDialogBinding.superclass.buildDescendantBindings.call ( this );
	this._titlebar.setContextMenu ( app.bindingMap.dialogtitlebarpopup );

	/*
	 * Note that this overwrites!
	 */
	var self = this;
	this._titlebar.handleAction = function ( action ) {
		switch ( action.type ) {
			case MenuItemBinding.ACTION_COMMAND :
				if ( action.listener == this.contextMenuBinding ) {
			 		self._handleContextMenuItemBinding ( action.target );
			 	}
			 	break;
		}
	}
}

/**
 * Parse contained DialogPageBinding.
 * @param {DialogPageBinding} pageBinding
 */
StageDialogBinding.prototype._parsePageBinding = function ( pageBinding ) {

	var label		= pageBinding.label;
	var image 		= pageBinding.image;
	var width 		= pageBinding.width;
	var height		= pageBinding.height;
	var controls 	= pageBinding.controls;
	var isResizable = pageBinding.isResizable;

	if ( label ) {
		this.setLabel ( label );
	}
	if ( image ) {
		this.setImage ( image );
	}
	if ( width || height ) {

		var old = this.getDimension ();
		var nev = new Dimension ();

		if ( this._isFirstPage ) { // only set width on first page!
			nev.w = width ? width : old.w;
		} else {
			nev.w = old.w;
		}
		nev.h = ( height != null && height != "auto" ) ? height : old.h; // never set height on autoheight dialogs!

		if (this._isResizable) {
			nev.h = (top.window.innerHeight < nev.h) ? top.window.innerHeight : nev.h;
			nev.w = ( top.window.innerWidth < nev.w) ? top.window.innerWidth : nev.w;
		}

		this.setDimension ( nev );
	}
	if ( controls ) {
		this.controlBindings [ ControlBinding.TYPE_MAXIMIZE ].hide ();
		this.controlBindings [ ControlBinding.TYPE_MINIMIZE ].hide ();
		this.controlBindings [ ControlBinding.TYPE_CLOSE ].hide ();
		var type, types = new List ( controls.split ( " " ));
		while (( type = types.getNext ()) != null ) {
			this.controlBindings [ type ].show ();
		}
	}

	if ( isResizable != this._isResizable ) {
		this.setResizable ( isResizable );
	}
	if ( height == "auto" ) {
		this._fixAutoHeight ( pageBinding );
	}
	if ( pageBinding == this._pageBinding ) { // only on dialog open!
		this.centerOnScreen ();
	}
	if ( !this.isOpen ) {
		this.reflex ( true );
		this.open ( true );
	}
}

/**
 * Fix auto height.
 * @param {PageBinding} pageBinding
 */
StageDialogBinding.prototype._fixAutoHeight = function ( pageBinding ) {

	var dim = this.getDimension ();
	var width = 0;
	var height = 0;

	if ( pageBinding.isDialogSubPage ) {
		pageBinding = this._pageBinding;
	}
	if ( this._isFirstPage ) {
		width = pageBinding.width != null ? pageBinding.width : dim.w;
	} else {
		width = dim.w;
	}
	height = pageBinding.bindingElement.offsetHeight;
	height += this._titlebar.bindingElement.offsetHeight;

	var padding = CSSComputer.getPadding(this.bindingElement);
	var border = CSSComputer.getBorder(this.bindingElement);
	height += padding.top + padding.bottom;
	height += border.top + border.bottom;



	//if ( height < dim.h ) { // never shrink the dialog - only expand it.
	//	height = dim.h;
	//}
	if ( pageBinding.minheight != null ) { // consider minheight!
		if ( height < pageBinding.minheight ) {
			height = pageBinding.minheight;
		}
	}

	//don't set height more than client height;
	height = (top.window.innerHeight < height) ? top.window.innerHeight : height;

	this.setDimension(new Dimension(width, height));

	//fit position with new height
	this.startPoint = this.getPosition();
	this._setComputedPosition(
			new Point(0, 0)
	);
}

/**
 * Default close. This will return a "cancel" to any response handler.
 * TODO: rig this up so that we close the dialog before handling the response!
 */
StageDialogBinding.prototype._defaultClose = function () {

	if ( this._dialogResponseHandler != null ) {
		this._dialogResponseHandler.handleDialogResponse (
			Dialog.RESPONSE_CANCEL
		);
	}
	this.close ();
}

/**
 * Focucs content when opened.
 */
StageDialogBinding.prototype.open = function () {

	StageDialogBinding.superclass.open.call ( this );
	if ( this.isVisible == true ) {
		this._viewBinding.onActivate ();
	}
}

/**
 * Revert to default setup on dialog exit.
 * @overloads {DialogBinding#close}
 *
StageDialogBinding.prototype.close = function () {

	StageDialogBinding.superclass.close.call ( this );

	if ( !Client.hasTransitions ) {
		this._viewBinding.dispose ();
		this.defaultSetup ();
	} else {
		var self = this;
		setTimeout ( function () { // wait for CSS transition fadeout
			self._viewBinding.dispose ();
			self.defaultSetup ();
		}, Animation.DEFAULT_TIME );
	}
}
*/

/**
 * Invoke default setup on dialog close.
 */
StageDialogBinding.prototype.defaultSetup = function () {

	this.setImage ( LabelBinding.DEFAULT_IMAGE );
	this.setLabel ( "" );
	this.setDimension ( new Dimension ( DialogBinding.DEFAULT_WIDTH, DialogBinding.DEFAULT_HEIGHT ));

	this.controlBindings [ ControlBinding.TYPE_MAXIMIZE ].hide ();
	this.controlBindings [ ControlBinding.TYPE_MINIMIZE ].hide ();
	this.controlBindings [ ControlBinding.TYPE_CLOSE ].show ();

	this._pageBinding = null;
	this._dialogResponseHandler = null;

	if ( !this._isResizable ) {
		this.setResizable ( true );
	}
}

/**
 * Set position.
 * @param {Point} p
 */
StageDialogBinding.prototype.setPosition = function ( p ) {

	StageDialogBinding.superclass.setPosition.call ( this, p );
	this._body.dispatchAction (
		Binding.ACTION_POSITIONCHANGED
	);
}


/**
 * Set dimension.
 * @param {Dimension} dim
 */
StageDialogBinding.prototype.setDimension = function ( dim ) {

	StageDialogBinding.superclass.setDimension.call ( this, dim );
	this._body.dispatchAction (
		Binding.ACTION_DIMENSIONCHANGED
	);
}

/**
 * Activate.
 * @implements {IActivatable}
 * @overloads {DialogBinding#activate}
 */
StageDialogBinding.prototype.activate = function () {

	if ( !this.isActive ) {
		StageDialogBinding.superclass.activate.call ( this );
		this._viewBinding.onActivate ();
	}
}

/**
 * Deactivate.
 * @implements {IActivatable}
 * @overloads {DialogBinding#activate}
 */
StageDialogBinding.prototype.deActivate = function () {

	if ( this.isActive == true ) {
		StageDialogBinding.superclass.deActivate.call ( this );
		this._viewBinding.onDeactivate ();
	}
}

/**
 * @implements {IContextContainerBinding}
 */
StageDialogBinding.prototype.getContextContainer = function () {

	return this._contextContainer;
}

/**
 * @implements {IContextContainerBinding}
 */
StageDialogBinding.prototype.setContextContainer = function (contextContainer) {

	this._contextContainer = contextContainer;
}


/**
 * StageDialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {StageDialogBinding}
 */
StageDialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialog", ownerDocument );
	var binding = UserInterface.registerBinding ( element, StageDialogBinding );
	binding.setProperty ( "controls", "minimize maximize close" );
	return binding;
}