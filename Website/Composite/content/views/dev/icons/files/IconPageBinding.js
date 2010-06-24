IconPageBinding.prototype = new PageBinding;
IconPageBinding.prototype.constructor = IconPageBinding;
IconPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function IconPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "IconPageBinding" );
}

/**
 * Identifies binding.
 */
IconPageBinding.prototype.toString = function () {
	
	return "[IconPageBinding]";
}

/**
 * @overloads {PageBinding#onPageInitialize}
 */
IconPageBinding.prototype.onBeforePageInitialize = function () {
	
	IconPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	var toolbar = bindingMap.toolbar;
	var win = bindingMap.window;
	
	toolbar.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED, {
		handleAction : function ( action ) {
			var size = action.target.getCheckedButtonBinding ().getLabel ();
			win.setURL ( 
				win.getProperty ( "baseurl" ) + "?size=" + size 
			);
		}
	});
}