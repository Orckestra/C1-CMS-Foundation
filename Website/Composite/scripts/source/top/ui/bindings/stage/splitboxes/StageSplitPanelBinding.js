StageSplitPanelBinding.prototype = new SplitPanelBinding;
StageSplitPanelBinding.prototype.constructor = StageSplitPanelBinding;
StageSplitPanelBinding.superclass = SplitPanelBinding.prototype;

StageSplitPanelBinding.ACTION_LAYOUTUPDATE = "stagesplitpanel layout changed";

/**
 * @class
 */
function StageSplitPanelBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageSplitPanelBinding" );
	
	/**
	 * Flipped when the panel gets maximized. This acts as preparation 
	 * for the actual maximization, which is handled by the StageCrawler.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMaximizePrepared = false;
	
	/**
	 * Flipped when the StageCrawler calls the handleMaximization method.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMaximizedForReal = null;
	
	/**
	 * Flipped when minimized.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMinimizedForReal = null;
	
	/**
	 * Indicates that style.visibility is set to hidden.
	 * @type {boolean}
	 */
	this._isInvisibilized = false;
	
	/** 
	 * Computing "ghosted" controls. Modified by DockBinding.
	 * @see {DockBinding#activate} 
	 * @type {boolean}
	 */
	this.isActive = true;
	 
	/**
	 * @type {boolean}
	 */
	this.isFixed = false;
}

/**
 * Identifies binding.
 */
StageSplitPanelBinding.prototype.toString = function () {

	return "[StageSplitPanelBinding]";
}

/**
 * @see {StageBoxAbstraction#onBindingRegister}
 */
StageSplitPanelBinding.prototype.onBindingRegister = function () {
	
	StageSplitPanelBinding.superclass.onBindingRegister.call ( this );
	StageBoxAbstraction.onBindingRegister.call ( this );
	
	this.addActionListener ( DockBinding.ACTION_OPENED, this );
	this.addActionListener ( DockBinding.ACTION_EMPTIED, this );
	this.addActionListener ( StageSplitBoxBinding.ACTION_HIDE, this );
	this.addActionListener ( StageSplitBoxBinding.ACTION_SHOW, this );
	this.addActionListener ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE, this );
}

/**
 * @see {StageBoxAbstraction#handleAction}
 * @implements {IactionListener}
 * @overloads {SplitPanelBinding#handleEvent}
 * @param {Action} action
 */
StageSplitPanelBinding.prototype.handleAction = function ( action ) {
	
	StageSplitPanelBinding.superclass.handleAction.call ( this, action );
	StageBoxAbstraction.handleAction.call ( this, action );
 	
	// dont consume these actions, other bindings are listening!
	switch ( action.type ) {
		
		case DockBinding.ACTION_EMPTIED :
		case StageSplitBoxBinding.ACTION_HIDE :
		
			if ( this.isMaximized == true ) {
				this.normalize ();
			}
			var dock = this.getContainedDock ();
			if ( dock && dock.type == DockBinding.TYPE_EDITORS ) {
				this._invisibilize ( true );
				
				/*
				 * StageSplitBoxBinding listens for DockBinding.ACTION_EMPTIED, 
				 * but at one point we were consuming this as well! Hmmmm...... 
				 */
				if ( action.type == StageSplitBoxBinding.ACTION_HIDE ) {
					action.consume ();
				}
			} else {
				this.hide ();
				if ( this.isFixed == true ) {
					this.setFix ( false );
				}
			}
			if ( action.type == DockBinding.ACTION_EMPTIED ) {
				var self = this;
				setTimeout ( function () {
					self.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
				}, 0 );
			}
			break;
		
		case DockBinding.ACTION_OPENED :
		case StageSplitBoxBinding.ACTION_SHOW :
		
			var dock = this.getContainedDock ();
			if ( dock && dock.type == DockBinding.TYPE_EDITORS ) {
				this._invisibilize ( false );
				if ( action.type == StageSplitBoxBinding.ACTION_SHOW ) {
					action.consume (); // is this required?
				}
			} else {
				this.show ();
				if ( this.isFixed == true ) {
					this.setFix ( false );
				}
			}
			break;
			
		case StageSplitPanelBinding.ACTION_LAYOUTUPDATE :
			var binding = action.target;
			if ( binding != this && binding.getContainedDock ()) {
				if ( this._containingSplitBoxBinding.getOrient () == SplitBoxBinding.ORIENT_VERTICAL ) {
					var subBox = binding._containingSplitBoxBinding;
					if ( subBox.getOrient () == SplitBoxBinding.ORIENT_HORIZONTAL ) {
						var subPanels = subBox.getChildBindingsByLocalName ( "splitpanel" );
						var subPanel1 = subPanels.getFirst ();
						var subPanel2 = subPanels.getLast ();
						if ( this.isFixed == true ) {
							if ( !subPanel1.isFixed || !subPanel2.isFixed || ( !subBox.hasBothPanelsVisible () && binding.isMinimizedForReal ) ) {
								this.setFix ( false );
								action.consume ();
								this.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
							}
						} else {
							if ( subBox.hasBothPanelsFixed () || ( !subBox.hasBothPanelsVisible () && binding.isMinimizedForReal )) {
								this.setFix ( binding.getContainedDock ().getHeight ());
								action.consume ();
								this.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
							}
						}
					}
				} else {
					
				}
			}
			break;
		
	}
}

/**
 * Handle maximization. Depending on the status of property "isMaximizePrepared",
 * this will either maximize or hide the splitpanel.
 */
StageSplitPanelBinding.prototype.handleMaximization = function () {
	
	//this.isFlexible = false;
	StageBoxAbstraction.handleMaximization.call ( this );
	
	var dockBinding = this.getContainedDock ();
	if ( dockBinding ) {
		if ( this.isMaximizePrepared == true ) {
			// do nothing
		} else {
			dockBinding.interceptDisplayChange ( false );
		}
	}
}

/**
 * Handle unmaximization.
 */
StageSplitPanelBinding.prototype.handleUnMaximization = function () {
	
	StageBoxAbstraction.handleUnMaximization.call ( this );
	//this.isFlexible = true;

	var dockBinding = this.getContainedDock ();
	if ( dockBinding ) {
		if ( dockBinding.type == DockBinding.TYPE_EDITORS ) {
			if ( dockBinding.isEmpty ) {
				this._invisibilize ( true );
			}
		}
		if ( this.isMaximized == true ) {
			this.normalize ();
		} else {
			dockBinding.interceptDisplayChange ( true );
		}
	}
}

/**
 * Maximize.
 * @overloads {SplitPanelBinding#maximize}
 */
StageSplitPanelBinding.prototype.maximize = function () {
	
	if ( this.isMinimized == true ) {
		this.normalize ( true );
	}
	StageSplitPanelBinding.superclass.maximize.call ( this );
	this.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
	
	var dockBinding = this.getContainedDock ();
	if ( dockBinding ) {
		dockBinding.activate ();
		EventBroadcaster.broadcast ( BroadcastMessages.DOCK_MAXIMIZED, dockBinding );
	}
}

/**
 * Minimize.
 * @overloads {SplitPanelBinding#minimize}
 */
StageSplitPanelBinding.prototype.minimize = function () {
	
	var isHorizontalOrient = 
		this._containingSplitBoxBinding.getOrient () == 
		SplitBoxBinding.ORIENT_HORIZONTAL;
	
	var dockBinding = this.getContainedDock ();
	if ( dockBinding ) {
		dockBinding.collapse ( isHorizontalOrient );
		if ( !isHorizontalOrient ) {
			this.setFix ( dockBinding.getHeight ());
		} else {
			this.setFix ( dockBinding.getWidth ());
		}
	}
	if ( this.isMaximized == true ) {
		this.normalize ( true );
	}
	StageSplitPanelBinding.superclass.minimize.call ( this );
	this.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
	if ( dockBinding && dockBinding.isActive ) {
		dockBinding.deActivate ();
		EventBroadcaster.broadcast ( BroadcastMessages.DOCK_MINIMIZED, dockBinding );
	}
}

/**
 * Normalize.
 * @overloads {SplitPanelBinding#normalize}
 */
StageSplitPanelBinding.prototype.normalize = function ( isDispatchPrevented ) {

	var isHorizontalOrient = 
		this._containingSplitBoxBinding.getOrient () == 
		SplitBoxBinding.ORIENT_HORIZONTAL;

	var dockBinding = this.getContainedDock ();
	if ( dockBinding ) {
		if ( this.isMinimized == true ) {
			dockBinding.unCollapse ( isHorizontalOrient );
			this.setFix ( false );
		}
	}
	StageSplitPanelBinding.superclass.normalize.call ( this );
	if ( !isDispatchPrevented ) {
		this.dispatchAction ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE );
		if ( dockBinding ) {
			dockBinding.activate ();
			EventBroadcaster.broadcast ( BroadcastMessages.DOCK_NORMALIZED, dockBinding );
		}
	}
}

/**
 * In case we end up movie docks between splitpanels, better get 
 * a fresh reading on the contained dock each time it is required.
 * @return {DockBinding}
 */
StageSplitPanelBinding.prototype.getContainedDock = function () {
	
	// TODO: DONT INCLUDE START DOCK IN THIS?
	// TODO: DID WE FÅK THIS UP WITH THE START DOCK?
	
	return this.getChildBindingByLocalName ( "dock" );
}

/**
 * Make splitpanel invisible. The visibility of the editors-dock 
 * is not affected by this method, it is handled internally. 
 * @param {boolean} isHide
 */
StageSplitPanelBinding.prototype.invisibilize = function ( isHide ) {

	var isContinue = true;
	var dock = this.getContainedDock ();
	if ( dock != null && dock.type == DockBinding.TYPE_EDITORS ) {
		if ( dock.isEmpty == true ) {
			isContinue = false;
		}
	}
	if ( isContinue == true ) {
		this._invisibilize ( isHide );
	}
	
}

/**
 * Make splitpanel invisible (private).
 * @param {boolean} isHide
 */
StageSplitPanelBinding.prototype._invisibilize = function ( isHide ) {
	
	if ( isHide != this._isInvisibilized ) {
		if ( isHide ) {
			this.bindingElement.style.visibility = "hidden";
		} else {
			this.bindingElement.style.visibility = "visible";
		}
		this._isInvisibilized = !this._isInvisibilized;
	}
}