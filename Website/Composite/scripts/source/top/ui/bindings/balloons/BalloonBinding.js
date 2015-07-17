BalloonBinding.prototype = new Binding;
BalloonBinding.prototype.constructor = BalloonBinding;
BalloonBinding.superclass = Binding.prototype;

/**
 * Time before each position update in milliseconds. 
 * Also the timeout before balloon is shown, for some reason.
 */
BalloonBinding.TIMEOUT = parseInt ( 200 );

/*
 * Position offsets. Attempting to place 
 * the balloon elegantly relative to binding.
 */
BalloonBinding.OFFSET_X =  parseInt ( 14 );
BalloonBinding.OFFSET_Y =  parseInt ( 6 );

/*
 * 
 */
BalloonBinding.ACTION_SNAP = "balloon snap";

/**
 * Classname attached to a left hand balloon.
 */
BalloonBinding.CLASSNAME_LEFT = "left";

/**
 * Used to locate an appropriate balloon environment. 
 * TODO: Design para-frame binding type locator? For now, 
 * environments need to be made aware of the BallonBinding.
 */
BalloonBinding.ACTION_INITIALIZE = "ballon initialize";

/**
 * @class
 */
function BalloonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BalloonBinding" );
	
	/**
	 * We snap to this binding.
	 * @type {IData}
	 */
	this._snapTargetBinding = null;
	
	/**
	 * We nondisplay the balloon when outside the boundaries of this binding. 
	 * Typically a DockBinding, a DialogBinding or a ScrollBoxBinding.
	 * @type {Binding}
	 */
	this._environmentBinding = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BalloonBinding.prototype.toString = function () {
	
	return "[BalloonBinding]";
}

/**
 * Note that the binding is *invisible* when created!
 * @see {BalloonBinding#newInstance}
 * @overloads {Binding#onBindintAttach}
 */
BalloonBinding.prototype.onBindingAttach = function () {
	
	BalloonBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( Binding.ACTION_ACTIVATED );
	this.addActionListener ( ControlBinding.ACTION_COMMAND );
	
	/*
	 * Build close button.
	 */
	this._controlGroupBinding = this.add (
		ControlGroupBinding.newInstance ( this.bindingDocument ) 
	);
	var controlBinding = DialogControlBinding.newInstance ( this.bindingDocument );
	controlBinding.setControlType ( ControlBinding.TYPE_CLOSE );
	this._controlGroupBinding.add ( controlBinding );
	this._controlGroupBinding.attachRecursive ();
	
	/*
	 * Build speak elements.
	 */
	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:balloonspeak", this.bindingDocument );
	this.bindingElement.appendChild ( element );
	
	var label = this.getLabel ();
	if ( label != null ) {
		this.setLabel ( label );
	}
}

/**
 * @overloads {Binding#onBindintAttach}
 */
BalloonBinding.prototype.onBindingDispose = function () {
	
	BalloonBinding.superclass.onBindingDispose.call ( this );
	
	if ( this._updateInterval ) {
		window.clearInterval ( this._updateInterval );
		this._updateInterval = null;
	}
	
	var binding = this._snapTargetBinding;
	if ( Binding.exists ( binding ) == true ) {
		binding.removeActionListener ( Binding.ACTION_BLURRED, this );
		binding.removeActionListener ( Binding.ACTION_VALID, this );
	}
}

/**
 * Snap to databinding.
 * @param {IData} binding
 */
BalloonBinding.prototype.snapTo = function ( binding ) {
	
	if ( Interfaces.isImplemented ( IData, binding )) {
		
		this._snapTargetBinding = binding;
		
		var action = binding.dispatchAction ( BalloonBinding.ACTION_INITIALIZE );
		if ( action && action.isConsumed ) {
			this._environmentBinding = action.listener;
		}
		if ( this._environmentBinding ) {
			
			binding.addActionListener ( Binding.ACTION_BLURRED, this );
			binding.addActionListener ( Binding.ACTION_VALID, this );
			this.subscribe ( BroadcastMessages.VIEW_CLOSED );
		
			/*
			 * Position and update on timed interval.
			 * TODO: why is the position wrong if we invoke _updatePosition now?
			 */
			var self = this;
			this._updateInterval = window.setInterval ( function () {
				if ( Binding.exists ( binding ) == true ) {
					self._updatePosition ();
				} else {
					self.dispose ();
				}
			}, BalloonBinding.TIMEOUT );
			
			/*
			 * Note that the target, not the balloon, 
			 * is dispatching this action...
			 */
			binding.dispatchAction ( BalloonBinding.ACTION_SNAP );
			
		} else {
			throw "No environment fit for balloons!";
		}
	}
}

/**
 * @param {Point} point
 */
BalloonBinding.prototype._updatePosition = function () {
	
	var target = this._snapTargetBinding;
	var environment = this._environmentBinding;
	var root = UserInterface.getBinding ( target.bindingDocument.body );
	
	if ( Binding.exists ( target ) && Binding.exists ( environment )) {
		
		if ( !root.isActivated ) {
			if ( this.isVisible == true ) {
				this.hide ();
			}
		} else if ( target.isAttached && environment.isAttached ) {
		
			var tPoint = target.boxObject.getUniversalPosition ();
			var ePoint = environment.boxObject.getUniversalPosition ();
			
			ePoint.y += environment.bindingElement.scrollTop;
			ePoint.x += environment.bindingElement.scrollLeft;
			
			var tDim = target.boxObject.getDimension ();
			var eDim = environment.boxObject.getDimension ();
			
			/*
			 * Calculations to undispay balloon if target is not 
			 * visible within the boudaries of the environment.
			 */
			var isAbort = false;	
			if ( tPoint.y + tDim.h < ePoint.y ) {
				isAbort = true;
			} else if ( tPoint.x + tDim.w < ePoint.x ) {
				isAbort = true;
			} else if ( tPoint.y > ePoint.y + eDim.h ) {
				isAbort = true;
			} else if ( tPoint.x > ePoint.x + eDim.w ) {
				isAbort = true;
			}
			
			if ( !isAbort ) {
				this._setComputedPosition ( tPoint, ePoint, tDim, eDim );
				if ( !this.isVisible ) {
					this.show ();
				}
			} else if ( this.isVisible == true ) {
				this.hide ();
			}
		}
	} else {
		this.dispose ();
	}
}

/**
 * Compute position so that balloon is always visible.
 * @param {Point} tPoint
 * @param {Point} ePoint
 * @param {Dimension} tDim
 * @param {Dimension} eDim
 */
BalloonBinding.prototype._setComputedPosition = function ( tPoint, ePoint, tDim, eDim ) {
	
	var wDim = WindowManager.getWindowDimensions ();
	var bDim = this._getDimension ();
	var point = tPoint;
	var isLeft = false;
	
	/*
	 * Display balloon on the left side?
	 */
	if ( tPoint.x + tDim.w + bDim.w + BalloonBinding.OFFSET_X >= wDim.w ) { // ballon outside app window?
		isLeft = true;
	} else if ( tPoint.x + tDim.w >= ePoint.x + eDim.w ) { // target cut by environment box (on the right side)?
		isLeft = true;
	}
	
	if ( isLeft ) {
		point.x -= ( bDim.w + BalloonBinding.OFFSET_X );
		this.attachClassName ( BalloonBinding.CLASSNAME_LEFT );
	} else {
		point.x += tDim.w + BalloonBinding.OFFSET_X;
	 	this.detachClassName ( BalloonBinding.CLASSNAME_LEFT );
	}
	
	/*
	 * Make the balloon appear above the target. 
	 */
	point.y -= ( bDim.h );
	point.y += BalloonBinding.OFFSET_Y;
	
	this._setPosition ( point );
}

/**
 * Dispose the balloon when associated view closes and 
 * whenever a new view is opened (otherwise the balloon 
 * may block the opened view). 
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
BalloonBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	BalloonBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
	
		/*
		 * If our view closed, close the balloon now.
		 * Don't wait for interval to find out.
		 */
		case BroadcastMessages.VIEW_CLOSED :
			if ( this._isAssociatedView ( arg ) == true ) {
				this.dispose ();
			}
			break;
	}
}

/**
 * Does a ViewBinding with a certain handle contain my snaptarget Binding?
 * @param {string} handle
 * @return {boolean}
 */
BalloonBinding.prototype._isAssociatedView = function ( handle ) {
	
	var result = false;
	if ( this._snapTargetBinding ) {
		var view = this._snapTargetBinding.getAncestorBindingByType ( ViewBinding, true );
		if ( view && view.getHandle () == handle ) {
			result = true;
		}
	}
	return result;
}

/**
 * Set position. This has been fitted with a mechanism that 
 * doesn't update the position while CSS transforms are running.
 * @param {Point} point
 */
BalloonBinding.prototype._setPosition = function ( point ) {
	
	var isAbort = false;
	var pos = this.boxObject.getLocalPosition ();
	if ( this._point != null ) {
		if ( pos.x != this._point.x || pos.y != this._point.y ) {
			isAbort = true;
		}   
	}
	if ( !isAbort ) {
		this.bindingElement.style.left = point.x + "px";
		this.bindingElement.style.top = point.y + "px";
		this._point = point;
	}
}

/**
 * @return {Point}
 */
BalloonBinding.prototype._getPosition = function () {
	
	return new Point ( 
		this.bindingElement.offsetLeft,
		this.bindingElement.offsetTop
	);
}
 
 /**
 * @return {Dimension}
 */
BalloonBinding.prototype._getDimension = function () {
	
	return new Dimension ( 
		this.bindingElement.offsetWidth,
		this.bindingElement.offsetHeight
	);
}

/** 
 * Cannot use "display" property because we need to compute on width and height.
 * @overwrites {Binding#hide}
 */
BalloonBinding.prototype.hide = function () {
	
	if ( this.isVisible ) {
		this.bindingElement.style.visibility = "hidden";
		this.isVisible = false;
	}
}

/**
 * @overwrites {Binding#show}
 */
BalloonBinding.prototype.show = function () {
	
	if ( !this.isVisible ) {
		this.bindingElement.style.visibility = "visible";
		this.isVisible = true;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
BalloonBinding.prototype.handleAction = function ( action ) {
	
	BalloonBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case Binding.ACTION_ACTIVATED :
			if ( this._snapTargetBinding ) {
				this._snapTargetBinding.dispatchAction ( 
					Binding.ACTION_ACTIVATED 
				);
				action.consume ();
			}
	
		/**
		 * Note that the binding may be blurred when the server (not the  
		 * client) deems it invalid. In that case, a dialog may be opened,  
		 * blurring the binding, but the call to method validate will 
		 * still return true (because only the server knows for sure). 
		 * In that case, we have to make sure not to dispose the balloon.
		 */
		case Binding.ACTION_BLURRED :
		case Binding.ACTION_VALID :	
			if ( binding == this._snapTargetBinding ) {
				var self = this;
				setTimeout ( function () {
					if ( !Binding.exists ( binding )) {
						self.dispose ();
					} else if ( binding.validate ()) {
						var isDispose = true;
						if ( action.type == Binding.ACTION_BLURRED ) {
							var root = binding.bindingDocument.body;
							var bind = UserInterface.getBinding ( root );
							if ( !root.isActivated ) { // dialog was opened
								isDispose = false;
							}
						}
						if ( isDispose ) {
							self.dispose ();
						}
					}
				}, 0 );
			}
			break;
			
		case ControlBinding.ACTION_COMMAND :
			this.dispose ();
			break;
	}
}

/** 
 * Set label
 * @param {string} label
 */
BalloonBinding.prototype.setLabel = function ( label ) {
	
	if ( this.isAttached == true ) {
		var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:balloontext", this.bindingDocument );
		var text = this.bindingDocument.createTextNode ( label );
		element.appendChild ( text );
		this.bindingElement.appendChild(element);
	}
	this.setProperty ( "label", label );
}

/** 
 * Get label.
 * @return {string}
 */
BalloonBinding.prototype.getLabel = function () {
	
	return this.getProperty ( "label" );
}

/**
 * BalloonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {BalloonBinding}
 */
BalloonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:balloon", ownerDocument );
	var binding = UserInterface.registerBinding ( element, BalloonBinding );
	binding.hide ();
	return binding;
}