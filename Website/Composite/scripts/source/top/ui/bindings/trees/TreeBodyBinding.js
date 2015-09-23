TreeBodyBinding.prototype = new FlexBoxBinding;
TreeBodyBinding.prototype.constructor = TreeBodyBinding;
TreeBodyBinding.superclass = FlexBoxBinding.prototype;

TreeBodyBinding.PADDING_TOP = 8;

/**
 * @class
 */
function TreeBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeBodyBinding" );
	
	/**
	 * @type {TreeBinding}
	 */
	this.containingTreeBinding = null;

	/*
	 * Returnable.
	 */
	return this;
}


/**
 * Identifies binding.
 */
TreeBodyBinding.prototype.toString = function () {

	return "[TreeBodyBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TreeBodyBinding.prototype.onBindingAttach = function () {

	TreeBodyBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( TreeNodeBinding.ACTION_FOCUSED );
	this.containingTreeBinding = UserInterface.getBinding ( 
		this.bindingElement.parentNode
	);
}

/**
 * @implements {IAcceptable}
 * @param {Binding} binding
 */
TreeBodyBinding.prototype.accept = function ( binding ) {

	if ( binding instanceof TreeNodeBinding ) {
		this.logger.debug ( binding );
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
TreeBodyBinding.prototype.handleAction = function ( action ) {
	
	TreeBodyBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case TreeNodeBinding.ACTION_FOCUSED :
			this._scrollIntoView ( action.target );
			action.consume ();
			break;
		
	}
}


/**
 * Adjust scroll position so that focused treenodes are always visible.
 * @param {TreeNodeBinding} treenode
 */
TreeBodyBinding.prototype._scrollIntoView = function ( treenode ) {
	
	var label = treenode.labelBinding.bindingElement;
	var a = this.bindingElement.clientHeight;
	var b = this.bindingElement.clientWidth;
	var y = treenode.boxObject.getGlobalPosition().y - this.boxObject.getGlobalPosition().y;
	var x = DOMUtil.getGlobalPosition(label).x - this.boxObject.getGlobalPosition().x;
	var h = label.offsetHeight;
	var w = 100;
	var t = this.bindingElement.scrollTop;
	var l = this.bindingElement.scrollLeft;

	
	/*
	 * Scroll top.
	 */
	if ( y - t < 0 ) {
		this.bindingElement.scrollTop = y;
	} else if ( y - t + h > a ) {
		this.bindingElement.scrollTop = y + h - a;
		//label.scrollIntoView ( false );
	}
	/*
	 * Scroll left.
	 */
	if (x - l < 0) {
		this.bindingElement.scrollLeft = x;
	}else if (x - l + w > b) {
		this.bindingElement.scrollLeft = x + w - b;
	}
}

/**
 * @implements {IAcceptable}
 *
TreeBodyBinding.prototype.showAcceptance = function () {
	
	this.bindingElement.style.backgroundColor = "yellow";	
}

/**
 * @implements {IAcceptable}
 *
TreeBodyBinding.prototype.hideAcceptance = function () {
	
	this.bindingElement.style.backgroundColor = "Window";	
}
*/

/**
 * TreeBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeBodyBinding}
 */
TreeBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treebody", ownerDocument );
	return UserInterface.registerBinding ( element, TreeBodyBinding );
}