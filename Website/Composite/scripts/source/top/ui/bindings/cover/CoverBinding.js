CoverBinding.prototype = new Binding;
CoverBinding.prototype.constructor = CoverBinding;
CoverBinding.superclass = Binding.prototype;

CoverBinding.CLASSNAME_TRANSPARENT = "transparent";

/**
 * Fade out cover.
 * TODO: move to higher order utility - an universal fade system?
 * TODO: Replace cover DIV with CSS transforms, canvas tag and/or IE transitions.
 * @param {CoverBinding} cover
 */
CoverBinding.fadeOut = function ( cover ) {
	
	function setOpacity ( opacity ) {
		cover.bindingElement.style.opacity = new String ( opacity );
	}

	if (cover instanceof CoverBinding) {
		new Animation ({
			modifier : 18,
			onstep : function ( iterator ) {
				if ( Binding.exists ( cover )) {
					setOpacity ( 
						Math.cos ( 
							iterator * Math.PI / 180
						)
					);
				}
			},
			onstop : function () {
				if ( Binding.exists ( cover )) {
					cover.hide ();
				}
			}
		}).play ();
	}
}

/**
 * Fade in cover
 * TODO: move to higher order utility.
 * @param {CoverBinding} cover
 */
CoverBinding.fadeIn = function ( cover ) {
	
	function setOpacity ( opacity ) {
		cover.bindingElement.style.MozOpacity = new String ( opacity );
	}

	if (cover instanceof CoverBinding) {
		new Animation ({
			modifier : 18,
			onstart : function () {
				if ( Binding.exists ( cover )) {
					setOpacity ( 0 );
					cover.show ();
				}
			},
			onstep : function ( iterator ) {
				if ( Binding.exists ( cover )) {
					setOpacity ( 
						Math.sin ( 
							iterator * Math.PI / 180
						)
					);
				}
			},
			onstop : function () {
				setOpacity ( 1 );
			}
		}).play ();
	}
};

/**
 * @class
 */
function CoverBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CoverBinding" );
	
	/**
	 * Indicates that the cover should display a "wait" cursor when visible.
	 * @type {boolean}
	 */
	this._isBusy = true;
	
	/**
	 * @type {boolean}
	 */
	this._isTransparent = false;

	/**
	 * @type {DateTime}
	 */
	this.lastTouch = null;
	
	/**
	 * Stores the mouse position in a panicked attempt 
	 * to gain control of the rendered cursor.
	 * @type {Position}
	 */
	this._position = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
CoverBinding.prototype.toString = function () {
	
	return "[CoverBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
CoverBinding.prototype.onBindingRegister = function () {
	
	CoverBinding.superclass.onBindingRegister.call ( this );
	
	/*
	 * Remember that this will interfere with the StandardEventHandler. 
	 * Event blocking should probably only be used on the mastercover.
	 */
	if ( this.getProperty ( "blockevents" )) {
		this.addEventListener ( DOMEvents.MOUSEDOWN );
		this.addEventListener ( DOMEvents.MOUSEUP );
		this.addEventListener ( DOMEvents.MOUSEMOVE );
		this.addEventListener ( DOMEvents.CLICK );
		this.addEventListener ( DOMEvents.DOUBLECLICK );


	}

	if (this.getProperty("doubletouchunlock")) {
		this.addEventListener(DOMEvents.TOUCHEND);
	}
	
	if ( this.getProperty ( "transparent" ) == true ) {
		this.setTransparent ( true );
	}
	
	if ( this.getProperty ( "busy" ) == false ) {
		this._isBusy = false;
	}
	
	if ( this._isBusy ) {
		this.bindingElement.style.cursor = "wait";
	}


}

/**
 * @overloads {Binding#show}
 */
CoverBinding.prototype.show = function () {
	
	CoverBinding.superclass.show.call ( this );
	if ( this._isBusy && this.isVisible ) {
		this.addEventListener ( DOMEvents.MOUSEMOVE );
	}
}

/**
 * Busy cover will summon the UncoverBinding.
 * @overloads {Binding#hide}
 */
CoverBinding.prototype.hide = function () {
	
	CoverBinding.superclass.hide.call ( this );
	if ( this._isBusy && !this.isVisible && this._position ) {
		UncoverBinding.uncover ( this._position );
		this.removeEventListener ( DOMEvents.MOUSEMOVE );
	}
}

/**
 * Tracking mouse position so that we know where to position the UncoverBinding.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
CoverBinding.prototype.handleEvent = function ( e ) {
	
	CoverBinding.superclass.handleEvent.call ( this, e );
	
	DOMEvents.stopPropagation ( e );
	
	switch ( e.type ) {
		case DOMEvents.MOUSEMOVE :
			this._position = DOMUtil.getUniversalMousePosition(e);
			break;
		case DOMEvents.TOUCHEND:
			//Check double tap
			if (this.lastTouch && Date.now() - this.lastTouch < 300)
			{
				if (Application.isLocked) {
					Application.unlock(Application, true);
				}
			}
			this.lastTouch = Date.now();
			break;
	}
}

/**
 * Control busy cursor.
 * @param {boolean} isBusy
 */
CoverBinding.prototype.setBusy = function ( isBusy ) {
	
	if ( isBusy != this._isBusy ) {
		if ( isBusy ) {
			this.bindingElement.style.cursor = "wait";
		} else {
			this.bindingElement.style.cursor = "default";
		}
		this._isBusy = isBusy;
	}
}

/**
 * Set transparency (it either is or it isn't).
 * @param {boolean} isTransparent
 */
CoverBinding.prototype.setTransparent = function ( isTransparent ) {
	
	if ( isTransparent != this._isTransparent ) {
		if ( isTransparent ) {
			this.attachClassName ( CoverBinding.CLASSNAME_TRANSPARENT );
		} else {
			this.detachClassName ( CoverBinding.CLASSNAME_TRANSPARENT );
		}
		this._isTransparent = isTransparent;
	}
}

/**
 * Set width. Progressbar uses this...
 * @see {ProgressBarBinding}
 * @param {int} width
 */
CoverBinding.prototype.setWidth = function ( width ) {
	
	if ( width >= 0 ) {
		this.bindingElement.style.width = new String ( width + "px" );
	}
}

/**
 * Get width.
 * @return {int}
 */
CoverBinding.prototype.getWidth = function () {
	
	return this.bindingElement.offsetWidth;
}

/**
 * Set height.
 * @param {int} width
 */
CoverBinding.prototype.setHeight = function ( height ) {
	
	if ( height >= 0 ) {
		this.bindingElement.style.height = new String ( height + "px" );
	}
}

/**
 * Get height.
 * @return {int}
 */
CoverBinding.prototype.getHeight = function () {
	
	return this.bindingElement.offsetHeight;
}

/**
 * CoverBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {CoverBinding}
 */
CoverBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:cover", ownerDocument );
	return UserInterface.registerBinding ( element, CoverBinding );
}