SplitterBinding.prototype = new Binding;
SplitterBinding.prototype.constructor = SplitterBinding;
SplitterBinding.superclass = Binding.prototype;

SplitterBinding.DIMENSION = 0;
SplitterBinding.BUFFER = 30;

SplitterBinding.COLLAPSE_AFTER = "after";
SplitterBinding.COLLAPSE_BEFORE = "before";

SplitterBinding.ACTION_DRAGSTART = "splitter dragstart";
SplitterBinding.ACTION_DRAGGED = "splitter dragged";
SplitterBinding.ACTION_COLLAPSE = "splitter collapse";
SplitterBinding.ACTION_UNCOLLAPSE = "splitter uncollapse";

SplitterBinding.CLASSNAME_ACTIVE = "active";
SplitterBinding.CLASSNAME_HOVER = "hover";

/**
 * @class
 * TODO: extend FlexBoxBinding to fix rendering bug in explorer!
 */
function SplitterBinding () {

	/** 
	 * @type {SystemLogger} 
	 */
	this.logger = SystemLogger.getLogger ( "SplitterBinding" );
	
	/** 
	 * @type {boolean} 
	 */
	this.isDraggable = true;
	
	/** 
	 * @type {boolean} 
	 */
	this.isDragging = false;
	
	/** 
	 * @type {boolean} 
	 */
	this.isCollapsed = false;
	
	/**
	 * @type {boolean}
	 */
	this.isDisabled = true;
	
	/** 
	 * @type {SplitBoxBinding} 
	 */
	this._containingSplitBoxBinding = null;
	
	/** 
	 * @type {string} 
	 */
	this._collapseDirection = SplitterBinding.COLLAPSE_AFTER;
	
	/** 
	 * @type {int} 
	 */
	this.offset = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SplitterBinding.prototype.toString = function () {

	return "[SplitterBinding]";
}

/**
 * Serialize binding.
 * Overloads {Binding#serialize}
 * @return {HashMap<string><object>}
 */
SplitterBinding.prototype.serialize = function () {
	
	var result = SplitBoxBinding.superclass.serialize.call ( this );
	if ( result ) {
		result.collapse = this.getProperty ( "collapse" );
		result.collapsed = this.getProperty ( "collapsed" );
		result.disabled = this.getProperty ( "isdisabled" );
	}
	return result;
}

/**
 * @overloads {Binding#onBindingAttach}
 */
SplitterBinding.prototype.onBindingAttach = function () {

	SplitterBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( Binding.ACTION_DRAG );
	
	this._containingSplitBoxBinding = this.getAncestorBindingByLocalName ( "splitbox" );
	this.attachClassName ( this._containingSplitBoxBinding.getOrient ());
	this._collapseDirection = this.getProperty ( "collapse" );
	
	this.buildDOMContent ();
	this.attachDOMEvents ();
	
	var hidden = this.getProperty ( "hidden" );
	if ( hidden ) {
		this.hide ();
	}
}

/**
 * Build DOM content.
 */
SplitterBinding.prototype.buildDOMContent = function () {
	
	this.shadowTree.splitterBody = DOMUtil.createElementNS ( 
		Constants.NS_UI, "ui:splitterbody", this.bindingDocument
	);
	this.bindingElement.appendChild ( this.shadowTree.splitterBody );
	
	/*
	 * When stage splitpanels are unmaximized, the splitter 
	 * may dissapear in Mozilla unless we append some content.
	 */
	if ( Client.isMozilla == true ) {
		var text = this.bindingDocument.createTextNode ( "!" );
		this.bindingElement.appendChild ( text );
	}
}

/**
 * Attach DOM event listeners.
 */
SplitterBinding.prototype.attachDOMEvents = function () {
	
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEOUT );
}

/**
 * Collapse. Containing SplitBoxBinding handles the splitpanels. Remember to 
 * uncollapse (ie, dont call this method twice with different directions). UDPATE TEXT????
 */
SplitterBinding.prototype.collapse = function () {
	
	if ( !this.isCollapsed ) {
		this.hide ();
		this.setProperty ( "collapsed", "true" );
		this.isCollapsed = true;
		this.dispatchAction ( SplitterBinding.ACTION_COLLAPSE );
	}
}

/**
 * Uncollapse.
 */
SplitterBinding.prototype.unCollapse = function () {
	
	if ( this.isCollapsed == true ) {
		this.show ();
		this.deleteProperty ( "collapsed" );
		this.isCollapsed = false;
		this.dispatchAction ( SplitterBinding.ACTION_UNCOLLAPSE );
	}
}

/**
 * Get collapse direction.
 * @return {string}
 */
SplitterBinding.prototype.getCollapseDirection = function () {
	
	return this._collapseDirection;
}

/**
 * Set collapse direction.
 * @param {string} direction
 */
SplitterBinding.prototype.setCollapseDirection = function ( direction ) {
	
	this.setProperty ( "collapse", direction );
	this._collapseDirection = direction;
}


/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SplitterBinding.prototype.handleAction = function ( action ) {
	
	SplitterBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case Binding.ACTION_DRAG :
			this.dragger.registerHandler ( this );
			action.consume ();
			break;
	}
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
SplitterBinding.prototype.handleEvent = function ( e ) {
	
	SplitterBinding.superclass.handleEvent.call ( this, e );
	
	var binding = this;
	
	if ( !this.isDragging && !this.isDisabled ) {
		switch ( e.type ) {
			case DOMEvents.MOUSEOVER :
				window.splitterTimeout = window.setTimeout ( function () {
					binding.shadowTree.splitterBody.className = SplitterBinding.CLASSNAME_HOVER;
				}, 250 );
				break;
			case DOMEvents.MOUSEOUT :
				if ( window.splitterTimeout ) {
					window.clearTimeout ( window.splitterTimeout );
				}
				if ( binding.shadowTree.splitterBody.className == SplitterBinding.CLASSNAME_HOVER ) {
					this.shadowTree.splitterBody.className = "";
				}
				break;
		}
	}
}

/**
 * Notice that the {@link StageSplitterBinding} overwrites this method.
 * @param {Point} point
 */
SplitterBinding.prototype.onDragStart = function ( point ) {
	
    this.dispatchAction ( SplitterBinding.ACTION_DRAGSTART );
	this.attachClassName ( SplitterBinding.CLASSNAME_ACTIVE );
	this.shadowTree.splitterBody.className = SplitterBinding.CLASSNAME_ACTIVE;
	this.isDragging = true;
}

/**
 * Notice that the {@link StageSplitterBinding} overwrites this method.
 * @param {Point} diff
 */
SplitterBinding.prototype.onDrag = function ( diff ) {

	diff = this.getEvaluatedDiff ( diff );

	if ( this._containingSplitBoxBinding.isHorizontalOrient ()) {
		this.shadowTree.splitterBody.style.left = diff.x + "px";
	} else {
		this.shadowTree.splitterBody.style.top = diff.y + "px";
	}
}

/**
 * Dispatced action causes containing slitbox to redraw.
 * Notice that the {@link StageSplitterBinding} overwrites this method.
 * @see {SplitBoxBinding#handleAction}
 * @param {Point} diff
 */
SplitterBinding.prototype.onDragStop = function ( diff ) {

	diff = this.getEvaluatedDiff ( diff );

	/*
	 * Redraw containing layout
	 */
	this.offset = this._containingSplitBoxBinding.isHorizontalOrient () ? diff.x : diff.y;
	this.dispatchAction ( SplitterBinding.ACTION_DRAGGED );
	this.offset = null;
	
	/* 
	 * Reset splitter setup
	 */
	this.detachClassName ( SplitterBinding.CLASSNAME_ACTIVE );
	this.shadowTree.splitterBody.className = "";
	this.isDragging = false;
	
	if ( this._containingSplitBoxBinding.isHorizontalOrient ()) {
		this.shadowTree.splitterBody.style.left = "0";
	} else {
		this.shadowTree.splitterBody.style.top = "0";
	}
}

/**
 * Given a point, returns a point withing the allowed positioning area of the splitter.
 * @param {Point} diff
 * @return {Point}
 */
SplitterBinding.prototype.getEvaluatedDiff = function ( diff ) {
	
	switch ( this._containingSplitBoxBinding.getOrient ()) {
	
		case SplitBoxBinding.ORIENT_HORIZONTAL :
			var x = this.bindingElement.offsetLeft;
			var w = this.bindingElement.offsetWidth;
			var t = this.bindingElement.parentNode.offsetWidth;
			var min = - x + SplitterBinding.BUFFER;
			var max = t - x - w - SplitterBinding.BUFFER;
			diff.x = diff.x <= min ? min : diff.x;
			diff.x =  diff.x >= max ? max : diff.x;
			break;
		
		case SplitBoxBinding.ORIENT_VERTICAL :
			var y = this.bindingElement.offsetTop;
			var h = this.bindingElement.offsetHeight;
			var t = this.bindingElement.parentNode.offsetHeight;
			var min = - y + SplitterBinding.BUFFER;
			var max = t - y - h - SplitterBinding.BUFFER;
			diff.y = diff.y <= min ? min : diff.y;
			diff.y =  diff.y >= max ? max : diff.y;
			break;
	}
	return diff;
}

/**
 * Disable.
 */
SplitterBinding.prototype.disable = function () {
	
	if ( !this.isDisabled ) {
		alert ( "disable" );
		this.isDisabled = true;
		this.disableDragging ();
		this.setProperty ( "isdisabled", true );
	}
}

/**
 * Enable.
 */
SplitterBinding.prototype.enable = function () {
	
	if ( this.isDisabled == true ) {
		this.isDisabled = false;
		this.enableDragging ();
		this.deleteProperty ( "isdisabled" );
	}
}

/**
 * SplitterBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SplitterBinding}
 */
SplitterBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:splitter", ownerDocument );
	return UserInterface.registerBinding ( element, SplitterBinding );
}