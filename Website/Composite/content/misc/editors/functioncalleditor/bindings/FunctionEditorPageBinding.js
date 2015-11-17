FunctionEditorPageBinding.prototype = new PageBinding;
FunctionEditorPageBinding.prototype.constructor = FunctionEditorPageBinding;
FunctionEditorPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function FunctionEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FunctionEditorPageBinding" );
	
	/**
	 * @type {boolean}
	 */
	this._isSourceMode = false;
	
	/**
	 * Enable flexbox behavior.
	 * @type {boolean}
	 */
	this.isFlexible = true;
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FunctionEditorPageBinding.prototype.toString = function () {

	return "[FunctionEditorPageBinding]";
}

FunctionEditorPageBinding.prototype.onBeforePageInitialize = function () {
	
	FunctionEditorPageBinding.superclass.onBeforePageInitialize.call ( this );
	this.addActionListener ( Binding.ACTION_DIRTY );
	this.addActionListener( CodeMirrorEditorBinding.ACTION_INITIALIZED ); 
}

/**
 * @implements {IActionListener}
 * @overwrites {EditorPageBinding#handleAction}
 * @param {Action} action
 */
FunctionEditorPageBinding.prototype.handleAction = function ( action ) {
	
	FunctionEditorPageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		
		case Binding.ACTION_DIRTY :
			if ( action.target.getID () == "switchbutton" ) {
				action.consume ();
			}
			break;
		
		case PageBinding.ACTION_DOPOSTBACK :
			if (action.target.getID() == "switchbutton") {

				//fix crashing Chrome if svg icon set, workarround
				action.target.setImage();

				if ( !this._isSourceMode ) {
					this._cover ( false );
					var decks = this.bindingWindow.bindingMap.decks;
					decks.select ( "sourcedeck" );
					this._isSourceMode = true;
				}
			}
			break;

		case CodeMirrorEditorBinding.ACTION_INITIALIZED :
			this.removeActionListener ( action.type );
			this._buildSwitchButton ( action.target );
			action.consume ();
			
			/*
			 * for some reason, UI may remain locked at this point 
			 * execpt on the machine belonging to yours truly. 
			 * Could we have a missing file checkin? Let's hack it:
			 */
			Application.unlock ( this, true );
			break;
	}
}

/**
 * THIS IS PRETTY MUCH A COPY-PASTE FROM VisualEditorPageBinding.js
 * TODO: Consider erecting an interface for adding this kind of button 
 * (injecting the switch-button on the sourceeditor toolbar).
 * @param {SourceEditorBinding} editor
 */
FunctionEditorPageBinding.prototype._buildSwitchButton = function ( editor ) {
	
	var win = editor.getContentWindow ();
	var doc = editor.getContentDocument ();
	
	var button = ToolBarButtonBinding.newInstance ( doc );
	button.isEditorControlBinding = false;
	button.setLabel( "${string:Composite.Web.FormControl.FunctionCallsDesigner:ToolBar.LabelDesign}" );
	button.flip ( true );
	//button.imageProfile = new ImageProfile ({
	//	image : "${icon:editor-designview}",
	//	imageDisabled : "${icon:editor-designview-disabled}" 
	//});

	var self = this;
	button.oncommand = function () {
		if ( editor.validate ()) {
			self._switchBack ();
		}
	};
	
	win.bindingMap.toolbar.addRight ( button );
	button.attach ();
}

/**
 * Switching from source to forms mode. 
 * The SourceEditorBinding must be validated at this point.
 */
FunctionEditorPageBinding.prototype._switchBack = function () {
	
	var callbackbutton = this.bindingWindow.bindingMap.switchbutton;
	var decks = this.bindingWindow.bindingMap.decks;
	
	this._cover ( true );
	
	callbackbutton.setProperty ( "callbackarg", "design" );
	callbackbutton.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
	decks.select ( "designdeck" );
	callbackbutton.setProperty ( "callbackarg", "source" );
	
	this._isSourceMode = false;
}

/**
 * Show a cover; and hide it when updates are finished.
 * @param {boolean} isSourceMode
 */
FunctionEditorPageBinding.prototype._cover = function ( isSourceMode ) {
	
	var doc = this.bindingDocument;
	var root = doc.documentElement;
	var cover = this.bindingWindow.bindingMap.formscover;
	var editor = this.bindingWindow.bindingMap.sourceeditor;
	
	var handler = {
		handleEvent : function ( e ) {
			if ( DOMEvents.getTarget ( e ) == root ) {
				if ( isSourceMode ) {
					DOMEvents.removeEventListener ( 
						doc, 
						DOMEvents.AFTERUPDATE, 
						handler 
					);
					cover.hide ();
				} else {
					editor.cover ( false );
				}
			} 
		}
	}
	DOMEvents.addEventListener ( 
		doc, 
		DOMEvents.AFTERUPDATE, 
		handler 
	);
	
	if ( isSourceMode ) {
		cover.show ();
	} else {
		editor.cover ( true );
	}
}