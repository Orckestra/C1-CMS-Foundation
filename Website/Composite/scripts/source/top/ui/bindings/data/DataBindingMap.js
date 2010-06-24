DataBindingMap.prototype = new Map;
DataBindingMap.prototype.constructor = DataBindingMap;
DataBindingMap.superclass = Map.prototype;

DataBindingMap.TYPE_VALUE = "databindingmap valuetype";
DataBindingMap.TYPE_RESULT = "databindingmap resulttype";

/**
 * @class
 * Notice that this is an utility, not a binding!
 * @param @optional {Map} map
 */
function DataBindingMap ( map ) {
	
	/*
	 * Re-declare super property so that we don't all populate the same Map.
	 */
	this._map = map ? map : {};
	
	/**
	 * Indicates whether or not content is intended 
	 * for serverside or clientside processing.
	 * @type {string}
	 */
	this.type = DataBindingMap.TYPE_RESULT;
}