ControlBinding.prototype = new ButtonBinding;
ControlBinding.prototype.constructor = ControlBinding;
ControlBinding.superclass = ButtonBinding.prototype;

ControlBinding.ACTION_COMMAND		= "controlcommand";
ControlBinding.TYPE_MINIMIZE 		= "minimize";
ControlBinding.TYPE_MAXIMIZE 		= "maximize";
ControlBinding.TYPE_UNMAXIMIZE 		= "unmaximize";
ControlBinding.TYPE_UNMINIMIZE 		= "unminimize";
ControlBinding.TYPE_CLOSE 			= "close";

ControlBinding.TOOLTIP = {
	"minimize"		: "${string:Website.App.ToolTipMinimize}",
	"maximize" 		: "${string:Website.App.ToolTipMaximize}",
	"unmaximize" 	: "${string:Website.App.ToolTipUnMaximize}",
	"unminimize" 	: "${string:Website.App.ToolTipUnMinimize}",
	"close" 		: "${string:Website.App.ToolTipClose}"
};

/**
 * @class
 * The ControlBinding is a simple button-type binding  
 * specific for controlling panel behavior.
 */
function ControlBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ControlBinding" );
	
	/**
	 * Carefully named not to conflict with regular ButtonBinding type property.
	 * @type {string}
	 */
	this.controlType = null;
	
	/**
	 * Overwrites super property to dispatch an unique command type.
	 * @type {string}
	 */
	this.commandAction = ControlBinding.ACTION_COMMAND;
	
	/**
	 * @type {ControlBoxBinding}
	 */
	this.containingControlBoxBinding = null;
	
	/** 
	 * @type {boolean}
	 */
	this.isVisible = true;
	
	/**
	 * @type {boolean}
	 */
	this.isGhostable = false;
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID ]);
}

/**
 * Identifies binding.
 */
ControlBinding.prototype.toString = function () { 

	return "[ControlBinding]";
}

/**
 * Note that we assign a hardcoded image profile to the control instance. That's 
 * because IE6.0 cannot handle both alphatransparency and background positioning.
 */
ControlBinding.prototype.onBindingAttach = function () {
	
	this.controlType = this.getProperty ( "controltype" );
	this.setProperty ( "tooltip", ControlBinding.TOOLTIP [ this.controlType ]);
	
	if ( !this.isAttached ) {
		if ( this.controlType ) {
			this.containingControlBoxBinding = this.getAncestorBindingByType ( 
				ControlBoxBinding 
			);
			if ( this.containingControlBoxBinding ) {
				this.containingControlBoxBinding.addActionListener ( 
					ControlBoxBinding.ACTION_STATECHANGE, this 
				);
			}
			ControlBinding.superclass.onBindingAttach.call ( this );
			this.addEventListener ( DOMEvents.MOUSEDOWN );	
		} else {
			throw "ControlBinding: type not specified.";
		}
	}
}

/**
 * Makes it possible to close the controlbox without activating it.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
ControlBinding.prototype.handleEvent = function ( e ) {

	ControlBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
			DOMEvents.stopPropagation ( e );
			break;
	}
}

/**
 * Set control type. This changes whenever 
 * the control is handled.
 * @param {string} type
 */
ControlBinding.prototype.setControlType = function ( type ) {

	this.controlType = type;
	this.setProperty ( "controltype", type );
	this.setToolTip ( ControlBinding.TOOLTIP [ type ]);
}

/**
 * Intercepts panel state change and updates control type accordingly.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ControlBinding.prototype.handleAction = function ( action ) {

	ControlBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case ControlBoxBinding.ACTION_STATECHANGE :
			this._handleStateChange ();
			break;
	}
}

/** 
 * Handle state change.
 */
ControlBinding.prototype._handleStateChange = function () {
	
	switch ( this.containingControlBoxBinding.getState ()) {
		case ControlBoxBinding.STATE_MAXIMIZED :
			if ( this.controlType == ControlBinding.TYPE_MAXIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_UNMAXIMIZE );
			}
			if ( this.controlType == ControlBinding.TYPE_UNMINIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_MINIMIZE );
			}
			break;
		case ControlBoxBinding.STATE_MINIMIZED :
			if ( this.controlType == ControlBinding.TYPE_MINIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_UNMINIMIZE );
			}
			if ( this.controlType == ControlBinding.TYPE_UNMAXIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_MAXIMIZE );
			}
			break;
		case ControlBoxBinding.STATE_NORMAL :
			if ( this.controlType == ControlBinding.TYPE_UNMAXIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_MAXIMIZE );
			}
			if ( this.controlType == ControlBinding.TYPE_UNMINIMIZE ) {
				this.setControlType ( ControlBinding.TYPE_MINIMIZE );
			}
			break;
	}
}

/**
 * Unlike other bindings, handling the control should not 
 * activate docks or close open selectboxes and stuff. This 
 * method is invoked by the ButtonStageManager.
 * @see {ButtonStateManager#handleEvent}
 * @overwrites {Button#onMouseDown}
 */
ControlBinding.prototype.onMouseDown = function () {

	// do nothing
}

/**
 * No action on mouse up.
 * @see {ButtonStateManager#handleEvent}
 * @overwrites {Button#onMouseDown}
 */
ControlBinding.prototype.onMouseUp = function () {

	// do nothing
}