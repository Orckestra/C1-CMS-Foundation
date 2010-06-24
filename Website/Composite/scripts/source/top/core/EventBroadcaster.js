/**
 * @class
 */
function _EventBroadcaster () {}

_EventBroadcaster.prototype = {

	/**
	 * @type {HashMap<string><array<IBroadcastListener>>}
	 */
	_broadcasts : {},
	
	/**
	 * Add subscription.
	 * @param {string} message The subscription message.
	 * @param {object} subscriber The subscribing object. 
	 * Should implement method <code>handleBroadcast</code>.
	 */
	subscribe : function ( message, subscriber ) {
	
		if ( message != null ) {
			if ( !Interfaces.isImplemented ( IBroadcastListener, subscriber, true )) {
				throw ( "IBroadcastListener not implemented: " + message );
			} else if ( !this._broadcasts [ message ]) {
				this._broadcasts [ message ] = [ subscriber ];
			} else {
				this._broadcasts [ message ].push ( subscriber );
			}
		} else {
			SystemDebug.stack ( arguments );
			throw "Undefined broadcast: " + subscriber;
		}
	},
	
	/**
	 * Remove subscription.
	 * @param {string} message
	 * @param {object} unsubscriber
	 */
	unsubscribe : function ( message, unsubscriber ) {
	
		if ( message != null ) {
			if ( Interfaces.isImplemented ( IBroadcastListener, unsubscriber )) {
				var i = 0, subscriber, subscribers = this._broadcasts [ message ];
				if ( subscribers ) {
					while ( i < subscribers.length ) {
						subscriber = subscribers [ i ];
						if ( subscriber == unsubscriber ) {
							subscribers.splice ( i, 1 );
							break;
						}
						i++;
					}
				}
			}
		} else {
			throw "Undefined broadcast" + unsubscriber;
		}
	},
	
	/**
	 * Message has subscribers?
	 * @param {string} message
	 * @return {boolean}
	 */
	hasSubscribers : function ( message ) {
		
		var subscribers = this._broadcasts [ message ];
		return subscribers != null && subscribers.length > 0; 
	},
	
	/**
	 * Broadcast message to subscribers. 
	 * @param {string} message
	 * @param @optional {object} Passed as argument to subscribers
	 */
	broadcast : function ( message, optional ) {
		
		if ( message != null ) {
			var i = 0, subscribers = this._broadcasts [ message ];
			var list = [];
			if ( subscribers != null ) {
			
				/*
				 * This will store possible failed subscribers.
				 */
				var exceptions = new List();
			
				/*
				 * First collect in a temp list. This will 
				 * prevent sudden unsubscribers from modifying 
				 * the length of the list while we iterate.
				 */
				while ( i < subscribers.length ) {
					list.push ( subscribers [ i++ ]);
				}
				
				i = 0;
				while ( i < list.length ) {
					var subscriber = list [ i ];
					try {
						subscriber.handleBroadcast ( message, optional );
					}
					catch ( exception ) {		
						exceptions.add ( subscriber );
						var cry = "Exception in " + new String ( subscriber ) + 
							" on broadcast '" + message + "':" +  
							new String ( exception );
						SystemLogger.getLogger ( "EventBroadcaster" ).error ( cry );
						SystemDebug.stack ( arguments );
						if ( Application.isDeveloperMode ) {
							alert ( cry );
							throw ( exception );
						}
					}
					i++;
				}
				if ( exceptions.hasEntries ()) { // brutally exclude subscribers that raised exceptions
					exceptions.each ( function ( subscriber ) {
					 	EventBroadcaster.unsubscribe ( message, subscriber );
					});
				}
			}
		} else {
			SystemDebug.stack ( arguments );
			throw "Undefined broadcast";
		}
	}
}

/*
 * The instance that does it.
 */
var EventBroadcaster = new _EventBroadcaster ();