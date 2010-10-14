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
	
	var a = this.boxObject.getDimension ().h;
	var y = treenode.boxObject.getLocalPosition ().y;
	var h = treenode.boxObject.getDimension ().h;
	var t = this.bindingElement.scrollTop;
	var l = this.bindingElement.scrollLeft;
	
	/*
	 * Scroll into view.
	 */
	var label = treenode.labelBinding.bindingElement;
	if ( y - t < 0 ) {
		label.scrollIntoView ( true );
	} else if ( y - t + h > a ) {
		label.scrollIntoView ( false );
	}
	
	/*
	 * Firefox 3.6.10 seems to first scroll the tree window, 
	 * then scroll the TOP window so that treenode appears 
	 * right at the top of the viewport. Probably a bug,  
	 * but this will fix it.
	 */
	try {
		
		/*
		 * Fix the top window.
		 */
		top.document.documentElement.scrollTop = 0;
		top.document.body.scrollTop = 0;
		
		/*
		 * Fix the app window.
		 */
		top.app.document.documentElement.scrollTop = 0;
		top.app.document.body.scrollTop = 0;
		
	} catch ( exception ) {
		
		// Cannot test this now, so just in case...
	}
	
	/*
	 * IE may present an extreme horizontal scroll. 
	 * We hack it by locking scrollLeft completely. 
	 * Tough luck for deeply nested tree structures.
	 */
	if ( Client.isExplorer ) {
		this.bindingElement.scrollLeft = l;
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