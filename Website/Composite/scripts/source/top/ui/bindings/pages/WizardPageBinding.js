WizardPageBinding.prototype = new DialogPageBinding;
WizardPageBinding.prototype.constructor = WizardPageBinding;
WizardPageBinding.superclass = DialogPageBinding.prototype;

WizardPageBinding.ID_NEXTBUTTON 				= "nextbutton";
WizardPageBinding.ID_PREVIOUSBUTTON 			= "previousbutton";
WizardPageBinding.ID_FINISHBUTTON 				= "finishbutton";
WizardPageBinding.ACTION_NAVIGATE_NEXT 			= "wizardnavigatenext";
WizardPageBinding.ACTION_NAVIGATE_PREVIOUS		= "wizardnavigateprevious";
WizardPageBinding.ACTION_FINISH 				= "wizardfinish";

/**
 * @class
 */
function WizardPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WizardPageBinding" );
	
	/**
	 * Used to fix GUI lock while navigating between wizard pages.
	 * @type {boolean}
	 *
	this._isNavigating = false;
	*/
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WizardPageBinding.prototype.toString = function () {

	return "[WizardPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onPageInitialize}
 */
WizardPageBinding.prototype.onPageInitialize = function () {
	
	WizardPageBinding.superclass.onPageInitialize.call ( this );
	
	this.addActionListener ( WizardPageBinding.ACTION_NAVIGATE_NEXT, this );
	this.addActionListener ( WizardPageBinding.ACTION_NAVIGATE_PREVIOUS, this );
	this.addActionListener ( WizardPageBinding.ACTION_FINISH, this );
	
	/*
	 * TODO: These are not currently used!
	 *
	this.subscribe ( BroadcastMessages.WIZARD_NAVIGATE_NEXT );
	this.subscribe ( BroadcastMessages.WIZARD_NAVIGATE_PREVIOUS );
	this.subscribe ( BroadcastMessages.WIZARD_FINISH );
	*/
}

/**
 * @implements {IActionListener}
 * @overlods {PageBinding#handleAction}
 * @param {Action} action
 */
WizardPageBinding.prototype.handleAction = function ( action ) {

	WizardPageBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {
		
		/*
		 * Moving forward will validate all databindings.
		 */
		case WizardPageBinding.ACTION_NAVIGATE_NEXT :
		case WizardPageBinding.ACTION_FINISH :
			if ( this.validateAllDataBindings () == true ) {
				this.doPostBack ( binding );
			} else {
				action.consume ();
			}
			break;
			
		/*
		 * Moving backwards allowed without validation.
		 */
		case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS :
			this.doPostBack ( binding );
			// dont consume - ViewBinding is listening
			break;
			
		case Binding.ACTION_INVALID :
			this._enableNextAndFinish ( false );
			action.consume ();
			break;
			
		case Binding.ACTION_VALID :
			this._enableNextAndFinish ( true );
			action.consume ();
			break;
	}
}

/**
 * Enable-disable next and finish buttons.
 * @param {boolean} isEnable
 */
WizardPageBinding.prototype._enableNextAndFinish = function ( isEnable ) {
	
	var next = this.bindingWindow.bindingMap.nextbutton;
	var finish = this.bindingWindow.bindingMap.finishbutton;
	
	if ( next ) {
		next.setDisabled ( !isEnable );
	}
	if ( finish ) {
		finish.setDisabled ( !isEnable );
	}
}

/**
 * Some wizard page transitions may take a looooong time, so we lock the interface  
 * whenever a transition is instigated. The GUI is unlocked when the page dets disposed.
 * @overwrites {PageBinding#doPostBack}
 * @see {WizardPageBinding#onBindingDispose}
 * @param {Binding} binding
 *
WizardPageBinding.prototype.doPostBack = function ( binding ) {
	
	if ( this._canPostBack ) {
	
		WizardPageBinding.superclass.doPostBack.call ( this, binding );
		
		switch ( binding ) {
			case this.bindingWindow.bindingMap.nextbutton :
			case this.bindingWindow.bindingMap.previousbutton :
			case this.bindingWindow.bindingMap.finishbutton :
				this._isNavigating = true;
				Application.lock ( this ); // unlocked on dispose...
				break;
		}
	}
}
*/