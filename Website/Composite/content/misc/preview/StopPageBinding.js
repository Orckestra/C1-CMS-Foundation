StopPageBinding.prototype = new PageBinding;
StopPageBinding.prototype.constructor = StopPageBinding;
StopPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function StopPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StopPageBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
StopPageBinding.prototype.toString = function () {

	return "[StopPageBinding]";
}

/**
 * @overloads {PageBinding#onPageInitialize}
 */
StopPageBinding.prototype.onPageInitialize = function () {
	
	StopPageBinding.superclass.onPageInitialize.call ( this );
	
	/*
	 * Return on mouseclick anywhere.
	 */
	var self = this;
	DOMEvents.addEventListener ( document.body, DOMEvents.MOUSEDOWN, {
		handleEvent : function () {
			self.dispatchAction ( PreviewWindowBinding.ACTION_RETURN );
		}
	});
}