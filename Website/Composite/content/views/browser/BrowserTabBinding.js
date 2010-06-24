BrowserTabBinding.prototype = new TabBinding;
BrowserTabBinding.prototype.constructor = BrowserTabBinding;
BrowserTabBinding.superclass = TabBinding.prototype;

BrowserTabBinding.ACTIONVENT_CLOSE = "browsertabclose";
BrowserTabBinding.IMG_CLOSE_DEFAULT = Resolver.resolve ( "${root}/skins/system/tabboxes/tab-close-default.png" );
BrowserTabBinding.IMG_CLOSE_HOVER = Resolver.resolve ( "${root}/skins/system/tabboxes/tab-close-hover.png" );

/**
 * @class
 */
function BrowserTabBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BrowserTabBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserTabBinding.prototype.toString = function () {

	return "[BrowserTabBinding]";
}

/**
 * @overloads {TabBinding#buildDOMContent}
 */
BrowserTabBinding.prototype.buildDOMContent = function () {

	BrowserTabBinding.superclass.buildDOMContent.call ( this );
	
	var img = this.bindingDocument.createElement ( "img" );
	img.src = BrowserTabBinding.IMG_CLOSE_DEFAULT;
	img.style.display = "none";
	this.labelBinding.bindingElement.appendChild ( img );
	this.shadowTree.closeImage = img;
	
	setTimeout ( function () { // before label is set, img is oddly placed.
		img.style.display = "inline";
	}, 0 );
	
	var self = this;
	var handler = {
		handleEvent : function ( e ) {
			switch ( e.type ) {
				case DOMEvents.MOUSEOVER :
					img.src = BrowserTabBinding.IMG_CLOSE_HOVER;
					break;
				case DOMEvents.MOUSEOUT :
					img.src = BrowserTabBinding.IMG_CLOSE_DEFAULT;
					break;
				case DOMEvents.CLICK :
					self.dispatchAction ( BrowserTabBinding.ACTIONVENT_CLOSE );
					self.containingTabBoxBinding.removeTab ( self );
					break;
			}
		}
	}
	
	DOMEvents.addEventListener ( img, DOMEvents.MOUSEOVER, handler );
	DOMEvents.addEventListener ( img, DOMEvents.MOUSEOUT, handler );
	DOMEvents.addEventListener ( img, DOMEvents.CLICK, handler );
}

/**
 * BrowserTabBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {BrowserTabBinding}
 */
BrowserTabBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:tab", ownerDocument );
	return UserInterface.registerBinding ( element, BrowserTabBinding );
}