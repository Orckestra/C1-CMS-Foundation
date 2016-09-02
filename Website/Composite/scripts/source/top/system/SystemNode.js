/**
 * This doesn't really do much for us.
 * @param {SystemNode} node
 */
SystemNode.dispose = function ( node ) {

	for ( var prop in node ) {
		node [ prop ] = null;
	}
}

/**
 * Tagged actions go here.
 * @type {Map<string><SystemNode>}
 */
SystemNode.taggedNodes = new Map ();

/**
 * @class
 * @param {object} data
 */
function SystemNode ( data ) {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemNode" );

	/**
	 * @type {object}
	 * @private
	 */
	this._data = data;

	/**
	 * @type {List<object>}
	 * @private
	 */
	this._datas = null;

	/**
	 * Exposes associated actions ordered by group name.
	 * @type {Map<string><List<SystemAction>>}
	 */
	this._actionProfile = null;

	/**
	 * @type {HashMap<string><string>}
	 * @private
	 */
	this._propertyBag = null;

	/*
	 * Note that we register all actions in the constructor!
	 */
	this._registerSystemActions ();

	/*
	 * Set by {@link System} when the SystemNode is first created.
	 */
	this.searchToken = null;

	/*
	 * Register tagged node.
	 */
	if ( this._data.TagValue != null ) {
		SystemNode.taggedNodes.set (
			this._data.TagValue,
			this
		);
	}
}

/**
 * Identifies systemnode.
 */
SystemNode.prototype.toString = function () {

	return "[SystemNode]";
}

/**
 * Scan the associated action keys and register
 * all SystemActions not already indexed.
 */
SystemNode.prototype._registerSystemActions = function () {

	var self = this;

	new List ( this._data.ActionKeys ).each ( function ( key ) {
		if ( !SystemAction.actionMap.has ( key )) {
			new List ( self._data.Actions ).each ( function ( action ) {
				var category = action.ActionCategory.Name;
				if ( SystemAction.hasCategory ( category )) {
					var systemAction = new SystemAction ( action );
					SystemAction.actionMap.set (
						action.ActionKey,
						systemAction
					);
				} else {
					throw "No such action category: " + category;
				}
			});
		}
	});
}

/**
 * Expose the data structure for serialization back into SOAP.
 * @returns {object}
 */
SystemNode.prototype.getData = function () {

	return this._data;
}

/**
 * Get children. Notice that searchTokens are automatically inherited by child nodes!
 * @return {List<object>} where object is SystemNode or SystemNode
 */
SystemNode.prototype.getChildren = function () {

	var result = null;
	if ( this.searchToken ) {
		result = System.getChildNodesBySearchToken ( this, this.searchToken );
	} else {
		result = System.getChildNodes ( this );
	}

	return result;
}

/**
 * Get branch. This will *not* return a tree structure, but the structure
 * can be inferred from a sequential parsing of the returned map. More
 * nodes may be returned than are actually present in the branch at
 * this exact moment.
 * @param {List<SystemNode>} list
 * @return {Map<string><List<SystemNode>>}
 */
SystemNode.prototype.getDescendantBranch = function ( list ) {

	return System.getDescendantBranch ( list );
}

/**
 * @return {string}
 */
SystemNode.prototype.getLabel = function () {

	return this._data.Label;
}

/**
 * @return {string}
 */
SystemNode.prototype.getProviderName = function () {

	return this._data.ProviderName;
}

/**
 * @return {string}
 */
SystemNode.prototype.getEntityToken = function () {

	return this._data.EntityToken;
}

/**
 * @return {string}
 */
SystemNode.prototype.getPiggyBag = function () {

	var result = this._data.Piggybag;
	if ( result == null ) {
		result = "";
	}
	return result;
}

/**
 * Used to uniquely identify the SystemNode, the handle is
 * simply a concatenation of ProviderName and EntityToken.
 * @return {string}
 */
SystemNode.prototype.getHandle = function () {

	return this._data.ElementKey;
}

/**
 * @return {List<string>}
 */
SystemNode.prototype.getHandles = function () {

	var result = new List();
	if (this._datas != null) {
		this._datas.each(function (data) {
			result.add(data.ElementKey);
		});
	} else {
		result.add(this._data.ElementKey);
	}
	return result;
}

/**
 * Not all nodes may be tagged!
 * @return {string}
 */
SystemNode.prototype.getTag = function () {

	return this._data.TagValue;
}

/**
 * @return {ImageProfile}
 * @param {string} size
 * @return {ImageProfile}
 */
SystemNode.prototype.getImageProfile = function ( size ) {

 	return new ImageProfile ({
		image : ImageProvider.getImageURL (
			this._data.Icon,
			size
		),
		imageActive :  ImageProvider.getImageURL (
			this._data.OpenedIcon ? this._data.OpenedIcon : this._data.Icon,
			size
		)
	});
}

/**
 * Get the node description.
 * @return {string}
 */
SystemNode.prototype.getToolTip = function () {

	var result = null;
	if ( typeof this._data.ToolTip != "undefined" ) {
		result = this._data.ToolTip;
	}
	return result;
}

/**
 * Get propertybag.
 * @return {HashMap<string><string>}
 */
SystemNode.prototype.getPropertyBag = function () {

	if ( !this._propertyBag && this._data.PropertyBag && this._data.PropertyBag.length != 0 ) {
		var map = {}
		new List ( this._data.PropertyBag ).each ( function ( entry ) {
			map [ entry.Key ] = entry.Value;
		});
		this._propertyBag = map;
	}
	return this._propertyBag;
}

/**
 * @return {boolean}
 */
SystemNode.prototype.hasChildren = function () {

	return this._data.HasChildren;
}

/**
 * Get the actionProfile assoicated the this node.
 * Actions of the category DeveloperMode will
 * not be included in operational mode.
 */
SystemNode.prototype.getActionProfile = function () {

	if ( this._actionProfile == null && this._data.ActionKeys != null && this._data.ActionKeys.length > 0 ) {

		var map = new Map ();
		var self = this;

		new List ( this._data.ActionKeys ).each ( function ( key ) {
			if ( SystemAction.actionMap.has ( key )) {

				var action = SystemAction.actionMap.get ( key );
				var isValid = true;

				if ( action.getCategory () == SystemAction.categories.DeveloperMode ) {
					if ( !Application.isDeveloperMode ) {
						isValid = false;
					}
				}
				if ( isValid ) {
					var id = action.getGroupID ();
					if ( !map.has ( id )) {
						map.set ( id, new List ());
					}
					var list = map.get ( id );
					list.add ( action );
				}
			} else {
				throw "No details for action key: " + key;
			}
		});

		this._actionProfile = map;
	}

	return this._actionProfile;
}

/**
 * Test for drag type.
 * @return {boolean}
 */
SystemNode.prototype.hasDragType = function () {

	return this._data.DragType != null;
}

/**
 * Test for drag type.
 * @return {string}
 */
SystemNode.prototype.getDragType = function () {

	return this._data.DragType;
}


/**
 * Test for drag accept.
 * @return {boolean}
 */
SystemNode.prototype.hasDragAccept = function () {

	return this._data.DropTypeAccept != null;
}

/**
 * Get drag accept.
 * @return {List<string>}
 */
SystemNode.prototype.getDragAccept = function () {

	return new List (
		this._data.DropTypeAccept
	);
}

/**
 * Test for detailed drag support.
 * @return {boolean}
 */
SystemNode.prototype.hasDetailedDropSupport = function () {

	//alert ( "We don't yet support detailed drag on individual treenodes!" );
	return this._data.DetailedDropSupported == true;
}

/*
 * Is from-language node?
 * @return {boolean}
 *
SystemNode.prototype.isFromLanguage = function () {

	return this._data.IsForeignLocale == true;
}
*/

/**
 * Is disabled?
 * @return {boolean}
 */
SystemNode.prototype.isDisabled = function () {

	return this._data.IsDisabled == true;
}

/**
 * The controversial property the decides whether
 * or not thee treenode may recieve auto-focus.
 * @return {boolean}
 */
SystemNode.prototype.isTreeLockEnabled = function () {

	return this._data.TreeLockEnabled == true;
}

/**
 * @return {Boolean}
 */
SystemNode.prototype.isMultiple = function () {

	return (this._datas != null);
}

/**
 * @return {Boolean}
 */
SystemNode.prototype.getDatas = function () {

	return this._datas;
}

/**
 * @param {string} handle
 * @return {void}
 */
SystemNode.prototype.select = function (handle) {

	if (this._datas != null) {
		this._datas.each(function (data) {
			if (data.ElementKey === handle) {
				this._data = data;
				this._actionProfile = null;
				this._registerSystemActions();
				return false;
			}
			return true;
		}, this);
	}
}


/**
 * @param {string} entityToken
 * @return {void}
 */
SystemNode.prototype.selectByToken = function (entityToken) {

	if (this._datas != null) {
		this._datas.each(function (data) {
			if (data.EntityToken === entityToken) {
				this._data = data;
				this._actionProfile = null;
				this._registerSystemActions();
				return false;
			}
			return true;
		}, this);
	}
}

/**
 * @return {List<string>}
 */
SystemNode.prototype.getEntityTokens = function () {

	var result = new List();
	if (this._datas != null) {
		this._datas.each(function (data) {
			result.add(data.EntityToken);
		});
	} else {
		result.add(this._data.EntityToken);
	}
	return result;
}


/**
 * @param {SystemNode} node
 * @return {SystemNode}
 */
SystemNode.prototype.add = function (node) {

	if (this._datas == null) {
		this._datas = new List();
		this._datas.add(this._data);
	}

	this._datas.add(node.getData());

	return this;
}


/**
 * Dispose. INVOKING THIS MAY INTRODUCE ERRORS!
 * TODO: Of course this should be made to work.
 */
SystemNode.prototype.dispose = function () {

	SystemNode.dispose ( this );
}