UpdateManagerTestPageBinding.prototype = new PageBinding;
UpdateManagerTestPageBinding.prototype.constructor = UpdateManagerTestPageBinding;
UpdateManagerTestPageBinding.superclass = PageBinding.prototype;

/**
 * Notice this! Make sure that before and after  
 * markup gets send to the System Log.... 
 * @overwrites {DocumentUpdatePlugin.isDebugging}
 */
DocumentUpdatePlugin.isDebugging = true;

/**
 * UpdateManager test!
 */
function UpdateManagerTestPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "UpdateManagerTestPageBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
UpdateManagerTestPageBinding.prototype.toString = function () {

	return "[UpdateManagerTestPageBinding]";
}

/**
 * Setup update listeners and handle potential errors.
 * @overloads {PageBinding#onBeforePageInitialize}
 */
UpdateManagerTestPageBinding.prototype.onBeforePageInitialize = function () {
	
	DOMEvents.addEventListener ( document, DOMEvents.BEFOREUPDATE, this );
	DOMEvents.addEventListener ( document, DOMEvents.AFTERUPDATE, this );
	DOMEvents.addEventListener ( document, DOMEvents.ERRORUPDATE, this );
	 
	bindingMap.menubar.addActionListener ( MenuItemBinding.ACTION_COMMAND, {
		handleAction : function ( action ) {
			var file = action.target.getProperty ( "example" );
			bindingMap.markup.setValue ( Templates.getPlainText ( file ));
			bindingMap.updatebutton.fireCommand ();
		}
	})
	
	UpdateManagerTestPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * @implements {IEventHandler}
 * @overloads {PageBinding#handleEvent}
 * @param {Event} e
 */
UpdateManagerTestPageBinding.prototype.handleEvent = function ( e ) {
	
	UpdateManagerTestPageBinding.superclass.handleEvent.call ( this, e );
	
	if ( DOMEvents.getTarget ( e ) == document.documentElement ) {
		switch ( e.type ) {
			case DOMEvents.BEFOREUPDATE :
				this._beforeUpdate ();
				break;
			case DOMEvents.AFTERUPDATE :
				this._afterUpdate ();
				break;
			case DOMEvents.ERRORUPDATE :
				this._errorUpdate ();
				break;
		}
	}
}

/**
 * Before update.
 */
UpdateManagerTestPageBinding.prototype._beforeUpdate = function () {
	
	this.bindingWindow.bindingMap.reporttextbox.setValue ( "" );
}

/**
 * After update.
 */
UpdateManagerTestPageBinding.prototype._afterUpdate = function () {
	
	var summary = this.bindingWindow.UpdateManager.summary;
	if ( summary == "" ) {
		summary = "No updates :)"
	}
	this.bindingWindow.bindingMap.reporttextbox.setValue ( 	summary );
}

/**
 * After error.
 */
UpdateManagerTestPageBinding.prototype._errorUpdate = function () {
	
	this.bindingWindow.bindingMap.reporttextbox.setValue (
		"RELOAD THIS TEST! :)\n\n" + UpdateManager.errorsmessage 
	);
}