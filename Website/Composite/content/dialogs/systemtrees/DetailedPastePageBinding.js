DetailedPastePageBinding.prototype = new DialogPageBinding;
DetailedPastePageBinding.prototype.constructor = DetailedPastePageBinding;
DetailedPastePageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function DetailedPastePageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DetailedPastePageBinding" );
	
	/**
	 * List<SystemNode>
	 */
	this._list = null;
}

/**
 * Identifies binding.
 */
DetailedPastePageBinding.prototype.toString = function () {
	
	return "[StandardDialogPageBinding]";

}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {List<SystemNode>} nodes
 */
DetailedPastePageBinding.prototype.setPageArgument = function ( nodes ) {
	
	DetailedPastePageBinding.superclass.setPageArgument.call ( this, nodes );

	var list = new List ();
	var iterate = 0;
	nodes.each ( function ( node ) {
	    if ( node.hasDragAccept ()) { // TODO: implement highly advanced check for accept type...
		    list.add ( 
			    new SelectorBindingSelection ( 
				    node.getLabel (),
				    String ( iterate ),
				    false,
				    node.getImageProfile ()
			    )
		    );
		    iterate ++;
		}
	});
	this._list = list;
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
DetailedPastePageBinding.prototype.onBeforePageInitialize = function () {
	
	var manager = this.bindingWindow.DataManager;
	
	/*
	 * Fix selector.
	 */
	var selector = manager.getDataBinding ( "sibling" );
	selector.populateFromList ( this._list );
	if ( this._list.getLength () == 1 ) {
		selector.disable ();
	}
	
	/*
	 * Fix radiogroup.					
	 */
	var radiogroup = manager.getDataBinding ( "switch" );
	radiogroup.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED, {
		handleAction : function ( action ) {
			switch ( radiogroup.getValue ()) {
				case "before" :
					bindingMap.insertlabel.setLabel (
						StringBundle.getString ( "ui", "Website.Dialogs.SystemTree.DetailedPaste.LabelInsertBefore" )
					);
					break;
				case "after" :
					bindingMap.insertlabel.setLabel (
						StringBundle.getString ( "ui", "Website.Dialogs.SystemTree.DetailedPaste.LabelInsertAfter" )
					);
					break;
			}
			action.consume ();	
		}
	});
	
	DetailedPastePageBinding.superclass.onBeforePageInitialize.call ( this );
}