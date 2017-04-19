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
			//optional , width : 400
			//optional , height : 400
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
	 * @type {GenericViewBinding}
	 */
	this._genericViewBinding = null;

	/**
	 * @type {SystemToolbarBinding}
	 */
	this._toolbarBinding = null;

	/**
	 * @type {TabBinding}
	 */
	this._previewTab = null;

	/**
	 * @type {TabBinding}
	 */
	this._genericTab = null;

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
	 * Does the dialog have the preview tab?
	 * @type {boolean}
	 */
	this._hasPreview = false;

	/**
	 *  The (optional) action groups.
	 * @type {tring}}
	 */
	this._actionGroup = null;

	/**
	 * @type {boolean}
	 */
	this._isPushingUrl = false;

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

	/**
	 * List of parents of root nodes. Used for handle tree refreshing
	 * @type {List}
	 */
	this._parents = null;


	/**
	 * This will be set to an index in the map declared above. it has two properties:
	 *     history {List<string>}
	 *     index {int}
	 * @type {object}
	 */
	this._current = null;

	/**
	 * @type {boolean}
	 */
	this._isHistoryBrowsing = false;
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
TreeSelectorDialogPageBinding.prototype.setPageArgument = function (arg) {

	TreeSelectorDialogPageBinding.superclass.setPageArgument.call(this, arg);

	this.label = arg.label;
	this.image = arg.image;
	this._key = arg.key;
	this._selectionProperty = arg.selectionProperty;
	this._selectionValue = arg.selectionValue;
	this._selectionResult = arg.selectionResult;
	this._hasPreview = arg.hasPreview;
	this._actionGroup = arg.actionGroup;

	if (arg.selectedToken) {
		this._selectedToken = arg.selectedToken;
	}
	else if (arg.selectedResult) {
		var compositeUrl = new Uri(arg.selectedResult);
		if (compositeUrl.isMedia || compositeUrl.isPage || compositeUrl.isInternalUrl) {
			this._selectedToken = TreeService.GetCompositeEntityToken(arg.selectedResult);
		}
	}
	this._nodes = arg.nodes;
	this._parents = new List();
	if (arg.width) {
		this.width = arg.width;
	}
	if (arg.height) {
		this.height = arg.height;
	}

}

/**
 * @overloads {SystemTreeBinding#onBindingRegister}
 */
TreeSelectorDialogPageBinding.prototype.onBindingRegister = function () {

	TreeSelectorDialogPageBinding.superclass.onBindingRegister.call(this);

	//Subscribe to double click action
	this.addActionListener(TreeNodeBinding.ACTION_COMMAND);

	this.addActionListener(PathBinding.ACTION_COMMAND);
	this.addActionListener(WindowBinding.ACTION_ONLOAD);

	/*
	* File subscriptions.
	*/
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED_AFTER);
	this.subscribe(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED);

}

/**
 * Implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
TreeSelectorDialogPageBinding.prototype.handleBroadcast = function (broadcast, arg) {

	/**
	* Doublecheck that this tree is actually focused. Although if
	* the server transmits a refresh signal, this is not required.
	*/
	switch (broadcast) {

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
			if (arg != null || this.isFocused) { // arg is only provided when server is refreshing!
				if (this._parents.has(arg)) {
					this._treeBinding._handleCommandBroadcast(broadcast);
					return;
				}
			}
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED_AFTER:
			if (arg.syncHandle == this.getSyncHandle()) {
				this.refreshView();
			}
			break;

		case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
			if (arg.syncHandle == this.getSyncHandle()) {
				if (arg.source && arg.source == this._treeBinding && arg.actionProfile) {
					var node = arg.actionProfile.Node;
					var entityToken = node.getEntityToken();
					if (entityToken) {
						if (this._entityToken != entityToken) {
							this._entityToken = entityToken;
							this.push(node);
						}
					}
				}
			}
			break;
	}

	TreeSelectorDialogPageBinding.superclass.handleBroadcast.call(this, broadcast, arg);
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
TreeSelectorDialogPageBinding.prototype.onBeforePageInitialize = function () {

	this._treeBinding = this.bindingWindow.bindingMap.selectiontree;
	this._treeBinding.addActionListener ( TreeBinding.ACTION_SELECTIONCHANGED, this );
	this._treeBinding.addActionListener(TreeBinding.ACTION_NOSELECTION, this);

	this._treeBinding.setSelectable ( true );
	this._treeBinding.setSelectionProperty ( this._selectionProperty );
	this._treeBinding.setSelectionValue(this._selectionValue);
	this._treeBinding.setActionGroup(this._actionGroup);

	//Remove default double click action
	this._treeBinding.removeActionListener(TreeNodeBinding.ACTION_COMMAND);

	this._treeBinding.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);

	/*
	 * Build root nodes.
	 */
	this._injectTreeNodes (
		new List ( this._nodes )
	);

	StageBinding.treeSelector = this._treeBinding;



	this._genericViewBinding = this.bindingWindow.bindingMap.genericview;
	this._genericViewBinding.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED, this);
	this._genericViewBinding.addActionListener(TreeBinding.ACTION_NOSELECTION, this);
	this._genericViewBinding.addActionListener(GenericViewBinding.ACTION_COMMAND, this);

	this._genericViewBinding.setSelectable(true);
	this._genericViewBinding.setSelectionProperty(this._selectionProperty);
	this._genericViewBinding.setSelectionValue(this._selectionValue);
	this._genericViewBinding.setActionGroup(this._actionGroup);


	this._previewTab = this.bindingWindow.bindingMap.previewtab;
	this._genericTab = this.bindingWindow.bindingMap.generictab;

	this._toolbarBinding = this.bindingWindow.bindingMap.toolbar;
	if (this._toolbarBinding) {
		this._toolbarBinding.setSyncHandle(this.getSyncHandle());
	}

	this._clearHistory();

	TreeSelectorDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}


/**
 * Select Node by Entitytoken
 * @param {EntityToken} entityToken
 */
TreeSelectorDialogPageBinding.prototype.select = function (entityToken) {

	this._treeBinding.handleBroadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS, entityToken);
}

/**
 * Push Node
 * @param {SystemNode} node
 */
TreeSelectorDialogPageBinding.prototype.push = function (node) {

	if (this._hasPreview && node) {
		var entityToken = node.getEntityToken();
		var self = this;
		TreeService.GetBrowserUrlByEntityToken(entityToken, false, function (result) {
			if (result && result.Url) {
				self.setPreview(result.Url);
				self._updateHistory(entityToken);
				self._updateBroadcasters();
			} else {
				self.setNode(node);

			}
		});
	} else {
		this.setNode(node);
	}
}

/**
 * Set Node
 * @param {SystemNode} node
 */
TreeSelectorDialogPageBinding.prototype.setNode = function (node) {

	this._genericViewBinding.setNode(node);
	var generictab = this.bindingWindow.bindingMap.generictab;
	generictab.containingTabBoxBinding.select(generictab);
	this._updateHistory(node ? node.getEntityToken() : null);
	this._updateBroadcasters();
	this._updateAddressBar(node);

	if (node == undefined) {
		if (this._toolbarBinding) {
			this._toolbarBinding.handleBroadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED, {
				activePosition: this._activePosition,
				actionProfile: null,
				syncHandle: this.getSyncHandle(),
				source: this
			});
		}
	}
}


/**
 * Set preview
 * @param {string} url
 */
TreeSelectorDialogPageBinding.prototype.setPreview = function (url) {

	this._isPushingUrl = true;
	var previewframe = this.bindingWindow.bindingMap.previewframe;
	var previewtab = this.bindingWindow.bindingMap.previewtab;
	previewframe.setURL(url);
	previewtab.containingTabBoxBinding.select(previewtab);
}

/**
 * Refresh Generic View
 */
TreeSelectorDialogPageBinding.prototype.refreshView = function () {

	var selectedTreeNode = this._treeBinding.getFocusedTreeNodeBindings().getFirst();
	if (selectedTreeNode) {
		this.push(selectedTreeNode.node);
		this._updateDisplayAndResult(this._treeBinding);
	} else {
		this.push(undefined);
		this._clearDisplayAndResult();
	}
}

/**
 * Inject root nodes in tree.
 * @param {List<object>}
 */
TreeSelectorDialogPageBinding.prototype._injectTreeNodes = function (list) {

	while (list.hasNext()) {

		/*
		* Fetch key and search.
		*/
		var object = list.getNext();
		var key = object.key;
		var search = object.search;

		/*
		* Search could be both a searchtoken *or* a searchtoken key.
		*/
		if (search != null && SearchTokens.hasToken(search)) {
			search = SearchTokens.getToken(search);
		}

		/*
		* Build treenodes.
		*/
		var roots = System.getNamedRootsBySearchToken(key, search);

		var count = 0;
		var expandNodes = new List([]);
		var self = this;

		while (roots.hasNext()) {

			var treenode = SystemTreeNodeBinding.newInstance(
				roots.getNext(),
				this.bindingDocument
			)
			treenode.autoExpand = true;
			this._treeBinding.add(treenode);
			treenode.attach();

			// Auto expand tree folders in selection dialogs, when only one folder can be expanded.
			// Expand last opened nodes
			count++;
			if (!roots.hasNext() && count == 1 || LocalStore.openedNodes.has(treenode.node)) {
				expandNodes.add(treenode);
			}

			// Fill list of parents, used for handle refreshed tree

			var parents = TreeService.GetAllParents(treenode.node.getEntityToken());
			new List(parents).each(
				function (parent) {
					self._parents.add(parent);
				}
			);
		}
		expandNodes.each(function (node) {
			if (node.isContainer && !node.isOpen) {
				var self = node;
				setTimeout(function () {
					self.open();
				}, 0);
			}
		});
	}

	var self = this;
	setTimeout(function () {

	}, 0);
}

/**
 * Executed when the page is shown.
 */
TreeSelectorDialogPageBinding.prototype.onAfterPageInitialize = function () {

	TreeSelectorDialogPageBinding.superclass.onAfterPageInitialize.call(this);

	this._treeBinding.focus();

	if (this._selectedToken)
		this._treeBinding._focusTreeNodeByEntityToken(this._selectedToken);
	else
		this._treeBinding.selectDefault();
}

/**
 * @implements {IActionListener}
 * @overloads {DialogPageBinding#handleAction}
 * @param {Action} action
 */
TreeSelectorDialogPageBinding.prototype.handleAction = function (action) {

	if ( window.TreeSelectorDialogPageBinding && window.TreeBinding ) {  // huh?

		switch (action.type) {
			case WindowBinding.ACTION_ONLOAD:
				if (this.bindingWindow.bindingMap.previewframe == action.target) {
					this._handleDocumentLoad(action.target);
					action.consume();
				}
				break;
			case ButtonBinding.ACTION_COMMAND:
				if (action.target && action.target.response == Dialog.RESPONSE_ACCEPT) {
					this._saveOpenedSystemNodes();
				} else {
					this._handleCommand(action.target.getProperty("cmd"), action.target);
					action.consume();
				}
				//Disable bindingMap.buttonAccept after first invoke
				if (action.target == bindingMap.buttonAccept) {
					bindingMap.buttonAccept.setDisabled(true);
				}
				break;
			case TreeNodeBinding.ACTION_COMMAND:
				bindingMap.buttonAccept.fireCommand();
				break;
			case TreeBinding.ACTION_SELECTIONCHANGED:
				this._updateDisplayAndResult(action.target);

				break;
			case TreeBinding.ACTION_NOSELECTION :
				this._clearDisplayAndResult();
				break;

			case GenericViewBinding.ACTION_COMMAND:
				if (action.target.node.hasChildren()) {
					this.select(action.target.node.getEntityToken());
				} else {
					bindingMap.buttonAccept.fireCommand();
				}

				break;
			case PathBinding.ACTION_COMMAND:
				this.select(action.target.entityToken);
				break;
		}

		TreeSelectorDialogPageBinding.superclass.handleAction.call ( this, action );
	}
}


/**
 * Handle loaded document.
 * @param {WindowBinding} binding
 */
TreeSelectorDialogPageBinding.prototype._handleDocumentLoad = function (binding) {

	var url = new String(binding.getContentDocument().location);

	this._stateKey = KeyMaster.getUniqueKey();

	/*
	 * Update stuff.
	 */
	this._updateAddressBar(url);

	if (!this._isPushingUrl) {
		var self = this;
		var stateKey = this._stateKey;
		TreeService.GetEntityTokenByPageUrl(url, function (entityToken) {
			if (stateKey === self._stateKey) {
				self._entityToken = entityToken;
				self.select(entityToken);
				self._updateHistory(entityToken);
				self._updateBroadcasters();
			}
		});

	}

	this._isPushingUrl = false;
}

/**
* Save last opened system nodes Update selections display and store result.
*/
TreeSelectorDialogPageBinding.prototype._saveOpenedSystemNodes = function () {
	LocalStore.openedNodes.clear();
	var treenodes = this._treeBinding.getOpenSystemNodes();
	treenodes.each(
		function (treenode) {
			LocalStore.openedNodes.add(treenode)
		}
	);
}

/**
 * Update selections display and store result.
 */
TreeSelectorDialogPageBinding.prototype._updateDisplayAndResult = function (tree) {


	var selections 	= tree.getSelectedTreeNodeBindings ();
	var dataInput	= this.bindingWindow.DataManager.getDataBinding ( "treeselectionresult" );
	var okButton	= bindingMap.buttonAccept;
	var result 		= new List ();
	var value 		= new String ( "" );
	var prop 		= this._selectionResult;

	selections.each ( function ( binding ) {
		if (prop == "EntityToken" && binding.node) {

			result.add(
				binding.node.getEntityToken()
			);
		} else {
			result.add(
				binding.getProperty(prop)
			);
		}
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

/**
 * @param {string} url
 */
TreeSelectorDialogPageBinding.prototype._updateAddressBar = function (address) {
	var bar = this.bindingWindow.bindingMap.addressbar;
	if (bar != null) {
		if (typeof (address) == "string" || address instanceof String) {
			var url = address;
			bar.showAddreesbar(url);
		} else {
			var treenode = this._treeBinding.getFocusedTreeNodeBindings().getFirst();
			if (treenode) {
				var parents = new List();
				var element = treenode.bindingElement;
				while ((element = element.parentNode) != null) {
					var parent = UserInterface.getBinding(element);
					if (parent instanceof SystemTreeNodeBinding) {
						parents.add(parent.node);
					} else {
						break;
					}
				}
				bar.showBreadcrumb(treenode.node, parents);
			} else {
				bar.showBreadcrumb();
			}
		}
	}
}

/**
 * Handle command (navbar or contextmenu).
 * @param {string} cmd
 * @param {Binding} binding
 */
TreeSelectorDialogPageBinding.prototype._handleCommand = function (cmd, binding) {

	/*
	 * Because of a bug in the history object in Prism 0.91,
	 * we cannot invoke history.back and stuff. We have
	 * to load new URLs from our own history. This will
	 * destroy native history.back in document, so please
	 * fix at some point...
	 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=429550
	 */
	switch (cmd) {
		case "back":
			this._isHistoryBrowsing = true;
			var item = this._current.history.get(--this._current.index);
			this.select(item);
			break;
		case "forward":
			this._isHistoryBrowsing = true;
			var item = this._current.history.get(++this._current.index);
			this.select(item);
			break;

		case "refresh":
			this._treeBinding._handleCommandBroadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);
			break;

		case "home":
			var rootNode = this._treeBinding.getRootTreeNodeBindings().getFirst();
			if (rootNode) {
				this._treeBinding.focusSingleTreeNodeBinding(rootNode);
			}
			break;

		case "toggletree":
			var toggletreebutton = this.bindingWindow.bindingMap.toggletreebutton;
			var explorerpanel = this.bindingWindow.bindingMap.explorerpanel;
			if (toggletreebutton.isChecked) {
				explorerpanel.show();
			} else {
				explorerpanel.hide();
			}
			this.reflex();
			break;

	}
}

/*
 * Update history.
 * @param {object} item
 */
TreeSelectorDialogPageBinding.prototype._updateHistory = function (item) {

	if (this._isHistoryBrowsing == true) {
		this._isHistoryBrowsing = false;
	} else {
		if (item != null) {
			while (this._current.history.getLength() - 1 > this._current.index) {
				this._current.history.extractLast();
			}
			this._current.history.add(item);
			this._current.index++;
		}
	}
}

/*
 * Clear history
 */
TreeSelectorDialogPageBinding.prototype._clearHistory = function () {

	if (!this._current) {
		this._current = {
			history: new List(),
			index: parseInt(-1)
		};
	}

	while (this._current.history.getLength() > 1) {
		this._current.history.del(0);
		this._current.index = this._current.history.getLength() - 1;
	}
}


/**
 * Update broadcasters.
 */
TreeSelectorDialogPageBinding.prototype._updateBroadcasters = function () {

	var back = window.bindingMap.broadcasterHistoryBack;
	var forward = window.bindingMap.broadcasterHistoryForward;

	if (this._current.index > 0) {
		back.enable();
	} else {
		back.disable();
	}
	if (this._current.index < this._current.history.getLength() - 1) {
		forward.enable();
	} else {
		forward.disable();
	}
}

/**
 * @overloads {DialogPageBinding#onDialogResponse}
*/
TreeSelectorDialogPageBinding.prototype.onDialogResponse = function () {

	StageBinding.treeSelector = null;

	TreeSelectorDialogPageBinding.superclass.onDialogResponse.call(this);

}

TreeSelectorDialogPageBinding.prototype.getSyncHandle = function () {
	return this.getID();
}