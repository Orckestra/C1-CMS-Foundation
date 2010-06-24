TemplateTreeBinding.prototype = new TreeBinding;
TemplateTreeBinding.prototype.constructor = TemplateTreeBinding;
TemplateTreeBinding.superclass = TreeBinding.prototype;

/**
 * @class
 */
function TemplateTreeBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TemplateTreeBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TemplateTreeBinding.prototype.toString = function () {
	
	return "[TemplateTreeBinding]";
}

/**
 * Don't allow invalid markup to be stored in placeholders!
 * @overwrites {TreeBinding#handleAction}
 * @param {Action} action
 */
TemplateTreeBinding.prototype.handleAction = function ( action ) {
	
	// overwrite - not overload!
	
	var isPropagate = true;
	
	switch ( action.type ) {
		case TreeNodeBinding.ACTION_ONFOCUS :
			var page = this.bindingWindow.bindingMap.editorpage;
			if ( page.isSourceMode ) {
				if ( !page.validate ()) {
					isPropagate = false;
				}
			}
			break;
	}
	if ( isPropagate ) {
		TemplateTreeBinding.superclass.handleAction.call ( this, action );
	}
}


