/**
 * @class
 * This is the public interface for persistance management.
 * Don't instantiate this class manually. Access through 
 * instance variable "Persistance" declared below. This 
 * instance should be considered a singleton class.
 */
function _Persistance () {}
_Persistance.prototype = {
		
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "Persistance" ),	
	
	/**
	 * @type {HashMap<string><HashMap<string><string>>}
	 */
	_persistance : null,

	/**
	 * Flip to activate!
	 */
	_isEnabled : false,
	
	/**
	 * @type {boolean}
	 */
	isInitialized : false,
	
	/**
	 * @type {boolean}
	 */
	isEnabled : false,
		
	/**
	 * Get persisted property.
	 * @param {string} id
	 * @param {string} prop
	 * @return {string}
	 */
	getPersistedProperty : function ( id, prop ) {
		
		var result = null;
		if ( this.isInitialized == true ) {
			if ( this._persistance ) {
				var entry = this._persistance [ id ];
				if ( entry ) {
					result = entry [ prop ];
				}
			}
		} else {
			throw "Persistance not initialized!";
		}
		return result;
	},
	
	/**
	 * Set persisted property.
	 * @param {string} id
	 * @param {string} prop
	 * @param {string} value
	 */
	setPersistedProperty : function ( id, prop, value ) {
		
		if ( this.isInitialized == true ) {
			if ( this._persistance ) {
				if ( value != null ) {
					if ( !this._persistance [ id ]) {
						this._persistance [ id ] = {};
					}
					this._persistance [ id ][ prop ] = String ( value );
				} else {
					this._logger.error ( "Cannot persist " + prop + " with value: null" );
				}
			}
		} else {
			throw "Persistance not initialized!";
		}
	},
	
	/**
	 * Clear all persisted properties.
	 * TODO: Actually clear all persisted properties.
	 */
	clearAllPersistedProperties : function () {
		
		this._logger.debug ( "TODO: clearAllPersistedProperties" );
	},
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {string} broadcast
	 */
	handleBroadcast : function ( broadcast ) {
		
		switch ( broadcast ) {
			case BroadcastMessages.APPLICATION_SHUTDOWN :
				var binding = top.bindingMap.persistance; 
				binding.persist ( this._persistance );
				break;
		}
	},
	
	/**
	 * Initialize. This is invoked by the {@link PersistanceBinding}.
	 * @param {HashMap<string><HashMap<string><string>>} map
	 */
	initialize : function () {
		
		/*
		 * Fetching persistance from PersistanceBinding.
		 */
		if ( !this.isInitialized ) {
			this.isInitialized = true;
			if ( this._isEnabled == true ) {
				var binding = top.bindingMap.persistance;
				var map = binding.getPersistanceMap ();
				if ( map ) {
					this.isEnabled = true;
					this._persistance = map;
					EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_SHUTDOWN, this );
				}
			} else {
				this.isEnabled = false;
			}
			EventBroadcaster.broadcast ( BroadcastMessages.PERSISTANCE_INITIALIZED );
		}
	}
}

/**
 * The instance that does it.
 * @type {_Chrome}
 */
var Persistance = new _Persistance ();