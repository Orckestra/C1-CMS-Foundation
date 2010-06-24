StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED = "hidden stagebox stuff updated";

/**
 * @class
 * This class is never instantiated, we just need to borrow it's methods for other 
 * classes. This hack is very javascriptish, but it helps us not to copypaste some code.
 * @see {StageSplitBoxBinding}
 * @see {StageSplitPanelBinding}
 */
function StageBoxAbstraction () {

 	/**
 	 * 
 	 * @type {boolean}
 	 */
	this.isMaximizePrepared = false;
	
	/**
 	 * @type {boolean}
 	 */
	this.isMaximizedForReal = null;
	
	/**
 	 * @type {boolean}
 	 */
	this.isMinimizedForReal = null;
	
	/**
 	 * @type {boolean}
 	 */
	this.isHiddenForReal = null;
}

/**
 * @see {StageSplitBoxBinding#onBindingRegister}
 * @see {StageSplitPanelBinding#onBindingRegister}
 */
StageBoxAbstraction.onBindingRegister = function () {

	this.addActionListener ( ControlBoxBinding.ACTION_MAXIMIZE );
	this.addActionListener ( ControlBoxBinding.ACTION_MINIMIZE );
	this.addActionListener ( ControlBoxBinding.ACTION_NORMALIZE );
	this.addActionListener ( TabBoxBinding.ACTION_UPDATED );
}

/**
 * @see {StageSplitBoxBinding#handleAction}
 * @see {StageSplitPanelBinding#handleAction}
 * @param {Action} action
 */
StageBoxAbstraction.handleAction = function ( action ) {
	
	switch ( action.type ) {
		case ControlBoxBinding.ACTION_MAXIMIZE :
		 	this.isMaximizePrepared = true;
			break;
		case ControlBoxBinding.ACTION_MINIMIZE :
		 	this.isMinimizedForReal = true;
		 	break;
		case ControlBoxBinding.ACTION_NORMALIZE :
		 	this.isMaximizePrepared = false;
		 	this.isMinimizedForReal = null;
		 	break;
		case TabBoxBinding.ACTION_UPDATED : // TODO: DockBinding.ACTION_ACTIVATED?
			if ( action.target instanceof DockBinding ) {
				if ( this.isHiddenForReal ) {
					this.dispatchAction ( 
						StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED 
					);
				} else if ( this.isMinimizedForReal ) {
					this.normalize ();
				}
			}
			action.consume ();
			break;
	}
}

/**
 * Maximize. This method is called by the StageCrawler.
 */
StageBoxAbstraction.handleMaximization = function () {

	if ( this.isMaximizePrepared == true ) {
	 	this.isMaximizedForReal = true;
	 	this.isHiddenForReal = false;
	 	this.isFlexible = false;
	 	if ( Client.isMozilla == true ) {
	 		var style = this.bindingElement.style;
	 		style.position	= "absolute";
			style.width		= "100%";
			style.height	= "100%";
			style.top 		= "0";
			style.left 		= "0";
	 	} else {
		 	this.attachClassName ( "maximized" );
	 		if ( this instanceof StageSplitPanelBinding ) {
	 			StageBoxAbstraction._emulateBasicCSS ( this, true );
	 		}
	 	}
	} else {
		this.isMaximizedForReal = false;
		this.isHiddenForReal = true;
		if ( this instanceof StageSplitPanelBinding ) {
			this.invisibilize ( true );
		}
	}
}

/**
 * Unmaximize. This method is called by the StageCrawler.
 */
StageBoxAbstraction.handleUnMaximization = function () {
	
	if ( this.isMaximizedForReal == true ) {
		this.isFlexible = true;
		if ( Client.isMozilla == true ) {
			var style = this.bindingElement.style;
			style.position	= "relative";
			style.width		= "auto";
			style.height	= "auto";
			style.top 		= "auto";
			style.left 		= "auto";
		} else {
			this.detachClassName ( "maximized" );
			if ( this instanceof StageSplitPanelBinding ) {
				StageBoxAbstraction._emulateBasicCSS ( this, false );
			}
		}
	} else {
		if ( this instanceof StageSplitPanelBinding ) {
			this.invisibilize ( false );
		}
	}
	this.isMaximizePrepared = false
	this.isMaximizedForReal = null;
	this.isHiddenForReal = null;
}

/**
 * Explorer sucks. This explains why IE cannot reliably resolve the meaning of  
 * width and height set to 100%. We hack it with Javascript and forget about it.
 * @param {StageSplitPanelBinding} binding
 * @param {boolean} isMimic
 */
StageBoxAbstraction._emulateBasicCSS = function ( binding, isMimic ) {
	
	var style = binding.bindingElement.style;
	var parent = binding.bindingElement.parentNode;
	var box = binding._containingSplitBoxBinding;
	
	if ( Client.isExplorer == true ) {
		if ( isMimic ) {
			binding._unmodifiedFlexMethod = binding.flex;
			binding.flex = function () {
				style.width = parent.offsetWidth + "px";
				style.height = parent.offsetHeight + "px";
			}
		} else {
			style.width = "100%";
			style.height = "100%";
			if ( !box.isHorizontalOrient ()) { // now it gets really painful...
				setTimeout ( function () {
					style.width = "auto";
					style.height = "auto";
					box.reflex ( true );
				}, 0 );
			}
			binding.flex = binding._unmodifiedFlexMethod;
			binding._unmodifiedFlexMethod = null;
		}
	}
}

/*
var s = "StageBoxAbstraction\n\n"
s += "TODO: invisibilize main when unmaximize\n\n";
s += "TODO: Reflex stage on maximize (timeout? max low panels to see)\n\n";
s += "TODO: Reflex stage on unmaximize (maximize, resize, unmaximize to see)";
alert ( s );
*/