/**
 * Default replacement update with which a section of the  
 * DOM subtree is simply replaced with something new. 
 * {@see ReplaceUpdate}
 * @type {String}
 */
Update.TYPE_REPLACE = "replace";

/**
 * Optional attribute update. Using this, elements may have their 
 * attributes updated without replacing the element DOM branch. 
 * The element must have a id attribute specified for this to work. 
 * {@see UpdateManager#hasSoftAttributes}
 * {@see AttributesUpdate}
 * @type {String}
 */
Update.TYPE_ATTRIBUTES = "attributes";

/**
 * Optional removal update: Removes a child without replacing the parent. 
 * Child siblings must all be elements and they must all have an id specified.
 * {@see UpdateManager#hasSoftSiblings}
 * {@see SiblingUpdate}
 * @type {String}
 */
Update.TYPE_REMOVE = "remove";

/**
 * Optional insertion update: Inserts a child without replacing the parent.
 * Child siblings must all be elements and they must all have an id specified.
 * {@see UpdateManager#hasSoftSiblings}
 * {@see SiblingUpdate}
 * @type {String}
 */
Update.TYPE_INSERT = "insert";

/**
 * This event is dispatched before an update. Event target depends on update type: 
 *   "replace" - event target is about to be deleted.
 *   "attributes" - event target is going to have attributes updated.
 *   "remove" - event target is about to be deleted.
 *   "insert" - event target is the PARENT node of an expected child.
 * @see {Update#_beforeUpdate}
 * @type {String}
 */
Update.EVENT_BEFOREUPDATE = "beforeupdate";

/**
 * This event is dispatched after an update. Event target depends on update type:
 *   "replace" - event target was just inserted.
 *   "attributes" - event target just had some attributes updated.
 *   "remove" - event target is the PARENT node of a deleted child.
 *   "insert" - event target was just inserted. 
 * @see {Update#_afterUpdate}
 * @type {String}
 */
Update.EVENT_AFTERUPDATE  = "afterupdate";

/**
 * The action is all about the subclasses.
 * @see {ReplaceUpdate}
 * @see {AttributesUpdate}
 * @see {SiblingUpdate}
 */
function Update () {
	
	return this;
}

Update.prototype = {
	
	/**
	 * Update type.
	 * @type {String}
	 */
	type : null,
	
	/**
	 * Identifies each unique Update instance.
	 * @see {UpdateManager#getUpdate}
	 * @type {String}
	 */
	key : null,
	
	/**
	 * Id of the current page element that is about to be updated.
	 * @type {String}
	 */
	id : null,
	
	/**
	 * The (XML) element used to replace or otherwise update the current element. 
	 * @type {Element}
	 */
	element : null,
	
	/**
	 * The update method performs the actual update. Count on methods  
	 * _beforeUpdate and _afterUpdate to be invoked at this pount.
	 */
	update : function () {},

	/**
	 * Better not keep references to any DOM element around here.
	 */
	dispose : function () {
		
		this.element = null;
	},
	
	/**
	 * When something changed, dispatch pre-update event. 
	 * The __updateType expando property can be used to act on this. 
	 * @param {Element} element
	 * @return {boolean}
	 */
	_beforeUpdate : function ( element ) {
		
		var result = true;
		if ( element != null ) {
			element.__updateType = this.type;
			result = UpdateAssistant.dispatchEvent ( element, Update.EVENT_BEFOREUPDATE );
		}
		return result;
	},
	
	/**
	 * When something changed, dispatch post-update event. 
	 * The __updateType expando property can be used to act on this.
	 * @param {Element} element
	 * @return {boolean}
	 */
	_afterUpdate : function ( element ) {
		
		var result = true;
		if ( element != null ) {
			element.__updateType = this.type;
			result = UpdateAssistant.dispatchEvent ( element, Update.EVENT_AFTERUPDATE );
		}
		return result;
	}
};