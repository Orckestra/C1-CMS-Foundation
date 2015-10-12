/*
 * Action types.
 */
SystemAction.OPEN_DOCUMENT ="OpenDocument";
SystemAction.OPEN_MODAL_DIALOG ="OpenModalDialog";

/*
 * Action tags.
 */
SystemAction.TAG_CHANGEFROMLANGUAGE = "ChangeFromLocale";
SystemAction.TAG_USER = "User";

/**
 * Determines allowed categories and category display order.isInToolBar
 * @type {HashMap}
 */
SystemAction.categories = {

	Edit			: "Edit",
	Add				: "Add",
	Delete			: "Delete",
	Other			: "Other",
	DeveloperMode	: "DeveloperMode"
}

/**
* Determines active positions to display in navgation and selector (ElementActionActive)
* @type {Enum}
*/
SystemAction.activePositions = { NavigatorTree: 1, SelectorTree: 2 }

/**
 * Tagged actions go here.
 * @type {Map<string><SystemAction>}
 */
SystemAction.taggedActions = new Map ();

/**
 * This is maintained by the SystemNodes.
 * @see {SystemNode#_registerSystemActions}
 * @type {Map<string><SystemAction>}
 */
SystemAction.actionMap = new Map ();

/**
 * Invoke that action.
 * @param {SystemAction} action
 * @param {object} arg This can be either a SystemNode or a List of SystemNodes.
 */
SystemAction.invoke = function ( action, arg ) {
	
	var node = arg;
	
	if ( node instanceof SystemNode ) {
		Application.lock ( SystemAction );
		action.logger.debug ( "Execute \"" + action.getLabel () + "\" on \"" + node.getLabel () + "\"." );
		setTimeout ( function () { // timeout allow pressed buttons to unpress
			TreeService.ExecuteSingleElementAction ( 
				node.getData (),
				action.getHandle (),
				Application.CONSOLE_ID
			);
			MessageQueue.update ();
			Application.unlock ( SystemAction );
		}, 0 );
	} else {
		throw "Multiple actiontargets not supported.";
	}
	
	/*
	 * A list of nodehandles.
	 * @type {array<object>}
	 *
	var nodeHandleList = [];
	
	MULTIPLE SELECTIONS SETUP!
	
	ExplorerBinding.getFocusedTreeNodeBindings ().each ( 
		function ( treeNodeBinding ) {
			var systemNode = treeNodeBinding.node;
			nodeHandleList.push ( 
				systemNode.getHandle ()
			);
		}
	);
	
	if ( nodeHandleList.length > 0 ) {
		
		var actionHandle = action.getHandle ();
		var serviceResponse = TreeService.ExecuteElementAction ( 
			nodeHandleList,
			actionHandle,
			Application.CONSOLE_ID
		);
		
		MessageQueue.update ();
	}
	*/
	
	/*
	var systemNode = null;
	
	var list = ExplorerBinding.getFocusedTreeNodeBindings ();
	if ( list.hasEntries ()) {
		var treeNodeBinding = list.getFirst ();
		var systemNode = treeNodeBinding.node;
	}
		
	if ( systemNode ) {
		var serviceResponse = TreeService.ExecuteSingleElementAction ( 
			node.getData (),
			action.getHandle (),
			Application.CONSOLE_ID
		);
		MessageQueue.update ();
	}
	*/
}

/**
 * Invoke tagged action.
 * @param {string} taggednode
 * @param {string} taggedaction
 */
SystemAction.invokeTagged = function ( taggedaction, taggednode ) {
	
	action = SystemAction.taggedActions.get ( taggedaction );
	node = SystemNode.taggedNodes.get ( taggednode );
	SystemAction.invoke ( action, node );
}

/**
 * Check action category before displaying in GUI. So that we 
 * don't wonder what happens to newly introduced categories.
 * @param {string} string
 * @return {boolean}
 */
SystemAction.hasCategory = function ( category ) {

	return SystemAction.categories [ category ] ? true : false;
}

/**
 * @param {object} object
 */
function SystemAction ( object ) {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemAction" );
	
	/**
	 * @type {object}
	 * @private
	 */
	this._data = object;
	
	/*
	 * Register tagged action.
	 */
	if ( this._data.TagValue != null ) {
		SystemAction.taggedActions.set (
			this._data.TagValue,
			this
		);
	}
}

/**
 * Identifies object.
 */
SystemAction.prototype.toString = function () {
	
	return "[SystemAction]";
}

/**
 * Get the actionProfilehHandle.
 * @return {object}
 */
SystemAction.prototype.getHandle = function () {

	return this._data.ActionToken;
}

/**
 * Get the ActionKey. TODO: DID THIS WORK?
 * @return {string}
 */
SystemAction.prototype.getKey = function () {

	return this._data.ActionKey;
}

/**
 * Get the action label.
 * @implements {ILabel}
 * @return {string}
 */
SystemAction.prototype.getLabel = function () {

	return this._data.Label;
}

/**
 * Get the image associated to the action.
 * @implements {ILabel}
 * @return {string}
 */
SystemAction.prototype.getImage = function () {

	return ImageProvider.getImageURL ( this._data.Icon );
}

/**
 * Get the disabled-image.
 * TODO: Implement this feature on server!
 * @see {SystemAction#isDisabled}
 * @implements {ILabel}
 * @return {string}
 */
SystemAction.prototype.getDisabledImage = function () {

	return null;
}

/**
 * Get the action description.
 * @implements {ILabel}
 * @return {string}
 */
SystemAction.prototype.getToolTip = function () {

	return this._data.ToolTip;
}

/**
 * Get action category.
 * @return {string}
 */
SystemAction.prototype.getCategory = function () {

	return this._data.ActionCategory.Name;
}

/**
 * Get group Id.
 * @return {string}
 */
SystemAction.prototype.getGroupID = function () {
	
	return this._data.ActionCategory.GroupId;
}

/**
 * Get group name.
 * @return {string}
 */
SystemAction.prototype.getGroupName = function () {

	return this._data.ActionCategory.GroupName;
}


/**
* Get active positions.
* @return {string}
*/
SystemAction.prototype.getActivePositions = function () {

	return this._data.ActivePositions;
}

/**
 * Is in toolbar?
 * @return {boolean}
 */
SystemAction.prototype.isInToolBar = function () {

	return this._data.ActionCategory.IsInToolbar;
}

/**
 * Is in folder?
 * @return {boolean}
 */
SystemAction.prototype.isInFolder = function () {

	return this._data.ActionCategory.IsInFolder;
}

/**
 * @return {string}
 */
SystemAction.prototype.getFolderName = function () {

	var result = null;
	if ( this.isInFolder ()) {
		result = this._data.ActionCategory.FolderName;
	}
	return result;
}

/**
 * Is action disabled?
 * @return {boolean}
 */
SystemAction.prototype.isDisabled = function () {

	return this._data.Disabled;
}

/**
 * Is checkbox?
 * @return {boolean}
 */
SystemAction.prototype.isCheckBox = function () {
	
	return typeof this._data.CheckboxStatus != Types.UNDEFINED;
}

/**
 * Get tag value.
 * @return {string}
 */
SystemAction.prototype.getTag = function () {
	
	var result = null;
	if ( typeof this._data.TagValue != "undefined" ) {
		result = this._data.TagValue;
	}
	return result;
}

/**
 * Is checked?
 * @return {boolean}
 */
SystemAction.prototype.isChecked = function () {
	
	var result = null;
	if ( this.isCheckBox ()) {
		result = this._data.CheckboxStatus == "Checked";
	} else {
		throw "Not a checkbox!";
	}
	return result;
}