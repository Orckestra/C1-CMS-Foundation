/**
 * @class
 * @param @optional {Hashmap} map
 */
function Map ( map ) {

	/**
	 * @type {HashMap<object><object>
	 */	
	this._map = {};
	
	/*
	 * Populate from optional constructor object.
	 */
	if ( map != null ) {
		for ( var key in map ) {
			this.set ( key, map [ key ]);
		}
	}
}

Map.prototype._map = {};

/**
 * Get entry. Notice that an invalid key will not be tolerated 
 * here. Always use method "has" to check for key existance first.
 * @param {object} key
 */
Map.prototype.get = function ( key ) {
	
	var result = null;
	if ( this.has ( key )) {
		result = this._map [ key ];
	} else {
		var cry = "Map: Invalid key: " + key;
		SystemLogger.getLogger ( "Map" ).error ( cry );
		SystemDebug.stack ( arguments );
		if ( Application.isDeveloperMode ) {
			console.log(cry);
			console.log(arguments);
		}
	}
	return result;
}

/**
 * Set entry.
 * @param {object} key
 * @param {object} value
 */
Map.prototype.set = function ( key, value ) {
	
	this._map [ key ] = value;
}

/**
 * Delete entry.
 * @param {object} key
 */
Map.prototype.del = function ( key ) {
	
	delete this._map [ key ];
}

/**
 * Has entry?
 * @param {object} key
 * @return {boolean}
 */
Map.prototype.has = function ( key ) {
	
	return typeof this._map [ key ] != "undefined";
}

/**
 * Each entry.
 * @param {function} action
 */
Map.prototype.each = function ( action ) {
	
	for ( var key in this._map ) {
		var isContinue = action ( 
			key, 
			this._map [ key ]
		);
		if ( isContinue == false ) {
			break;
		}
	}
}

/**
 * Has entries?
 * @retun {boolean}
 */
Map.prototype.hasEntries = function () {
	
	var result = false;
	for ( var key in this._map ) {
		result = true;
		break;
	}
	return result;
}

/**
 * How many entries?
 * @retun {int}
 */
Map.prototype.countEntries = function () {
	
	var result = 0;
	for ( var key in this._map ) {
		result ++;
	}
	return result;
}

/** 
 * Convert to list (listing keys or values).
 * @param {boolean} isKey
 */
Map.prototype.toList = function ( isKey ) {
	
	var list = new List ();
	for ( var key in this._map ) {
		list.add (
			isKey ? key : this._map [ key ]
		);
	}
	return list;
}

/**
 * Copy.
 * @return {Map}
 */
Map.prototype.copy = function () {
	
	var map = new Map ();
	for ( var key in this._map ) {
		map.set ( key, this._map [ key ]);
	}
	return map;
}

/**
 * This will modify the original Map.
 * @return {Map}
 */
Map.prototype.inverse = function () {
	
	var map = new Map ();
	for ( var key in this._map ) {
		map.set ( this._map [ key ], key );
	}
	return map;
}

/**
 * Empty map.
 */
Map.prototype.empty = function () {
	
	for ( var key in this._map ) {
		delete this._map [ key ];
	}
}

/**
 * Dispose.
 * TODO: Invoke "dispose" on entries?
 */
Map.prototype.dispose = function () {
	
	for ( var key in this._map ) {
		this._map [ key ] = null;
	}
}