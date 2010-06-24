/**
 * Image editor actions.
 * @class
 */
var ImageEditorActions = new function () {
	
	var logger 				= SystemLogger.getLogger ( "ImageEditorActions" );
	var actionList 			= new List ();
	var redoList 			= new List ();
	var url 				= document.location.search.split ( "?src=" )[ 1 ];
	
	var SERVICE_URL 		= Resolver.resolve ( "${root}/services/Media/ImageManipulator.ashx?src=" ) + url;
	var DIALOG_SCALE_URL 	= "${root}/content/dialogs/imageeditor/scaleimage/scaleimage.aspx";
	
	/**
	 * Save.
	 */
	this.save = function () {
	
		actionList.add ( 
			new ImageEditorAction (
				ImageEditorAction.TYPE_SAVE 
			)
		);
		
		bindingMap.imagebox.deInitialize ();
		refresh ();
		actionList.clear ();
		updateUndoBroadcasters ();
	}
	
	/**
	 * Crop.
	 */
	this.crop = function () {
		
		var geometry = bindingMap.imageselection.geometry;
		
		actionList.add ( 
			new ImageEditorAction (
				ImageEditorAction.TYPE_CROP, 
				[
					geometry.x,
					geometry.y,
					geometry.w,
					geometry.h
				]
			)
		);
		
		bindingMap.broadcasterHasSelection.disable (); // TODO: move this?
		
		bindingMap.imagebox.deInitialize ();
		redoList.clear ();
		refresh ();
	}
	
	/**
	 * Rotate.
	 * @param {int} degrees
	 */
	this.rotate = function ( degrees ) {
	
		actionList.add ( 
			new ImageEditorAction (
				ImageEditorAction.TYPE_ROTATE, 
				[ degrees ]
			)
		);
		bindingMap.imagebox.deInitialize ();
		redoList.clear ();
		refresh ();
	}
	
	/**
	 * Flip.
	 * @param {boolean} isHorizontal
	 */
	this.flip = function ( isHorizontal ) {
	
		actionList.add ( 
			new ImageEditorAction (
				ImageEditorAction.TYPE_FLIP, 
				[ isHorizontal ]
			)
		);
		bindingMap.imagebox.deInitialize ();
		redoList.clear ();
		refresh ();
	}
	
	/**
	 * Scale.
	 */
	this.scale = function () {
		
		var dialogHandler = {
			handleDialogResponse : function ( response, result ) {
				if ( response == Dialog.RESPONSE_ACCEPT ) {
					actionList.add ( 
						new ImageEditorAction (
							ImageEditorAction.TYPE_SCALE, 
							[ result.unit, result.width, result.height ]
						)
					);
					bindingMap.imagebox.deInitialize ();
					redoList.clear ();
					refresh ();
				}
			}
		}
		
		var dialogArgument = {
			width : bindingMap.imagebox.geometry.w,
			height : bindingMap.imagebox.geometry.h
		}
		
		Dialog.invokeModal ( 
			DIALOG_SCALE_URL, 
			dialogHandler, 
			dialogArgument 
		);
	}
	
	/**
	 * Select.
	 * TODO: add selections to the undo list?
	 */
	this.select = function () {
		
		/*
		var geometry = bindingMap.imageselection.geometry;
		
		actionList.add ( 
			new ImageEditorAction (
				ImageEditorAction.TYPE_SELECT, 
				[
					geometry.x,
					geometry.y,
					geometry.w,
					geometry.h
				]
			)
		);
		redoList.clear ();
		updateUndoBroadcasters ();	
		*/
	}
	
	/**
	 * Undo.
	 */
	this.undo = function () {
		
		var lastAction = actionList.extractLast ();
		
		redoList.add ( 
			lastAction
		);
		
		switch ( lastAction.type ) {
			case ImageEditorAction.TYPE_SELECT :
				restoreSelection ( lastAction )
				//updateUndoBroadcasters ();
				break;
			default :
				bindingMap.imagebox.deInitialize ();
				refresh ();
				updateUndoBroadcasters ();
				break;
		}
	}
	
	/**
	 * Redo.
	 */
	this.redo = function () {
		
		var nextAction = redoList.extractLast ();
		
		actionList.add ( 
			nextAction
		);
		
		switch ( nextAction.type ) {
			case ImageEditorAction.TYPE_SELECT :
				restoreSelection ( nextAction )
				//updateUndoBroadcasters ();
				break;
			default :
				bindingMap.imagebox.deInitialize ();
				refresh ();
				updateUndoBroadcasters ();
				break;
		}
	}
	
	/**
	 * Compile image url.
	 * @return {string}
	 */
	this.getURL = function () {
		
		var result = SERVICE_URL;
		var isSave = false;
		
		if ( actionList.hasEntries ()) {
			result += "&actions=";
			actionList.reset ();
			while ( actionList.hasNext ()) {
				var action = actionList.getNext ();
				switch ( action.type ) {
					case ImageEditorAction.TYPE_CROP :
					case ImageEditorAction.TYPE_SCALE :
					case ImageEditorAction.TYPE_ROTATE :
					case ImageEditorAction.TYPE_FLIP :
						result += action.toString ();
						if ( actionList.hasNext ()) {
							result += ";";
						}
						break;
					case ImageEditorAction.TYPE_SAVE :
						isSave = true;
						break;
				}
			}
		}
		if ( isSave ) {
			
			/*
			 * Besides the "save" parameter, view handle and console ID is used 
			 * to correctly trigger a SaveStatus instruction on the MessageQueue.
			 */
			result += "&save=true&viewId=" + bindingMap.editorpage.viewhandle + "&consoleId=" + Application.CONSOLE_ID;
		}
		logger.debug ( result );
		return result;
	}
	
	/**
	 * Update the image and hide the selection.
	 */
	function refresh () {
	
		bindingMap.imagebox.refresh ();
		bindingMap.imageselection.hide ();
		updateUndoBroadcasters ();
	}
	
	/**
	 * Update undo-redo broadcasters. Note that the dirty stuff should normally 
	 * be handled by the EditorPageBinding. This may cause substantial misery.
	 */
	function updateUndoBroadcasters () {
		
		var undo = bindingMap.broadcasterCanUndo;
		var redo = bindingMap.broadcasterCanRedo;
		
		if ( actionList.hasEntries ()) {
			if ( undo.isDisabled ()) {
				undo.dispatchAction ( 
					EditorPageBinding.ACTION_DIRTY 
				);
			}
			undo.enable ();
		} else {
			undo.disable ();
			undo.dispatchAction ( 
				EditorPageBinding.ACTION_CLEAN 
			);
		}
		
		if ( redoList.hasEntries ()) {
			redo.enable ();
		} else {
			redo.disable ();
		}
	}
	
	/**
	 * Restore selection.
	 * @param {ImageAction} action
	 */
	function restoreSelection ( action ) {
		
		if ( action.type == ImageEditorAction.TYPE_SELECT ) {		
			with ( bindingMap.imageselection ) {
				setX ( action.args [ 0 ]);
				setY ( action.args [ 1 ]);
				setW ( action.args [ 2 ]);
				setH ( action.args [ 3 ]);
			}
			bindingMap.imageselection.hide ();
		}
	}
}