PermissionEditorHeadBinding.prototype = new Binding;
PermissionEditorHeadBinding.prototype.constructor = PermissionEditorHeadBinding;
PermissionEditorHeadBinding.superclass = Binding.prototype;

/**
 * @class
 */
function PermissionEditorHeadBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PermissionEditorHeadBinding" );
	
	/**
	 * @type {Map<string><int>}
	 */
	this._indexes = new Map ();
	
	/**
	 * @type {int}
	 */
	this._count = 0;
}

/**
 * Identifies binding.
 */
PermissionEditorHeadBinding.prototype.toString = function () {
	
	return "[PermissionEditorHeadBinding]";
}

/** 
 * Set headings.
 * @param {List<object>}
 */
PermissionEditorHeadBinding.prototype.setHeadings = function ( list ) {
	
	var row = this.bindingElement.rows [ 0 ];
	var indexes = this._indexes;
	
	list.each ( function ( object ) {
		var th = DOMUtil.createElementNS ( Constants.NS_XHTML, "th", document );
		th.appendChild ( document.createTextNode ( object.Value ));
		row.appendChild ( th );
		indexes.set ( object.Key, th.cellIndex );
	});
}

/**
 * Get cell index for permission type key.
 * @param {string} key
 */
PermissionEditorHeadBinding.prototype.getIndexForPermission = function ( key ) {
	
	return this._indexes.get ( key );
}

/**
 * Get permission type key for cell index.
 * @param {string} key
 */
PermissionEditorHeadBinding.prototype.getPermissionForIndex = function ( index ) {
	
	if ( !this._keys ) {
		this._keys = this._indexes.inverse ();
	}
	return this._keys.get ( index );
}

/**
 * Get permission type count.
 * @return {int}
 */
PermissionEditorHeadBinding.prototype.getPermissionTypeCount = function () {
	
	if ( !this._count ) {
		this._count = this._indexes.countEntries ();
	}
	return this._count;
}