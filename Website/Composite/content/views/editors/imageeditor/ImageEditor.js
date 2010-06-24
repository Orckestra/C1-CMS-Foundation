/**
 * @class
 */
var ImageEditor = new function () {
	
	var logger = SystemLogger.getLogger ( "ImageEditor" );
	var scales = [ 0.12, 0.25, 0.5, 1, 2, 4, 8 ];
	var index = 3;
		
	this.MODE_MOVE 		= "move";
	this.MODE_SELECT 	= "select";
	this.MODE_ZOOMIN 	= "zoomin";
	this.MODE_ZOOMOUT 	= "zoomout";
	
	/**
	 * @type {number}
	 */
	this.scale = scales [ index ];
	
	/**
	 * @type {string}
	 */
	this.mode = null;
	
	/**
	 * True while user is dragging a new selection.
	 * @type {boolean}
	 */
	this.isSelecting = false;
	 
	/**
	 * Set mode.
	 * @param {string} state
	 */
	this.setMode = function ( mode ) {
		
		if ( this.mode ) {
			bindingMap.imagestage.detachClassName ( this.mode );
		}
		bindingMap.imagestage.attachClassName ( mode );
		bindingMap.imagecursor.setMode ( mode );
		this.mode = mode;
	}
	
	/**
	 * Implements {@link IBroadcastListener}
	 * @param {string} broadcast
	 */
	this.handleBroadcast = function ( broadcast ) {
		
		switch ( broadcast ) {
			case BroadcastMessages.KEY_SHIFT_DOWN :
				if ( this.mode == ImageEditor.MODE_ZOOMIN ) {
					this.setMode ( ImageEditor.MODE_ZOOMOUT );
				}
				break;
			case BroadcastMessages.KEY_SHIFT_UP :
				if ( this.mode == ImageEditor.MODE_ZOOMOUT ) {
					this.setMode ( ImageEditor.MODE_ZOOMIN );
				}
				break;
			case WindowManager.WINDOW_UNLOADED_BROADCAST :
				EventBroadcaster.subscribe ( BroadcastMessages.KEY_SHIFT_DOWN, this );
				EventBroadcaster.subscribe ( BroadcastMessages.KEY_SHIFT_UP, this );
				break;
		}
	}
	
	EventBroadcaster.subscribe ( BroadcastMessages.KEY_SHIFT_DOWN, this );
	EventBroadcaster.subscribe ( BroadcastMessages.KEY_SHIFT_UP, this );
	EventBroadcaster.subscribe ( WindowManager.WINDOW_UNLOADED_BROADCAST, this );
	
	/**
	 * Zoom in.
	 */
	this.zoomIn = function () {
		
		if ( index + 1 < scales.length ) {
			this.scale = scales [ ++ index ];
			this._updateZoomBindings ();
			repaint ();
		}
		
	}
	
	/**
	 * Zoom out.
	 */
	this.zoomOut = function () {
		
		if ( index > 0 ) {
			this.scale = scales [ -- index ];
			this._updateZoomBindings ();
			repaint ();
		}
	}
	
	/**
	 * Zoom to specified index.
	 * @param {int} newIndex
	 */
	this.zoomTo = function ( newIndex ) {
		
		newIndex = Number ( newIndex );
		
		if ( newIndex != index ) {
			index = newIndex;
			this.scale = scales [ index ];
			this._updateZoomBindings ();
			repaint ();
		}
	}
	
	/**
	 * Update zoom broadcasters and zoom selector.
	 */
	this._updateZoomBindings = function () {
		
		// broadcasters
		var b1 = bindingMap.broadcasterCanZoomIn;
		var b2 = bindingMap.broadcasterCanZoomOut;
		
		var isMin = index == 0;
		var isMax = index == scales.length - 1;
		
		if ( isMin ) {
			b2.disable ();
			b1.enable ();
		} else if ( isMax ) {
			b2.enable ();
			b1.disable ();
		} else {
			b2.enable ();
			b1.enable ();
		}
		
		// zoom selector
		bindingMap.zoomselector.selectByValue ( 
			index, true 
		);
		
		// zoom menugroup
		var group = bindingMap.zoommenugroup;
		var items = group.getChildBindingsByLocalName ( "menuitem" );
		items.each ( function ( item ) {
			if ( item.getProperty ( "zoom" ) == index ) {
				item.check ( true );
			} else {
			 	item.uncheck ( true );
			}
		});
	}
	
	/**
	 * Snap value to nearest number.
	 * @param {number} value
	 * @param {number} number
	 */
	this.grid = function ( value, number ) {
		
		var ceil = Math.ceil ( value );
		var remainder = value % number;
		if ( remainder > 0 ) {
			value = value - remainder + number;
		}
	  	return value;
	}
		
	
	/**
	 * Repaint stuff.
	 */
	function repaint () {
		
		bindingMap.imagestagecontainer.bindingElement.style.visibility = "hidden";
		bindingMap.imagebox.repaint ();
		bindingMap.imageselection.repaint ();
		bindingMap.imagescrollbox.repaint ();
		bindingMap.imagestagecontainer.bindingElement.style.visibility = "visible";
	}
}
