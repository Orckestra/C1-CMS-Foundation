ToolBoxToolBarButtonBinding.prototype = new ToolBarButtonBinding;
ToolBoxToolBarButtonBinding.prototype.constructor = ToolBoxToolBarButtonBinding;
ToolBoxToolBarButtonBinding.superclass = ToolBarButtonBinding.prototype;

/**
 * @class
 */
function ToolBoxToolBarButtonBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBoxToolBarButtonBinding" );
	
	/**
	 * Associates viewdefinitions to perspective tags. 
	 * @type {Map<string><List<<ViewDefinition>>}
	 */
	this._views = new Map ();
	
	/**
	 * Avoid excessive popup building.
	 * @type {string}
	 */
	this._lastGeneratedPerspective = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ToolBoxToolBarButtonBinding.prototype.toString = function () {

	return "[ToolBoxToolBarButtonBinding]";
}

/**
 * @overloads {ButtonBinding#onBindingAttach}
 */
ToolBoxToolBarButtonBinding.prototype.onBindingAttach = function () {
	
	ToolBoxToolBarButtonBinding.superclass.onBindingAttach.call ( this );
	
	if ( System.hasActivePerspectives ) {
	
		this.subscribe ( BroadcastMessages.PERSPECTIVE_CHANGED );
		
		/**
		 * Scan ViewDefinitions, indexing definitions associated  
		 * to a perspective (by the "perspective" property no less).
		 */
		var views = this._views;
		for ( var handle in ViewDefinitions ) {
			var def = ViewDefinitions [ handle ];
			var key = def.perspective; 
			if ( key != null ) {
				if ( !views.has ( key )) {
					views.set ( key, new List ());
				}
				var list = views.get ( key );
				list.add ( def );
			}
		}
	} else {
		this.hide ();
	}
};

/**
 * Build popup when perspective changes. If no 
 * views are associated, the button will disable.
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ToolBoxToolBarButtonBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.PERSPECTIVE_CHANGED :
			var tag = arg;
			if ( this._views.has ( tag )) {
				
				if ( tag != this._lastGeneratedPerspective ) {
					
					this._lastGeneratedPerspective = tag;
					var list = this._views.get ( tag );
					var popup = this.bindingWindow.bindingMap.toolboxpopup;
					popup.empty ();
					
					list.each ( function ( def ) {
						var item = popup.add ( StageViewMenuItemBinding.newInstance ( popup.bindingDocument ));
						item.setType ( MenuItemBinding.TYPE_CHECKBOX );
						item.setHandle ( def.handle );
						item.setLabel ( def.label );
						item.setImage ( def.image );
						item.setToolTip ( def.toolTip );
						item.attach ();
					});
				}				
				this.enable ();
			} else {
				this.disable ();
			}
			break;
	}
}