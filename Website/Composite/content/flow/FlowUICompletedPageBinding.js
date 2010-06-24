FlowUICompletedPageBinding.prototype = new PageBinding;
FlowUICompletedPageBinding.prototype.constructor = FlowUICompletedPageBinding;
FlowUICompletedPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function FlowUICompletedPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FlowUICompletedPageBinding" );
}

/**
 * Identifies binding.
 */
FlowUICompletedPageBinding.prototype.toString = function () {
	
	return "[FlowUICompletedPageBinding]";
}

/**
 * @overloads {Binding#onBindingDispose}
 */
FlowUICompletedPageBinding.prototype.onBindingDispose = function () {
	
	FlowUICompletedPageBinding.superclass.onBindingDispose.call ( this );
	
	if ( this._timeout ) {
		window.clearTimeout ( this._timeout );
		this._timeout = null;
	}
}

/**
 * Force unlock application and update message queue.
 * @overwrites {PageBinding#onAfterPageInitialize}
 */
FlowUICompletedPageBinding.prototype.onAfterPageInitialize = function () {
	
	/*
	 * Because of the terrible page-load driven interaction model, 
	 * this page is bound to appear at times we don't want to see it. 
	 * Show the message on a timeout to prevent weird images flashing.
	 */
	if ( window.bindingMap ) { // why not always?
		var cover = window.bindingMap.cover;
		this._timeout = window.setTimeout ( function () {
			if ( Binding.exists ( cover )) {
				CoverBinding.fadeOut ( cover );
			}
		}, 1500 );
	}
	
	/*
	 * Force unlock. Something may have gotten stuck if we are here...
	 */
	Application.unlock ( this, true );
	
	/*
	 * Fetch messages.
	 */
	setTimeout ( function () {
		MessageQueue.update ();
	}, 50 );
}