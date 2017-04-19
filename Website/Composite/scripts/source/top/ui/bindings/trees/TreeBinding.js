TreeBinding.prototype = new FlexBoxBinding;
TreeBinding.prototype.constructor = TreeBinding;
TreeBinding.superclass = FlexBoxBinding.prototype;

TreeBinding.ACTION_SELECTIONCHANGED 	= "tree selection changed";
TreeBinding.ACTION_NOSELECTION 			= "tree selection none";
TreeBinding.SELECTIONTYPE_SINGLE 		= "single";
TreeBinding.SELECTIONTYPE_MULTIPLE 		= "multiple";

/**
 * Snap to nearest treenode position.
 * @param {int} value
 */
TreeBinding.grid = function ( value ) {
	
	var number = TreeNodeBinding.HEIGHT;
	var ceil = Math.ceil ( value ); // TODO: Aren't we forgetting to use this?
	var remainder = value % number;
	if ( remainder > 0 ) {
		value = value - remainder + number;
	}
  	return value + TreeBodyBinding.PADDING_TOP;
}



/**
 * @class
 * @implements {IFocusable}
 */
function TreeBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeBinding" );
	
	/**
	 * Disabled!!!
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * Disabled!!!
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocused = false;
	
	/**
	 * @type {TreeBodyBinding}
	 */
	this._treeBodyBinding = null;
	
	/**
	 * @type {TreePositionIndicatorBinding}
	 */
	this._positionIndicatorBinding = null;
	
	/**
	 * Added TreeNodes will be stored in this buffer 
	 * until the onBindingAttach method is called  
	 * so that we can buld trees in off-DOM memory.
	 */
	this._treeNodeBuffer = null;
	
	/**
	 * Tracking all treenodes present in the tree.
	 * @param {Map<string><TreeNodeBinding>}
	 */
	this._treeNodeBindings = null;

	/**
	 * TODO: Refactor this to a Map, maintaining a List is stressed out!
	 * @type {List<TreeNodeBinding>}
	 */
	this._focusedTreeNodeBindings = null;
	
	/**
	 * Are treenodes focusable?
	 * @type {boolean}
	 */
	this._isFocusable = true;
	
	/**
	 * Special for tree selection stuff in dialogs. 
	 * Not to be confused with focusable stuff!
	 * @type {boolean}
	 */
	this._isSelectable = false;
	
	/**
	 * Special for tree selection stuff in dialogs.
	 * @type {string>
	 */
	this._selectionProperty = null;
	
	/** 
	 * Special for tree selection stuff in dialogs.
	 * @type {HashMap<string><boolean>}
	 */
	this._selectonValue = null;
	
	/**
	 * @type {HashMap<string><TreeNodeBinding>}
	 */
	this._selectedTreeNodeBindings = null;
	
	/**
	 * @type {string}
	 */
	this._selectionType = TreeBinding.SELECTIONTYPE_SINGLE;
	
	/**
	 * @type {function}
	 */
	this._actionFilter = null;
	
	/**
	 * @type {Position}
	 */
	this._acceptingPosition = null;
	
	/**
	 * @type {Dimension}
	 */
	this._acceptingDimension = null;
	
	/**
	 * @type {TreeNodeBinding}
	 */
	this._acceptingTreeNodeBinding = null;
	
	/**
	 * @type {HashMap<int><boolean>}
	 */
	this._acceptingPositions = null;
	
	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID, FitnessCrawler.ID ]);
	
	/**
	 * Intercepting keys for navigation?
	 * @type {boolean}
	 */
	this._hasKeyboard = false;
	
	/**
	 * @type {int}
	 */
	this._yposition = 0;
	
	/**
	 * TEMP solution to backup treenodes open-state on UpdateManager refreshes.
	 * @type {Map<String>}
	 */
	this._openTreeNodesBackupMap = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TreeBinding.prototype.toString = function () {

	return "[TreeBinding]";
}

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
TreeBinding.prototype.onBindingRegister = function () {

	TreeBinding.superclass.onBindingRegister.call ( this );
	
	this._treeNodeBindings = new Map ();
	this._treeNodeBuffer = new List ();
	this._focusedTreeNodeBindings = new List ();
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TreeBinding.prototype.onBindingAttach = function () {
	
	TreeBinding.superclass.onBindingAttach.call ( this );
	
	var focusable = this.getProperty ( "focusable" );
	if ( focusable != null ) {
		this._isFocusable = focusable;
	}

	if (!this._treeBodyBinding && this.bindingElement.childElementCount === 0) {
		this._treeBodyBinding = TreeBodyBinding.newInstance(this.bindingDocument);
		this.bindingElement.appendChild(
			this._treeBodyBinding.bindingElement
		);
		this._treeBodyBinding.attach();
	}

	if ( !this._treeBodyBinding ) {
		this._treeBodyBinding = this.addMember ( 
			this.getChildBindingByLocalName ( "treebody" )
		);
	}
	if ( !this._treeBodyBinding ) {
		
		var cry = "TreeBinding structure invalid. Missing TreeBodyBinding.";
		this.logger.error ( cry );
		if ( Application.isDeveloperMode ) {
			alert ( cry );
		}
		
	} else {
		
		this.addActionListener ( Binding.ACTION_ACTIVATED );
		this.addActionListener ( TreeNodeBinding.ACTION_OPEN );
		this.addActionListener ( TreeNodeBinding.ACTION_CLOSE );
		this.addActionListener ( TreeNodeBinding.ACTION_DISPOSE );
		
		if ( this._isFocusable ) {
			this.addActionListener ( TreeNodeBinding.ACTION_ONFOCUS );
			this.addActionListener ( TreeNodeBinding.ACTION_ONMULTIFOCUS );
			this.addActionListener ( TreeNodeBinding.ACTION_BLUR );
		}

		// TODO: only if we contain typedraggable treenodes...
		this.subscribe ( BroadcastMessages.TYPEDRAG_START );
		this.subscribe ( BroadcastMessages.TYPEDRAG_STOP );
		
		this.addEventListener ( DOMEvents.BEFOREUPDATE );
		this.addEventListener ( DOMEvents.AFTERUPDATE );
	}
}

/**
 * Flush treenode buffer when the treebody is initalized. 
 * Alternatively, populate tree from updatepanel builder.
 * @overloads {Binding#onBindingInitialize}
 */
TreeBinding.prototype.onBindingInitialize = function () {
	
	TreeBinding.superclass.onBindingInitialize.call ( this );
	
	this._setupTreeSelection ();
	
	var builder = this.getProperty ( "builder" );
	if ( builder ) {
		this._buildFromTextArea ( builder );
	} else if ( this._treeNodeBuffer.hasEntries ()) {
		while ( this._treeNodeBuffer.hasNext ()) {
			this.add ( this._treeNodeBuffer.getNext ());
		}
	}
}

/**
 * Setup selection.
 */
TreeBinding.prototype._setupTreeSelection = function () {

	var isSelectable = this.getProperty ( "selectable" );
	var selectionProperty = this.getProperty ( "selectionproperty" );
	var selectionValue = this.getProperty ( "selectionvalue" );
	
	if ( isSelectable ) {
		this.setSelectable ( true );
		if ( selectionProperty ) {
			this.setSelectionProperty ( selectionProperty );
		}
		if ( selectionValue ) {
			this.setSelectionValue ( selectionValue );
		}
	}
	
	/*
	 * This actually handles dragging, not selection. 
	 * TODO: only do this when treenodes are draggable.
	 */
	this._positionIndicatorBinding = this.add (
		TreePositionIndicatorBinding.newInstance ( 
			this.bindingDocument 
		)
	)
	this.shadowTree.positionIndicator = this._positionIndicatorBinding;
	this._positionIndicatorBinding.attach ();
}

/**
 * Build tree content from textarea value. The value 
 * value will be parsed into treenodes on each update.
 * TODO: Build an interface if we copy this setup...
 * @param {String} arg
 */
TreeBinding.prototype._buildFromTextArea = function ( id ) {
	
	var area = this.bindingDocument.getElementById ( id );
	
	if ( area != null ) {
		
		var binding = UserInterface.getBinding ( area );
		var treebody = this._treeBodyBinding;
		function build () {
			treebody.subTreeFromString ( area.value );
		}
		binding.addActionListener ( Binding.ACTION_UPDATED, {
			handleAction : function () {
				build ();
			}
		});
		setTimeout ( build, 0 ); // timeout should really not be needed here...
	}
}

/**
 * Register treenode.
 * @param {TreeNodeBinding} treeNodeBinding
 */
TreeBinding.prototype.registerTreeNodeBinding = function ( treeNodeBinding ) {
	
	var handle = treeNodeBinding.getHandle ();
	if ( this._treeNodeBindings.has ( handle )) {
		throw "Duplicate treenodehandles registered: " + treeNodeBinding.getLabel ();
	} else {
		this._treeNodeBindings.set ( handle, treeNodeBinding );
		var map = this._openTreeNodesBackupMap;
		if ( map != null && map.has ( handle )) {
			treeNodeBinding.open ();
		}
	}
}

/** 
 * Unregister treenode.
 * @param {TreeNodeBinding} treeNodeBinding
 */
TreeBinding.prototype.unRegisterTreeNodeBinding = function ( treeNodeBinding ) {
	
	this._treeNodeBindings.del ( treeNodeBinding.getHandle ());
}

/**
 * @param {string} handle
 * @return {TreeNodeBinding}
 */
TreeBinding.prototype.getTreeNodeBindingByHandle = function ( handle ) {
	
	var result = null;
	if ( this._treeNodeBindings.has ( handle )) {
		result = this._treeNodeBindings.get ( handle );
	} else {
		throw "No such treenode: " + handle;
	}
	return result;
}

/**
 * Carefully engineered to blur any focused treenodes *before* a new focus is invoked. 
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
TreeBinding.prototype.handleAction = function ( action ) {

	TreeBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {
		
		case TreeNodeBinding.ACTION_OPEN :
			action.consume ();
			break;
			
		case TreeNodeBinding.ACTION_CLOSE :
			this._blurDescendantBindings ( binding ); 
			action.consume ();
			break;
	
		case TreeNodeBinding.ACTION_ONFOCUS : 
			this._nodePrimary = binding;
			this.focusSingleTreeNodeBinding ( binding );
			if ( !this.isFocused ) {
				this.focus ();
			}
			action.consume ();
			break;
			
		case TreeNodeBinding.ACTION_ONMULTIFOCUS :
			switch ( this._selectionType ) {
				case TreeBinding.SELECTIONTYPE_SINGLE :
					this._nodePrimary = binding;
					this.focusSingleTreeNodeBinding ( binding );
					break;
					
				case TreeBinding.SELECTIONTYPE_SINGLE :
					this._nodeSecondary = binding;
					if ( !this._nodePrimary || this._nodeSecondary == this._nodePrimary ) {
						this._nodePrimary = binding;
						this.focusSingleTreeNodeBinding ( binding );
					} else {
						this.focusMultipeTreeNodeBindings (
							this._getVisibleTreeNodeBindingsInRange ( 
								this._nodePrimary, 
								this._nodeSecondary 
							)
						);
					}
					break;
			}
			if ( !this.isFocused ) {
				this.focus ();
			}
			action.consume ();
			break;
			
		case TreeNodeBinding.ACTION_DISPOSE :
			
			if ( binding.isFocused ) {
				this.blurSelectedTreeNodes (); // TODO: handle multiple selections!!!!!
			}
			/*
			var i = 0;
			this._focusedTreeNodeBindings.reset ();
			while ( this._focusedTreeNodeBindings.hasNext ()) {
				var item = this._focusedTreeNodeBindings.getNext ();
				if ( item == binding ) {
					this.blurSelectedTreeNodes (); // TODO: handle multiple selections!
					
					// blurSelected... will also clear this._focusedTreeNodeBindings!!! 
					// REFACTOR THIS SOME DAY!
					//this._focusedTreeNodeBindings.del ( i );
				}
				i++;
			}
			*/
			
			action.consume ();
			break;
			
		case TreeNodeBinding.ACTION_BLUR :
			// TODO: this should update the _focusedTreeNodeBindings index 
			// along with ACTION_DISPOSE - skip all manual bookkeeping!
			break;
			
		case Binding.ACTION_ACTIVATED :
			if ( !this.isFocused ) {
				this.focus ();
			}
			break;
	}
}

/**
 * Collecting all *visible* treenodes between two 
 * treenodes. The two treenodes are included in result.
 * @param {TreeNodeBinding} binding1
 * @param {TreeNodeBinding} binding2
 * @return {List<TreeNodeBinding>}
 */
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange = function ( binding1, binding2 ) {
	
	// TODO: move this stuff to TreeCrawler once we need it... 
	alert ( "TreeBinding#_getVisibleTreeNodeBindingsInRange" );
	
	/*
	var ElementIterator = this.bindingWindow.ElementIterator;
	var list = new List ();
	var isCollecting = false;
	var firstBinding = null;
	
	/**
	 * @param {DOMElement} element
	 * @ignore
	 *
	function elementIteratorfilter ( element ) {
	
		var returnable = true;
		var binding = UserInterface.getBinding ( element );
		if ( binding && binding instanceof TreeNodeBinding ) {
			if ( binding == binding1 || binding == binding2 ) {
				isCollecting = !isCollecting;
				if ( !firstBinding ) {
					firstBinding = binding;
				}
			}
			if ( isCollecting ) {
				if ( binding.isContainer && !binding.isOpen ) {
					returnable = ElementIterator.SKIP_CHILDREN;
				}
				list.add ( binding );
			} else if ( firstBinding ) {
				list.add ( binding );
				firstBinding = null;
				returnable = ElementIterator.STOP_ITERATION;
			}
		}
		return returnable;
	}
	
	ElementIterator.iterate ( 
		this._treeBodyBinding.getBindingElement (), 
		elementIteratorfilter
	);
	return list;
	
	*/
}

/**
 * @param {TreeNodeBinding} binding;
 */
TreeBinding.prototype.focusSingleTreeNodeBinding = function ( binding ) {
	
	if ( binding != null && !binding.isFocused ) {
		
		this.blurSelectedTreeNodes ();
		this._focusedTreeNodeBindings.add ( binding );
		binding.invokeManagedFocus ();
		
		if ( this._isSelectable ) {
			this._manageSelections ();
		}
	}
}

/**
 * TODO: THIS HAS BEEN OUT OF USE, MAY NEED UPDATING...
 * @param {List} bindings;
 */
TreeBinding.prototype.focusMultipeTreeNodeBindings = function ( bindings ) {
	
	this.blurSelectedTreeNodes ();
	while ( bindings.hasNext ()) {
		var binding = bindings.getNext ();
		this._focusedTreeNodeBindings.add ( binding );
		binding.invokeManagedFocus ();
	}
	
	if ( this._isSelectable ) {
		this._manageSelections ();
	}
}

/**
 * Manage selections. Compare focused treenodes to selection criterias, 
 * determine whether or not to dispatch a selectionchange action.
 */
TreeBinding.prototype._manageSelections = function () {
	
	var previous = this._selectedTreeNodeBindings;
	this._selectedTreeNodeBindings = {};
	var isSelectionChanged = false;
	var newEntry = null;
	
	this._focusedTreeNodeBindings.reset ();
	
	while ( this._focusedTreeNodeBindings.hasNext ()) {
		var binding = this._focusedTreeNodeBindings.getNext ();
		var value = binding.getProperty ( this._selectionProperty );
		if ( value != null ) {
			if ( !this._selectionValue || this._selectionValue [ value ]) {
				newEntry = ( 
					this._selectedTreeNodeBindings [ binding.key ] = binding 
				);
				var oldEntry = previous [ binding.key ];
				if ( !oldEntry || oldEntry != newEntry ) {
					isSelectionChanged = true;
				}
			}
		}
	}
	if ( newEntry ) {
		if ( isSelectionChanged ) {
			this.dispatchAction ( TreeBinding.ACTION_SELECTIONCHANGED );
		}
	} else if ( previous ) {
		for ( var key in previous ) {
			this.dispatchAction ( TreeBinding.ACTION_NOSELECTION );
			break;
		}
	}
}

/**
 * Get selected treenode bindings.
 * @return {List<TreeNodeBinding>}
 */
TreeBinding.prototype.getSelectedTreeNodeBindings = function () {
	
	var result = new List ();
	for ( var key in this._selectedTreeNodeBindings ) {
		result.add ( this._selectedTreeNodeBindings [ key ]);
	}
	return result;
}

/**
 * Blur focused bindings and clear the list.
 */
TreeBinding.prototype.blurSelectedTreeNodes = function () {

	this._focusedTreeNodeBindings.reset ().each (
		function ( binding ) {
			binding.blur ();
		}
	);
	this._focusedTreeNodeBindings.clear ();
}

/**
 * Blur treenodes descending from a give treenode.
 * @param {TreeNodeBinding} treenode
 */
TreeBinding.prototype._blurDescendantBindings = function ( treenode ) {
	
	var descendants = treenode.getDescendantBindingsByLocalName ( "treenode" );
	
	/*
	 * TODO: Multiple selections - what happens?
	 */
	var result = true;
	var self = this;
	descendants.each ( function ( desc ) {
		if ( desc.isFocused ) {
			desc.blur ();
			self._focusedTreeNodeBindings.del (
				self._focusedTreeNodeBindings.getIndex ( desc ) // the horror... 
			);
		}
		return result;
	});
}

/**
 * @return {List}
 */
TreeBinding.prototype.getFocusedTreeNodeBindings = function () {

	return this._focusedTreeNodeBindings.reset ();
}

/**
 * @implements {IFocusable}
 */
TreeBinding.prototype.focus = function () {
	
	if ( !this.isFocused ) {
		
		this.isFocused = true;
		FocusBinding.focusElement ( this.bindingElement );
		this.attachClassName ( Binding.CLASSNAME_FOCUSED );
		this.dispatchAction ( Binding.ACTION_FOCUSED );
		
		if ( !this.getFocusedTreeNodeBindings ().hasEntries ()) {
			if ( this.isFocusable ) {
				this._focusDefault ();
			}
		}
		
		this._grabKeyboard ();
	}
};

/**
 * Default focus action - focus first node in tree.
 */
TreeBinding.prototype._focusDefault = function () {
	
	var first = this._treeBodyBinding.getChildBindingByLocalName ( "treenode" );
	if ( first != null ) {
		this.focusSingleTreeNodeBinding ( first );
		first.callback ();
	}
};

/**
 * @implements {IFocusable}
 */
TreeBinding.prototype.blur = function () {
	
	if ( this.isFocused ) {
		this.isFocused = false;
		this.detachClassName ( Binding.CLASSNAME_FOCUSED );
		this.dispatchAction ( Binding.ACTION_BLURRED );
		this._releaseKeyboard ();
	}
};

/**
 * Grab keyboard.
 */
TreeBinding.prototype._grabKeyboard = function () {
	
	this.subscribe ( BroadcastMessages.KEY_ARROW );
	this.subscribe ( BroadcastMessages.KEY_ENTER );
	this._hasKeyboard = true;
};

/**
 * Release keyboard.
 */
TreeBinding.prototype._releaseKeyboard = function () {
	
	this.unsubscribe ( BroadcastMessages.KEY_ARROW );
	this.unsubscribe ( BroadcastMessages.KEY_ENTER );
	this._hasKeyboard = false;
	
};

/** 
 * While initializing, added treenodes gets appended to a buffer.
 * @overwrites {Binding#add}
 * @param {Binding} binding
 * @return {Binding}
 */
TreeBinding.prototype.add = function ( binding ) {
	
	var returnable = null;
	if ( this._treeBodyBinding ) {
		 returnable = this._treeBodyBinding.add ( binding );
	} else {
		this._treeNodeBuffer.add ( binding );
		returnable = binding;
	}
	return returnable;
};

/**
 * @overwrites {Binding#addFirst}
 * @param {Binding} binding
 * @return {Binding}
 */
TreeBinding.prototype.addFirst = function ( binding ) {

	throw new Error ( "Not implemented" );
}

/**
 * Empty all treenodes and reset stuff. 
 */
TreeBinding.prototype.empty = function () {

	this._treeBodyBinding.detachRecursive ();
	var element = this._treeBodyBinding.bindingElement;
	element.innerHTML = "";
}

/**
 * Is tree empty?
 * @return {boolean}
 */
TreeBinding.prototype.isEmpty = function () {
    
    return this._treeNodeBindings.hasEntries () == false;
}

/**
 * Collapse all treenodes.
 */
TreeBinding.prototype.collapse = function () {
	
	this.blurSelectedTreeNodes ();
	this._treeNodeBindings.each ( function ( handle, treenode ) {
		if ( treenode.isContainer && treenode.isOpen ) {
			treenode.close ();
		}
	});
}

/**
 * Activate tree selection.
 * @param {boolean} isSelectable;
 */
TreeBinding.prototype.setSelectable = function ( isSelectable ) {
	
	this._isSelectable = isSelectable;
	
	if ( isSelectable ) {
		this._selectedTreeNodeBindings = {};
	} else {
		this._selectedTreeNodeBindings = null;
		this._selectionProperty = null;
		this._selectionValue = null;
	}
}
	
/**
 * Define selection property.
 * @param {string} property
 */
TreeBinding.prototype.setSelectionProperty = function ( property ) {
	
	this._selectionProperty = property;
}


/**
 * Define selection value(s).
 * @param {string} value White-space separated string
 */
TreeBinding.prototype.setSelectionValue = function (value) {

	if (value) {
		var list = new List(value.split(" "));
		this._selectionValue = {};
		while (list.hasNext()) {
			this._selectionValue[list.getNext()] = true;
		}
	}
}

/**
 * Setup drop when a drag is instantiated.
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
TreeBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	TreeBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.TYPEDRAG_START :
			this.addEventListener ( DOMEvents.MOUSEMOVE );
			this._yposition = this.boxObject.getGlobalPosition ().y;
			break;
			
		case BroadcastMessages.TYPEDRAG_STOP :
			this.removeEventListener ( DOMEvents.MOUSEMOVE );
			this._positionIndicatorBinding.hide ();
			this._yposition = -1;
			break;
			
		case BroadcastMessages.KEY_ARROW :
			this._navigateByKey ( arg );
			break;
			
		case BroadcastMessages.KEY_ENTER :
			var focused = this.getFocusedTreeNodeBindings ()
			if ( focused.hasEntries ()) {
				var node = focused.getFirst ();
				if ( node.isContainer ) {
					if ( node.isOpen ) { 
						node.close ();
					} else {
						node.open ();
					}
				} else {
					node.fireCommand ();
				}
			}
			break;
	}
}

/**
 * Keyboard navigation studio.
 * @param {int} key
 */
TreeBinding.prototype._navigateByKey = function ( key ) {
	
	var focused = this.getFocusedTreeNodeBindings ()
	
	if ( focused.hasEntries ()) {
		
		var node = focused.getFirst ();
		var next = null;
		
		switch ( key ) {
			case KeyEventCodes.VK_UP :
				next = node.getPreviousBindingByLocalName ( "treenode" );
				if ( next != null ) { 
					while ( next.isContainer && next.hasChildren () && next.isOpen ) {
						next = next.getChildBindingsByLocalName ( "treenode" ).getLast ();
					}
				}
				if ( next == null ) {
					next = node.getAncestorBindingByLocalName ( "treenode" );
				}
				break;
				
			case KeyEventCodes.VK_DOWN :
				if ( node.isContainer && node.hasChildren () && node.isOpen ) {
					next = node.getChildBindingByLocalName ( "treenode" );
				} else {
					next = node.getNextBindingByLocalName ( "treenode" );
					if ( next == null ) {
						var parent = null;
						while ( next == null && ( parent = node.getAncestorBindingByLocalName ( "treenode" )) != null ) {
							if ( parent != null ) {
								next = parent.getNextBindingByLocalName ( "treenode" );
							}
							node = parent;
						}
					}
				}
				break;
			
			case KeyEventCodes.VK_RIGHT :
				if ( node.isContainer ) {
					if ( !node.isOpen ) {
						node.open ();
					} else if ( node.hasChildren ()) {
						next = node.getChildBindingByLocalName ( "treenode" );
					}
				}
				break;
			
			case KeyEventCodes.VK_LEFT :
				if (node.isContainer && node.isOpen) {
					node.close();
				} else {
					next = node.getAncestorBindingByLocalName("treenode");
				}
				break;
		}
		
		if ( next != null ) {
			this.focusSingleTreeNodeBinding ( next );
		}
	}
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
TreeBinding.prototype.handleEvent = function ( e ) {
	
	TreeBinding.superclass.handleEvent.call ( this, e );
	
	var target = DOMEvents.getTarget ( e );
	
	switch ( e.type ) {
	
		case DOMEvents.MOUSEMOVE :
			
			try {
				this._updatePositionIndicator ( e );
			} catch ( exception ) {
				this.removeEventListener ( DOMEvents.MOUSEMOVE );
				throw ( exception );
			}
			break;
			
		case DOMEvents.BEFOREUPDATE :
			var crawler = new TreeCrawler ();
			var list = new List ();
			crawler.mode = TreeCrawler.MODE_GETOPEN;
			crawler.crawl ( this.bindingElement, list );
			var map = new Map ();
			if ( list.hasEntries ()) {
				while ( list.hasNext ()) {
					var treenode = list.getNext ();
					map.set ( treenode.getHandle (), true );
				}
				this._openTreeNodesBackupMap = map;
			}
			break;
			
		case DOMEvents.AFTERUPDATE :
			this._openTreeNodesBackupMap = null;
			break;
	}
}

/**
 * Position indicator while dragging.
 * @param {MouseEvent} e
 */
TreeBinding.prototype._updatePositionIndicator = function ( e ) {
	
	var y = e.clientY - this._yposition;
	var pos = this._acceptingPosition;
	var dim = this._acceptingDimension;
	var indicator = this._positionIndicatorBinding;
	
	if ( this._acceptingTreeNodeBinding ) {
	
		var miny = pos.y;
		var maxy = pos.y + dim.h;
		
		if ( y >= miny && y <= maxy ) {
		
			// snap position to nearest tree grid
			y = y < miny + TreeNodeBinding.HEIGHT ? miny + TreeNodeBinding.HEIGHT : y;
			y = y - TreeNodeBinding.HEIGHT;
			y = TreeBinding.grid ( y );
			
			// snap to nearest *accepted* tree grid
			while ( !this._acceptingPositions [ y ]) {
				y += TreeNodeBinding.HEIGHT
			}
			
			// position indicator
			if ( y != indicator.getPosition ().y ) {
				indicator.setPosition ( 
					new Point ( 
						this._acceptingPosition.x + TreeNodeBinding.INDENT,
						y
					)
				);
			}
			if ( !indicator.isVisible ) {
				indicator.show ();
			}
		} else if ( indicator.isVisible ) {
			indicator.hide ();
		}
	} else if ( indicator.isVisible ) {
		indicator.hide ();
	}
}

/**
 * Invoked by an accepting treenode.
 * @param {TreeNodeBinding} binding
 */
TreeBinding.prototype.enablePositionIndicator = function ( binding ) {
	
	this._acceptingTreeNodeBinding = binding;
	this._acceptingPosition = binding.boxObject.getLocalPosition ();
	this._acceptingDimension = binding.boxObject.getDimension ();
	this._acceptingPositions = this._getChildPositions ( binding );
}

/**
 * Invoked by an accepting treenode.
 */
TreeBinding.prototype.disablePositionIndicator = function () {
	
	this._acceptingTreeNodeBinding = null;
	this._acceptingPosition = null;
	this._acceptingDimension = null;
}

/**
 * Index position of folder children (or something equivaltent to position).
 * @param {TreeNodeBinding} binding
 * @return {HashMap<int><boolean>}
 */
TreeBinding.prototype._getChildPositions = function ( binding ) {

	var map = {};
	var children = binding.getChildBindingsByLocalName ( "treenode" );
	var child, pos, dim, y;
	
	y = TreeBinding.grid ( binding.boxObject.getLocalPosition ().y );
	map [ y ] = true;
	
	while ( children.hasNext ()) {
		child = children.getNext ();		
		pos = child.boxObject.getLocalPosition ();
		dim = child.boxObject.getDimension ();
		y = TreeBinding.grid ( pos.y + dim.h ) - TreeNodeBinding.HEIGHT;
		map [ y ] = true;
	}
	
	return map;
}

/**
 * Returns the index of latest treenode drag-drop session. A value of zero 
 * indicates that the treenode was inserted as the first folder child.
 * @return {int]
 */
TreeBinding.prototype.getDropIndex = function () {

	var y = this._positionIndicatorBinding.getPosition ().y;
	
	var drop = 0;
	for ( var index in this._acceptingPositions ) {
		if ( index == y ) {
			break;
		} else {
			drop++;
		}
	}
	return Number ( drop );
}

/**
 * Get the root (first-level) treenodes.
 * @return {List<TreeNodeBinding>}
 */
TreeBinding.prototype.getRootTreeNodeBindings = function () {
	
	return this._treeBodyBinding.getChildBindingsByLocalName ( "treenode" );
}

/**
 * Get tree body binding.
 */
TreeBinding.prototype.getTreeBodyBinding = function () {

	return this._treeBodyBinding;
}

/**
 * TreeBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeBinding}
 */
TreeBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:tree", ownerDocument );
	var binding = UserInterface.registerBinding ( element, TreeBinding );
	binding.treeBodyBinding = TreeBodyBinding.newInstance ( ownerDocument );
	return binding;
}