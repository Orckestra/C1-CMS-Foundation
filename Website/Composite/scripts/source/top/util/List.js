/**
 * @class
 * Sort of an array with added methods. Not as flexible, but easier to read. 
 * All this stuff was written before the new Array methods of JS1.6 - otherwise 
 * we would have attempted to simply simply emulate these by expando on Explorer.
 * @param {object} arg Optional
 */
function List ( arg ) {
	
	/**
	 * @type {int}
	 */
	this._index = 0;
	
	/**
	 * @type {array}
	 */
	this._array = [];
	
	/**
	 * Is disposed?
	 * @type {boolean}
	 */
	this.isDisposed = false;
	
	/*
	 * Initialize from argument.
	 */
	if ( arg ) {
		this.init ( arg );
	}
	
	return this;
}

/**
 * Populate from specified array or NodeList.
 * @param {object} This should be either an array or a NodeList object.
 */
List.prototype.init = function ( list ) {

	var isArray = ( list !== undefined && list.splice !== undefined );
	
	if ( isArray ) {
		this._array = list;
	} else if (list.length) {
		var i = 0;
		for (var i = 0; i < list.length; i++) {
			this._array.push(list[i]);
		}
	} else {
		var i = 0, entry;
		while ((entry = list[i++]) != null) {
			this._array.push(entry);
		}
	}
	this.reset ();
}

/**
 * Add object and return it.
 * @param {object} object
 * @return {object}
 */
List.prototype.add = function ( object ) {

	this._array.push ( object );
	return object;
}

/**
 * Add object first and return it.
 * @param {object} object
 * @return {object}
 */
List.prototype.addFirst = function ( object ) {

	this._array.unshift ( object );
	return object;
}

/**
 * Delete entry by key.
 * @param {int} index
 */
List.prototype.remove = function (entry) {
	var i = 0, e;
	while ((e = this._array[i++]) !== undefined) {
		if (e == entry) {
			this._array.splice(i - 1, 1);
			break;
		}
	}
	
}

/**
 * @param {int} index
 * @return {object}
 */
List.prototype.get = function ( index ) {
	
	var result = null;
	if ( this._array [ index ]) {
		result = this._array [ index ];
	} 
	return result;
}

/**
 * @param {int} index
 * @param {object} value
 */
List.prototype.set = function ( index, value ) {

	this._array [ index ] = value;
}

/**
 * Delete entry at specified index.
 * @param {int} index
 */
List.prototype.del = function ( index ) {

	this._array.splice ( index, 1 );
}

/**
 * Is entry added?
 * @param {object} entry
 */
List.prototype.has = function ( entry ) {
	
	var result = false;
	var i = 0, e;
	while (( e = this._array [ i++ ]) !== undefined ) {
		if ( e == entry ) {
			result = true;
			break;
		}
	}
	return result;
}		
		
/**
 * @return {int}
 */
List.prototype.getLength = function () {

	return this._array.length;
}

/**
 * @return {boolean}
 */
List.prototype.hasEntries = function () {

	return this.getLength () > 0;
}

/**
 * @return {boolean}
 */
List.prototype.hasNext = function () {

	var result = false;
	if ( this._array != null ) {
		result = this._index < this._array.length;
	} else {
		SystemLogger.getLogger ( "List" ).error ( "Mysterious List#hasNext exception in IE" );
		// SystemDebug.stack ( arguments );
	}
	return result;
}

/**
 * @return {object}
 */
List.prototype.getNext = function () {

	var result = null;
	if ( this.hasNext ()) {
		result = this._array [ this._index ++ ];
	}
	return result;
}

/**
 * Get following entry.
 * @param {object} entry
 * @return {object}
 */
List.prototype.getFollowing = function ( entry ) {

	var result = null;
	var i = 0, e = null;
	
	while (( e = this._array [ i ]) != null && !result ) {
		if ( e == entry && this._array [ i + 1 ]) {
			result = this._array [ i + 1 ];
		}
		i++;
	}
	return result;
}

/**
 * Get preceding.
 * @param {object} entry
 * @return {object}
 */
List.prototype.getPreceding = function ( entry ) {
	
	var result = null;
	var i = 1, e = null;
	
	while (( e = this._array [ i ]) != null && !result ) {
		if ( e == entry && this._array [ i - 1 ]) {
			result = this._array [ i - 1 ];
		}
		i++;
	}
	return result;
}

/**
 * Get first occuring index of a given entry.  
 * @param {object} entry
 * @return {int}
 */
List.prototype.getIndex = function ( entry ) {
	
	var result = -1;
	
	if ( this._array.indexOf != null ) {
		result = this._array.indexOf ( entry );
	} else {
		var index = 0;
		this.each ( function ( e ) {
			var res = true;
			if ( e == entry ) {
				result = index;
				res = false;
			}
			index ++;
			return res;
		});
	}
	return result;
}

/**
 * @return {List}
 */
List.prototype.reset = function () {

	this._index = 0;
	return this;
}

/**
 * @return {List}
 */
List.prototype.clear = function () {

	this._array = [];
	return this.reset ();
}

/**
 * @param {function} action The action can return false to discontinue iteration.
 * @param {object} thisp
 */
List.prototype.each = function ( action, thisp ) {

	this.reset ();
	var next, is = true;
	while ( is != false && this.hasNext ()) {
		if ( thisp === undefined ) {
			thisp = null;
		}
		var index = this._index;
		var entry = this.getNext ();
		is = action.call ( thisp, entry, index );
	}
	this.reset ();
}

/**
 * @return {List}
 */
List.prototype.copy = function () {

	return new List ( this._array );
}

/**
 * @return {List}
 */
List.prototype.reverse = function () {

	this._array.reverse ();
	return this;
}

/**
 * Extract first entry. This method changes the length of the list.
 * @return {object}
 */
List.prototype.extractFirst = function () {

	return this._array.shift ();
}

/**
 *  Extract last entry. This method changes the length of the list.	
 * @return {object}
 */
List.prototype.extractLast = function () {

	return this._array.pop ();
}

/**
 * Get first entry.
 */
List.prototype.getFirst = function () {
	
	return this.get ( 0 );
}

/**
 * Get last entry.
 */
List.prototype.getLast = function () {
	
	return this.get ( this.getLength () - 1 );
}

/**
 * Amazing.
 */
List.prototype.toString = function () {
	// To avoid errors that popup in Firebug
    if (typeof this._array === 'undefined') {
        return null;
    }

	return this._array.toString ();
}

/**
 * @return {array}
 */
List.prototype.toArray = function () {
	
	return this._array.concat ([]);
}

/**
 * Add all entries from another list.
 * @param {List} list
 * @return {List}
 */
List.prototype.merge = function ( list ) {

	list.reset ();
	while ( list.hasNext ()) {
		this.add ( list.getNext ());
	}
	return this;
}

/**
 * Dispose.
 */
List.prototype.dispose = function () {
	
	var i = this._array.length - 1;
	while ( i >= 0 ) {
		this._array [ i-- ] = null;
	}
	this._array = null;
	this._index = null;
	this._isDisposed = true;
}