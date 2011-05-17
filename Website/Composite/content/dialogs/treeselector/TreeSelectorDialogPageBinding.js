TreeSelectorDialogPageBinding.prototype = new DialogPageBinding;
TreeSelectorDialogPageBinding.prototype.constructor = TreeSelectorDialogPageBinding;
TreeSelectorDialogPageBinding.superclass = DialogPageBinding.prototype;

/*

	HOW TO USE:
	
	var handler = {
			handleDialogResponse : function ( response, result ) {
				if ( response == Dialog.RESPONSE_ACCEPT ) {
					getQueryTreeBinding ().buildFromServer ( result.get ( 0 ));
				}
			}
		} 
		var arg = {
			label 				: "Select Image",
			key 				: "ReadOnlyXmlProviderElementProvider",
			selectionProperty 	: "ElementType",
			selectionValue		: "image/jpg image/gif image/png",
			selectionResult		: "ElementId"
		}
		Dialog.invokeModal ( Dialog.URL_TREESELECTOR, handler, arg );
*/

/**
 * @class
 */
function TreeSelectorDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeSelectorDialogPageBinding" );
	
	/**
	 * @type {string}
	 *
	this._key = null;
	*/
	
	/**
	 * @type {SystemTreeBinding}
	 */
	this._treeBinding = null;
	
	/**
	 * The name of the treenode property on which to base tree selection.
	 * @type {string}
	 */
	this._selectionProperty = null;
	
	/**
	 * The (optional) treenode property value on which to base tree selection. Multiple 
	 * values supported, separated by whitespace. Omit to allow all values for property.
	 * @type {string} Whitespace-separated list of values.
	 */
	this._selectionValue = null;
	
	/**
	 * The name of the treenode property whose value will form the RESULT.
	 * @type {string}
	 */
	this._selectionResult = null;
	
	/**
	 * Search token.
	 * @type {string}
	 *
	this._selectionSearch = null;
	*/
	
	/**
	 * Root nodes in tree. Each object in array may have two properties, 
	 * a required named provider key and an optional search token.
	 * @type {Array<Object>}
	 */
	this._nodes = null;
}

/**
 * Identifies binding.
 */
TreeSelectorDialogPageBinding.prototype.toString = function () {

	return "[TreeSelectorDialogPageBinding]";
}

/** 
 * Fetch properties from page argument.
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
TreeSelectorDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	TreeSelectorDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this.label				= arg.label;
	this.image				= arg.image;
	this._key 				= arg.key;
	this._selectionProperty = arg.selectionProperty;
	this._selectionValue 	= arg.selectionValue;
	this._selectionResult	= arg.selectionResult
	this._nodes				= arg.nodes;
	
	/*
	 * This could be a searchtoken *or* a searchtoken key.
	 *
	var search = arg.selectionSearch;
	
	if ( search ) {
		if ( SearchTokens.hasToken ( search )) {
			search = SearchTokens.getToken ( search );
		}
		this._selectionSearch = search;
	}
	*/
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
TreeSelectorDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	this._treeBinding = this.bindingWindow.bindingMap.selectiontree;
	this._treeBinding.addActionListener ( TreeBinding.ACTION_SELECTIONCHANGED, this );
	this._treeBinding.addActionListener ( TreeBinding.ACTION_NOSELECTION, this );
	this._treeBinding.setSelectable ( true );
	this._treeBinding.setSelectionProperty ( this._selectionProperty );
	this._treeBinding.setSelectionValue ( this._selectionValue );
	
	/*
	 * Build root nodes.
	 */
	this._injectTreeNodes ( 
		new List ( this._nodes )
	);
	
	/*
	this._treeBinding.searchToken = this._selectionSearch;
	
	var nodes = null;
	
	if ( this._treeBinding.searchToken ) {
		nodes = System.getNamedRootsBySearchToken ( 
			this._key, this._treeBinding.searchToken 
		);
	} else {
		nodes = System.getNamedRoots ( this._key );
	}
	while ( nodes.hasNext ()) {
		var node = SystemTreeNodeBinding.newInstance ( 
			nodes.getNext (), 
			this.bindingDocument 
		)
		this._treeBinding.add ( node ); 
		node.attach ();
	}
	*/
	
	TreeSelectorDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Inject root nodes in tree.
 * @param {List<object>}
 */
TreeSelectorDialogPageBinding.prototype._injectTreeNodes = function ( list ) {
	
	while ( list.hasNext ()) {
	
		/*
		 * Fetch key and search.
		 */
		var object = list.getNext ();
		var key = object.key;
		var search = object.search;
		
		/*
		 * Search could be both a searchtoken *or* a searchtoken key.
		 */
		if ( search != null && SearchTokens.hasToken ( search )) {
			search = SearchTokens.getToken ( search );
		}
		
		/*
		 * Build treenodes.
		 */
		var nodes = null;
		if ( search != null ) {
			nodes = System.getNamedRootsBySearchToken ( key, search );
		} else {
			nodes = System.getNamedRoots ( key );
		}
		var count = 0;
		while ( nodes.hasNext ()) {
			var node = SystemTreeNodeBinding.newInstance ( 
				nodes.getNext (), 
				this.bindingDocument 
			)
			this._treeBinding.add ( node );
			node.attach();

			// Auto expand tree folders in selection dialogs, when only one folder can be expanded.
			count++;
			if (!nodes.hasNext() && count == 1)
				if (node.isContainer && !node.isOpen) {
					var self = node;
					setTimeout(function () {
						self.open();
					}, 0);
				}
		}
	}
}

/**
 * Executed when the page is shown.
 */
TreeSelectorDialogPageBinding.prototype.onAfterPageInitialize = function () {
	
	TreeSelectorDialogPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	this._treeBinding.focus ();
	this._treeBinding.selectDefault ();
}

/**
 * @implements {IActionListener}
 * @overloads {DialogPageBinding#handleAction}
 * @param {Action} action
 */
TreeSelectorDialogPageBinding.prototype.handleAction = function ( action ) {
	
	TreeSelectorDialogPageBinding.superclass.handleAction.call ( this, action );
	
	if ( window.TreeSelectorDialogPageBinding && window.TreeBinding ) {  // huh?
	
		switch ( action.type ) {
			case TreeBinding.ACTION_SELECTIONCHANGED :
				this._updateDisplayAndResult ();
				break;
			case TreeBinding.ACTION_NOSELECTION :
				this._clearDisplayAndResult ();
				break;
		}
		
		TreeSelectorDialogPageBinding.superclass.handleAction.call ( this, action );
	}
}

/**
 * Update selections display and store result.
 */
TreeSelectorDialogPageBinding.prototype._updateDisplayAndResult = function () {

	var selections 	= this._treeBinding.getSelectedTreeNodeBindings ();
	var dataInput	= this.bindingWindow.DataManager.getDataBinding ( "treeselectionresult" );
	var okButton	= bindingMap.buttonAccept;
	var result 		= new List ();
	var value 		= new String ( "" );
	var prop 		= this._selectionResult;
	
	selections.each ( function ( binding ) {
		result.add ( 
			binding.getProperty ( prop )
		);
		value += binding.getLabel ();
		if ( selections.hasNext ()) {
			value += "; ";
		}
	});
	
	if ( dataInput.isDisabled ) {
		dataInput.enable ();
		okButton.enable ();
	}
	
	dataInput.setValue ( value );
	this.result = result;
}

/**
 * Cleart selections display and null result.
 */
TreeSelectorDialogPageBinding.prototype._clearDisplayAndResult = function () {

	var dataInput = this.bindingWindow.DataManager.getDataBinding ( "treeselectionresult" );
	var okButton = bindingMap.buttonAccept;
	
	if ( !dataInput.isDisabled ) {
		dataInput.disable ();
		okButton.disable ();
	}
	
	dataInput.setValue ( "" );
	this.result = null;
}
