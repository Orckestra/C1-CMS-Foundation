ControlBoxBinding.prototype = new FlexBoxBinding;
ControlBoxBinding.prototype.constructor = ControlBoxBinding;
ControlBoxBinding.superclass = FlexBoxBinding.prototype;

ControlBoxBinding.STATE_NORMAL			= "normal";
ControlBoxBinding.STATE_MAXIMIZED 		= "maximized";
ControlBoxBinding.STATE_MINIMIZED 		= "minimized";
ControlBoxBinding.ACTION_NORMALIZE 		= "controlbox normalizeaction";
ControlBoxBinding.ACTION_MAXIMIZE 		= "controlbox maximizeaction";
ControlBoxBinding.ACTION_MINIMIZE 		= "controlbox minimizeaction";
ControlBoxBinding.ACTION_STATECHANGE	= "controlbox statechangeacton";

/**
 * @class
 */
function ControlBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ControlBoxBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isNormalized = true;
	
	/**
	 * @type {boolean}
	 */
	this.isMaximized = false;
	
	/**
	 * @type {boolean}
	 */
	this.isMinimized = false;
}

/**
 * Identifies binding.
 */
ControlBoxBinding.prototype.toString = function () {

	return "[ControlBoxBinding]";
}

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
ControlBoxBinding.prototype.onBindingAttach = function () {

	ControlBoxBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( ControlBinding.ACTION_COMMAND, this );
	this.attachClassName ( ControlBoxBinding.STATE_NORMAL );
}

/**
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
ControlBoxBinding.prototype.handleAction = function ( action ) {

	ControlBoxBinding.superclass.handleAction.call ( this, action );

	switch ( action.type ) {
		case ControlBinding.ACTION_COMMAND :
			var controlBinding = action.target;
			Application.lock ( this );
			var self = this;
			setTimeout ( function () {
				self.handleInvokedControl ( controlBinding );
				Application.unlock ( self );
			}, 0 );
			action.consume ();
			break;
	}
}

/**
 * Invoked when descendant controls fire.
 * @param {ControlBinding} control
 */
ControlBoxBinding.prototype.handleInvokedControl = function ( control ) {
	
	switch ( control.controlType ) {
		case ControlBinding.TYPE_MAXIMIZE :
			this.maximize ();
			break;
		case ControlBinding.TYPE_MINIMIZE :
			this.minimize ();
			break;
		case ControlBinding.TYPE_UNMAXIMIZE :
		case ControlBinding.TYPE_UNMINIMIZE :
			this.normalize ();
			break;
	}
}

/**
 * Minimize.
 */
ControlBoxBinding.prototype.maximize = function () {

	this.dispatchAction ( ControlBoxBinding.ACTION_MAXIMIZE );
	this.setState ( ControlBoxBinding.STATE_MAXIMIZED );
	this.isNormalized = false;
	this.isMaximized = true;
	this.isMinimized = false;
}

/**
 * Minimize.
 */
ControlBoxBinding.prototype.minimize = function () {

	this.dispatchAction ( ControlBoxBinding.ACTION_MINIMIZE );
	this.setState ( ControlBoxBinding.STATE_MINIMIZED );
	this.isNormalized = false;
	this.isMaximized = false;
	this.isMinimized = true;
}

/**
 * Normalize.
 */
ControlBoxBinding.prototype.normalize = function () {

	this.dispatchAction ( ControlBoxBinding.ACTION_NORMALIZE );
	this.setState ( ControlBoxBinding.STATE_NORMAL );
	this.isNormalized = true;
	this.isMaximized = false;
	this.isMinimized = false;
}

/**
 * Updates the value of the "state" property. This also sets a specific CSS classname.
 * @param {string} state
 */
ControlBoxBinding.prototype.setState = function ( state ) {
	
	// backup the old value
	var prestate = this.getState ();

	// assert the new value
	this.setProperty ( "state", state );
	
	// synchronize the CSS classname
	this.detachClassName ( prestate );
	this.attachClassName ( state );
	
	// dispatching common action for all state changes
	this.dispatchAction ( ControlBoxBinding.ACTION_STATECHANGE );
}

/**
 * @return {string}
 */
ControlBoxBinding.prototype.getState = function () {

	var result = this.getProperty ( "state" );
	if ( !result ) {
		result = ControlBoxBinding.STATE_NORMAL;
	}
	return result;
}