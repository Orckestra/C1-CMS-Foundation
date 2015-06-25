DialogBinding.prototype = new ControlBoxBinding;
DialogBinding.prototype.constructor = DialogBinding;
DialogBinding.superclass = ControlBoxBinding.prototype;

DialogBinding.MODE_DRAGGING	= "dialogdragging";
DialogBinding.MODE_RESIZING = "dialogresizing";
DialogBinding.ACTION_OPEN = "dialogopen";
DialogBinding.ACTION_CLOSE = "dialogclose";
DialogBinding.DEFAULT_WIDTH = 540;
DialogBinding.DEFAULT_HEIGHT = 100;

/**
 * @class
 * @implements {IActivatable}
 */
function DialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogBinding" );
	
	/**
	 * Don't flex unless maximized - and we do not yet support maximization.
	 * @overloads {FlexBoxBinding#isFlexible}
	 */
	this.isFlexible = false;
	
	/**
	 * @type {DialogHeadBinding}
	 */
	this._head = null;
	
	/**
	 * @type {DialogBodyBinding}
	 */
	this._body = null;
	
	/**
	 * @type {DialogCoverBinding}
	 */
	this._cover = null;
	
	/**
	 * @type {TitleBarBinding}
	 */
	this._titlebar = null;
	
	/**
	 * This property is set to an instance of {@link DialogBorderBinding} when resizing.
	 * @type {DialogBorderBinding}
	 */
	this._border = null;
	
	/**
	 * Relevant for dragging scenario.
	 * @type {Point}
	 */
	this.startPoint = null;
	
	/**
	 * Stores position and dimension data.
	 * @type {object}
	 */
	this.geometry = null;
	
	/**
	 * @type {boolean}
	 */
	this.isActive = false;
	
	/**
	 * @type {boolean}
	 */
	this.isActivatable = false;
	
	/**
	 * TODO: RENAME ISOPEN!
	 * @type {boolean}
	 */
	this.isVisible = false;
	
	/**
	 * @type {boolean}
	 */
	this._isResizable = true;
	
	/**
	 * @type {boolean}
	 */
	this.isDialogResizable = true;
	
	/**
	 * @type {boolean}
	 */
	this.isModal = false;
	
	/**
	 * @type {string}
	 */
	this.mode = null;
	
	/**
	 * @type {HashMap<string><ControlBinding>}
	 */
	this.controlBindings = {};
	
	/**
	 * @type {int}
	 */
	this._index = null;
	
	/**
	 * THIS SHOULD BE DECLARED
	 * @type {Dimension}
	 *
	this.startDimension = null;
	*/
	
	/**
	 * Use fancy CSS transitions? Disabled for now...
	 * @type {boolean}
	 */
	this._hasTransitions = false; // Client.hasTransitions
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DialogBinding.prototype.toString = function () {

	return "[DialogBinding]";
}

/*
 * Overloads {FlexBoxBinding#onBindingRegister}
 */
DialogBinding.prototype.onBindingRegister = function () {

	DialogBinding.superclass.onBindingRegister.call ( this ); 
	
	this.addActionListener ( Binding.ACTION_DRAG, this );
	this.addActionListener ( FocusBinding.ACTION_ACTIVATED );
	this.subscribe ( this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST );
	
	this.buildDescendantBindings ();
}

/**
 * Overloads {Binding#onBindingAttach}
 */
DialogBinding.prototype.onBindingAttach = function () {

	DialogBinding.superclass.onBindingAttach.call ( this );
	this.geometry = this.computeDefaultGeometry ();
	
	this.parseDOMProperties ();
	this.buildControlBindings ();
	this.buildBorderBindings ();
	this.attachRecursive ();
	
	if ( this._isResizable ) {
		this.attachClassName ( "resizable" );	
	}
	
	if ( this._hasTransitions ) {
		this.bindingElement.style.opacity = "0";
	}
	
	this.setPosition ( new Point ( 0, 0 ));
	this.setDimension ( new Dimension ( DialogBinding.DEFAULT_WIDTH, DialogBinding.DEFAULT_HEIGHT ));
	if ( this.getProperty ( "open" )) {
		this.open ();
	}
}

/**
 * Build descendant bindings.
 * TODO: finally overwrite the add method?
 */
DialogBinding.prototype.buildDescendantBindings = function () {

	// these are always appended dynamically
	this._head = DialogHeadBinding.newInstance ( this.bindingDocument );
	this._titlebar = DialogTitleBarBinding.newInstance ( this.bindingDocument );

	this.addFirst ( this._head );
	this._head.add ( this._titlebar );

	// the dialog body may be declared; if not, we append it dynamically
	var dialogbody = DOMUtil.getElementsByTagName ( this.bindingElement, "dialogbody" ).item ( 0 );	
	if ( dialogbody ) {
		this._body = UserInterface.getBinding ( dialogbody );
	} else {
		this._body = DialogBodyBinding.newInstance ( this.bindingDocument );
		this.add ( this._body );
	}
}

/**
 * Build borders.
 */
DialogBinding.prototype.buildBorderBindings = function () {

	var directions = new List ([ 
		DialogBorderBinding.TYPE_NORTH,
		DialogBorderBinding.TYPE_SOUTH,
		DialogBorderBinding.TYPE_EAST,
		DialogBorderBinding.TYPE_WEST
	]);
	while ( directions.hasNext ()) {
		var border = DialogBorderBinding.newInstance ( this.bindingDocument );
		border.setType ( directions.getNext ());
		this.add ( border );
	}
}

/**
 * Build dialog controls.
 */
DialogBinding.prototype.buildControlBindings = function () {
	
	var controls = this.getProperty ( "controls" );
	if ( controls ) {
		var types = new List ( controls.split ( " " ));
		while ( types.hasNext ()) {
			var type = types.getNext ();
			switch ( type ) {
				case ControlBinding.TYPE_MAXIMIZE :
				case ControlBinding.TYPE_MINIMIZE :
				case ControlBinding.TYPE_CLOSE :
					var controlBinding = DialogControlBinding.newInstance ( this.bindingDocument );
					controlBinding.setControlType ( type );
					this._titlebar.addControl ( controlBinding );
					this.controlBindings [ type ] = controlBinding;
					break;
				default :
					throw new Error ( 
						"DialogBinding: Control not added: " + type
					);
					break;
			}
		}
	}
}

/**
 * Build and configure a {@link DialogCoverBinding}
 */
DialogBinding.prototype.buildDialogCoverBinding = function () {
	
	this._cover = DialogCoverBinding.newInstance ( this.bindingDocument );
	this.getAncestorBindingByLocalName ( "dialogset" ).add ( this._cover );
	this._cover.cover ( this);
}

/**
 * Parse DOM properties.
 */
DialogBinding.prototype.parseDOMProperties = function () {

	var image 		= this.getProperty ( "image" );
	var label 		= this.getProperty ( "label" );
	var draggable 	= this.getProperty ( "draggable" );
	var resizable 	= this.getProperty ( "resizable" );
	var modal 		= this.getProperty ( "modal" );
	
	if ( image ) {
		this.setImage ( image );
	}
	if ( label ) {
		this.setLabel ( label );
	}
	if ( draggable == false ) {
		this.isDialogDraggable = false;
	}
	if ( resizable == false ) {
		this.isPanelResizable = false;
	}
	if ( modal == true ) {
		this.setModal ( true );
	}
}

/**
 * Set modal.
 * @param {boolean} isModal
 */
DialogBinding.prototype.setModal = function ( isModal ) {
	
	this.isModal = isModal;
}

/**
 * Set label.
 * @param {string} label
 */
DialogBinding.prototype.setLabel = function ( label ) {

	this.setProperty ( "label", label );
	if ( this.isAttached == true ) {
		this._titlebar.setLabel ( 
			Resolver.resolve ( label )
		) 
	};
}

/**
 * Get label.
 * @return {string}
 */
DialogBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}

/**
 * Set image.
 * @param {string} url
 */
DialogBinding.prototype.setImage = function ( url ) {

	this.setProperty ( "image", url );
	if ( this.isAttached ) {
		this._titlebar.setImage ( 
			Resolver.resolve ( url )
		) 
	};
}

/**
 * @overloads {ControlBoxBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
DialogBinding.prototype.handleAction = function ( action ) {
	
	DialogBinding.superclass.handleAction.call ( this, action );
		
	switch ( action.type ) {
	
		case Binding.ACTION_DRAG :
			
			var binding = action.target;		
			if ( this.getState () == ControlBoxBinding.STATE_NORMAL ) {
				switch ( binding.constructor ) {
					case DialogTitleBarBinding :	
						this.mode = DialogBinding.MODE_DRAGGING;
						binding.dragger.registerHandler ( this );
						break;
					case DialogBorderBinding :
						if ( this._isResizable ) {
							this.mode = DialogBinding.MODE_RESIZING;
							this._border = binding;
							binding.dragger.registerHandler ( this );
						}
						break;
				}
			}
			action.consume ();
			break;
		
		case Binding.ACTION_ACTIVATED : 
			if ( !this.isActive ) {
				this.activate ();
			}
			action.consume ();
			break;
			
		/*
		case FocusBinding.ACTION_ACTIVATED :
			
			/*
			 * Simply consume the action. The FocusBinding 
			 * can now analyze the action to get a handle on 
			 * this DialogBinding.
			 *
			this.focusBinding = binding;
			action.consume ();
			break;
		*/
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
DialogBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	DialogBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST :
			this.startPoint = this.getPosition ();
			this._setComputedPosition ( 
				new Point ( 0, 0 )
			);
			break;
	}
}

/**
 * Invoked when descendant controls fire.
 * @overloads {ControlBoxBinding#handleInvokedControl}
 * @param {ControlBinding} control
 */
DialogBinding.prototype.handleInvokedControl = function ( control ) {
	
	DialogBinding.superclass.handleInvokedControl.call ( this, control );
	
	switch ( control.controlType ) {
		case ControlBinding.TYPE_CLOSE :
			this.close ();
			break;
	}
}

/**
 * Open dialog.
 * @param {boolean} isAutoHeight Needed to fix an IE bug, see {@link StageDialogBinding#_parsePageBinding} 
 */
DialogBinding.prototype.open = function ( isAutoHeight ) {
	
	if ( this.isModal && this._cover == null ) {
		this.buildDialogCoverBinding ();
	}
	if ( !this.isVisible ) { // WHEN RENAMING THIS TO ISOPEN, SEE STAGEDIALOGBINDING ESCAPE STUFF
	
		this.setProperty ( "open", "true" );
		this.isVisible = true;
		this.isActivatable = true;
		this.activate ();
		
		if ( isAutoHeight ) {
			/*
			 * centering and flexing needs to be performed 
			 * after this method, see StageDialogBinding
			 */
		} else {
			this.centerOnScreen ();
			this.reflex ( true );
		}
		
		this.bindingElement.style.marginTop = "0";
		this.dispatchAction ( DialogBinding.ACTION_OPEN );
		this.dispatchAction ( Binding.ACTION_VISIBILITYCHANGED );
		
		if ( this._hasTransitions ) {
			this.bindingElement.style.opacity = "1";
		}
	}
}

/**
 * Close dialog.
 */
DialogBinding.prototype.close = function () {
	
	if ( this.isVisible ) {
		
		this.isActivatable = false;
		this.deActivate ();
		
		var self = this;
		function doit () {
			
			self.isVisible = false;
			self.deleteProperty ( "open" );
			
			self.bindingElement.style.marginTop = "-10000px";
			self.dispatchAction ( DialogBinding.ACTION_CLOSE );
		}
		
		if ( !this._hasTransitions ) {
			setTimeout ( function () { doit (); }, 0);
		} else {
			var element = self.bindingElement;
			setTimeout ( function () {
				element.style.opacity = "0";
				setTimeout ( function () {
					doit ();
				}, Animation.DEFAULT_TIME );
			}, Animation.DEFAULT_TIME );
		}
	}
}

/**
 * Activate.
 * @implements {IActivatable}
 */
DialogBinding.prototype.activate = function () {

	if ( !this.isActive ) {
		this.isActive = true;
		this.attachClassName ( "active" );
		this.moveToTop ();
		this._titlebar.onActivate ();
		Application.activate ( this );
	}
}

/**
 * Deactivate.
 * @implements {IActivatable}
 */
DialogBinding.prototype.deActivate = function () {

	if ( this.isActive == true ) {			
		this.isActive = false;
		this.detachClassName ( "active" );
		this._titlebar.onDeactivate ();
		Application.deActivate ( this );
	}
}

/**
 * Move panel to highest z-index. Invoked when dialog is activated.
 */
DialogBinding.prototype.moveToTop = function () {
	
	/*
	 * First event intercepted by the DialogSetBinding.
	 * Second event intercepted by the DialogCoverBinding (if present).
	 */
	this.dispatchAction ( Binding.ACTION_MOVETOTOP );
	this.dispatchAction ( Binding.ACTION_MOVEDONTOP );
}

/** 
 * Get z-index.
 * @return {int}
 */
DialogBinding.prototype.getZIndex = function () {
	
	return CSSComputer.getZIndex ( this.bindingElement );
}

/** 
 * Set z-index.
 * @param {int} index
 */
DialogBinding.prototype.setZIndex = function ( index ) {
	
	this.bindingElement.style.zIndex = new String ( index );
}

/**
 * @param {Point} point This argument is not used.
 */
DialogBinding.prototype.onDragStart = function ( point ) {

	switch ( this.mode ) {
		case DialogBinding.MODE_DRAGGING :
		case DialogBinding.MODE_RESIZING :
			this.startPoint = new Point (
				this.bindingElement.offsetLeft,
				this.bindingElement.offsetTop
			);
			this.startDimension = new Dimension (
				this.bindingElement.offsetWidth,
				this.bindingElement.offsetHeight
			);
			break;
	}
}

/**
 * @param {Point} diff
 */
DialogBinding.prototype.onDrag = function ( diff ) {
	
	switch ( this.mode ) {
		case DialogBinding.MODE_DRAGGING :
			this._setComputedPosition ( diff );
			break;
		case DialogBinding.MODE_RESIZING :
			switch ( this._border.getType ()) {
				case DialogBorderBinding.TYPE_NORTH :
					this.resizeNorth ( diff );
					break;
				case DialogBorderBinding.TYPE_SOUTH :
					this.resizeSouth ( diff );
					break;
				case DialogBorderBinding.TYPE_EAST :
					this.resizeEast ( diff );
					break;
				case DialogBorderBinding.TYPE_WEST :
					this.resizeWest ( diff );
					break;
			}
			
			/*
			 * notice the boolean parameter, invoking fast screen update. 
			 * This could potentially threaten Explorer if the dialog 
			 * contains lots of stuff. This works terrible in Mozilla!
			 */
			this.reflex ( true );
			break;
	}
}

/**
 * @param {Point} diff
 */
DialogBinding.prototype.onDragStop = function ( diff ) {

	switch ( this.mode ) {
		case DialogBinding.MODE_DRAGGING :
			this._setComputedPosition ( diff );
			break;
		case DialogBinding.MODE_RESIZING :
			break;
	}
	this.mode = null;
}

/**
 * Resize north.
 * @param {Point} diff
 */
DialogBinding.prototype.resizeNorth = function ( diff ) {

	this.setPosition ( new Point ( this.startPoint.x, this.startPoint.y + diff.y ));
	this.setDimension ( new Dimension ( this.startDimension.w, this.startDimension.h - diff.y ));
}

/**
 * Resize south.
 * @param {Point} diff
 */
DialogBinding.prototype.resizeSouth = function ( diff ) {

	this.setDimension ( new Dimension ( this.startDimension.w, this.startDimension.h + diff.y ));
}

/**
 * Resize east.
 * @param {Point} diff
 */
DialogBinding.prototype.resizeEast = function ( diff ) {

	this.setDimension ( new Dimension ( this.startDimension.w + diff.x, this.startDimension.h ));
}

/**
 * Resize west.
 * @param {Point} diff
 */
DialogBinding.prototype.resizeWest = function ( diff ) {

	this.setPosition ( new Point ( this.startPoint.x + diff.x, this.startPoint.y ));
	this.setDimension ( new Dimension ( this.startDimension.w - diff.x, this.startDimension.h ));
	
}

/**
 * Keep dialog on screen.
 * @param {Point} diff
 */
DialogBinding.prototype._setComputedPosition = function ( diff ) {

 	var win = this.bindingWindow.WindowManager.getWindowDimensions ();
 	var dim = this.getDimension ();
 	
	var x = this.startPoint.x + diff.x;
	var y = this.startPoint.y + diff.y;
	
	x = x < 0 ? 0 : x + dim.w > win.w ? win.w - dim.w : x;
	y = y < 0 ? 0 : y + dim.h > win.h ? win.h - dim.h : y;
	
	this.setPosition ( new Point (  x, y ));
}

/**
 * Set position.
 * @param {Point} p 
 */
DialogBinding.prototype.setPosition = function ( p ) {
	
	var x = p.x;
	var y = p.y;
	
	x = Math.round ( x );
	this.bindingElement.style.left = x + "px";
	this.geometry.x = x;

	y = Math.round ( y );
	this.bindingElement.style.top = y + "px";
	this.geometry.y = y;

}

/**
 * Get position.
 * @return {Point}
 */
DialogBinding.prototype.getPosition = function () {

	return new Point ( 
		this.geometry.x,
		this.geometry.y 
	);
}

/**
 * Set Dimension.
 * @param {number} w
 * @param {number} h
 */
DialogBinding.prototype.setDimension = function ( dim ) {
	
	if ( !dim ) {
		SystemDebug.stack ( arguments );
	}
	
	var w = dim.w;
	var h = dim.h;
	
	w = Math.round ( w );
	this.bindingElement.style.width = w + "px";
	this.geometry.w = w;
	h = Math.round ( h );
	this.bindingElement.style.height = h + "px";
	this.geometry.h = h;

}

/**
 * Get dimension.
 * @return {Dimension}
 */
DialogBinding.prototype.getDimension = function () {

	return new Dimension ( 
		this.geometry.w,
		this.geometry.h 
	);
}

/**
 * Set resizable.
 * @param {boolean} isResizable
 */
DialogBinding.prototype.setResizable = function ( isResizable ) {
	
	if ( this._isResizable != isResizable ) {
		if ( isResizable ) {
			this.attachClassName ( "resizable" );
		} else {
			this.detachClassName ( "resizable" );
		}
		this._isResizable = isResizable;
	}
}

/**
 * Compute default geometry. This is pretty lame.
 * @return {object}
 */
DialogBinding.prototype.computeDefaultGeometry = function () {
	
	var result	= null;
	var width 	= this.bindingDocument.body.offsetWidth;
	var height 	= this.bindingDocument.body.offsetHeight;
	
	result = {
		x : 0.125 * width,
		y : 0.125 * height,
		w : 0.750 * width,
		h : 0.500 * height
	}
	return result;
}

/**
 * This actually centers the dialog in the containing *window*.
 */
DialogBinding.prototype.centerOnScreen = function () {
	
	var winDim = this.bindingWindow.WindowManager.getWindowDimensions ();
	var dim = this.getDimension ();
	
	this.setPosition ( new Point (
			0.5 * ( winDim.w - dim.w ),
			0.5 * ( winDim.h - dim.h )
		)
	)
}

/**
 * This method is invoked on modal panels by the {@link DialogCoverBinding}.
 */
DialogBinding.prototype.alert = function () {
	
	var binding = this;
	var i = 0;
	
	function blink () {
		if ( i % 2 == 0 ) {
			binding.detachClassName ( "active" );
		} else {
			binding.attachClassName ( "active" );
		}
		if ( i++ < 7 ) {
			setTimeout ( blink, 50 );
		}
	};
	blink ();
}

/**
 * Set dialog controls, disposing existing controls.
 * TODO: method not tested.
 * @param {List<string>} list
 */
DialogBinding.prototype.setControls = function ( list ) {
	
	for ( var type in this.controlBindings ) {
		this.controlBindings [ type ].dispose ();
	}
	var controls = "";
	while ( list.hasNext ()) {
		var type = list.getNext ();
		controls += type + list.hasNext () ? " " : "";
	}
	this.setProperty ( "controls", controls );
	
	if ( this.isAttached ) {
		this.buildControlBindings ();
	}
}

/**
 * DialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogBinding}
 */
DialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialog", ownerDocument );
	return UserInterface.registerBinding ( element, DialogBinding );
}