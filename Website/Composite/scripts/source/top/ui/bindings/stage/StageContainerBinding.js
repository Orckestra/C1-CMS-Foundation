StageContainerBinding.prototype = new FlexBoxBinding;
StageContainerBinding.prototype.constructor = StageContainerBinding;
StageContainerBinding.superclass = FlexBoxBinding.prototype;

/**
 * @class
 * The stagecontainer is simply setup to flex all descendant bindings 
 * (including bindings in descendant iframes) when the window is resized.
 * The really interesting stuff can be found in the {@link StageBinding}
 */
function StageContainerBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageContainerBinding" );
}

/**
 * Identifies binding.
 */
StageContainerBinding.prototype.toString = function () {

	return "[StageContainerBinding]";
}

/**
 * Overloads {Binding#onBindingAttach}
 */
StageContainerBinding.prototype.onBindingAttach = function () {
	
	StageContainerBinding.superclass.onBindingAttach.call ( this );
	this.subscribe ( BroadcastMessages.APPLICATION_OPERATIONAL );
}

/** 
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
StageContainerBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	StageContainerBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	var winmanager = this.bindingWindow.WindowManager;
	
	switch ( broadcast ) {
		
		/*
		 * Flex on startup.
		 */
		case BroadcastMessages.APPLICATION_OPERATIONAL :
			this.subscribe ( winmanager.WINDOW_RESIZED_BROADCAST );
			this._fit ();
			this.reflex ();
			break;
			
		/*
		 * Flex on window resize.
		 */
		case winmanager.WINDOW_RESIZED_BROADCAST :		
			
			/*
			 * Explorer is slow, so for IE we lock the layout in    
			 * order to discourage UI interaction while resizing. 
			 */
			if ( Client.isMozilla == true ) {
				this._fit ();
				this.reflex ();
			} else {
				Application.lock ( this );
				var self = this;
				setTimeout ( function () {
					self._fit ();
					self.reflex ();
					Application.unlock ( self );
				}, 0 );
			}
			break;
	}
}

/**
 * Fit stage to window width. Doing this by   
 * script in order to tighten up the layout. 
 */
StageContainerBinding.prototype._fit = function () {
	
	var winmanager = this.bindingWindow.WindowManager;
	this.bindingElement.style.width = winmanager.getWindowDimensions ().w + "px";
}