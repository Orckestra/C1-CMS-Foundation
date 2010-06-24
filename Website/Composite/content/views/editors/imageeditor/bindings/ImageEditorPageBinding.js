ImageEditorPageBinding.prototype = new EditorPageBinding;
ImageEditorPageBinding.prototype.constructor = ImageEditorPageBinding;
ImageEditorPageBinding.superclass = EditorPageBinding.prototype;


/**
 * @class
 */
function ImageEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageEditorPageBinding" );
	
	/**
	 * Handle of the view that contains us.
	 * @type {string}
	 */
	this.viewhandle = null;
}

/**
 * Identifies binding.
 */
ImageEditorPageBinding.prototype.toString = function () {
	
	return "[ImageEditorPageBinding]";
}

/**
 * Overloads.
 */
ImageEditorPageBinding.prototype.onBindingRegister = function () {
	
	ImageEditorPageBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( ImageBoxBinding.ACTION_INITIALIZED, this );
}

/**
 * Overloads.
 */
ImageEditorPageBinding.prototype.onBindingAttach = function () {
	
	ImageEditorPageBinding.superclass.onBindingAttach.call ( this );
	
	/*
	 * Extract the view handle. Backend needs to know.
	 */
	var view = this.getAncestorBindingByLocalName ( "view", true );
	var def = view.getDefinition ();
	this.viewhandle = def.handle;
	
	/*
	 * Connect zoom selector.
	 */
	var selector = bindingMap.zoomselector;
	selector.onValueChange = function () {
		ImageEditor.zoomTo ( selector.getValue ());
	}
	
	/**
	 * Setup zoom menu.
	 */
	bindingMap.zoommenugroup.addActionListener ( 
		MenuItemBinding.ACTION_COMMAND, this 
	);
}

/**
 * Pause page initialization.
 * @overwrites {PageBinding#onBeforePageInitialize}
 */
ImageEditorPageBinding.prototype.onBeforePageInitialize = function () {
	
	/*
	 * Do nothing - waiting for the image to load. 
	 * @see {ImageEditor#PageBindinghandleAction}
	 */
}

/**
 * @implements {IActionListener}
 * @overloads {EditorPageBinding#handleAction}
 * @param {Action} action
 */
ImageEditorPageBinding.prototype.handleAction = function ( action ) {

	ImageEditorPageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ){
		case ImageBoxBinding.ACTION_INITIALIZED :
			
			/*
			 * This stunt is somewhat hacked...
			 */
			var src = String ( decodeURIComponent ( action.target.getImageSource ()));
			var temp1 = src.split ( "MediaArchive:" )[ 1 ];
			var temp2 = temp1.split ( "&" )[ 0 ];
			var temp3 = temp2.split ( "/" );
			var temp4 = temp3 [ temp3.length - 1 ]; 
			
			this.label = temp4;
			
			if ( !this._isPageBindingInitialized ) {
				ImageEditorPageBinding.superclass.onBeforePageInitialize.call ( this );
			}
			break;
		case MenuItemBinding.ACTION_COMMAND :
			var item = action.target;
			ImageEditor.zoomTo ( 
				item.getProperty ( "zoom" )
			);
			break;
	}
}

/**
 * @overwrites {EditorPageBinding#save}
 */
ImageEditorPageBinding.prototype._saveEditorPage = function () {
	
	ImageEditorActions.save ();
	
	/*
	 * TODO!
	 */
	this.logger.error ( "TODO: MessageQueue SaveStatus!!!!!!!!!!!!!!!!!!!!!!!!!!" );
	setTimeout ( function () {
		MessageQueue.update ();
	}, 50 );
}