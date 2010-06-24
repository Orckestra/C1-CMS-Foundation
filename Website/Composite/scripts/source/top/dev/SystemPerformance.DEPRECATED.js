/**
 * @class
 */
window.SystemPerformance = new function () {
	
	/*
	 * Markers. Simply because we want them isolated here.
	 */
	this.PHASE_LOAD 				= "Load";
	this.PHASE_REGISTER 			= "Register";
	this.PHASE_ATTACH 				= "Attach";
	this.PHASE_FLEX 				= "Flex";
	this.PHASE_DIALOG 				= "Layout (dialog)";
	this.PHASE_TREEFINDNODES 		= "Analyze tree";
	this.PHASE_TREEGETSYSTEMNODES 	= "Fetch SystemNodes";
	this.PHASE_TREEBUILDNODES 		= "Build treenodes";
	this.PHASE_TREESERVICE 			= "(Contacting TreeService)";
	this.PHASE_MICROSOFTREQUEST		= "Ready for FIRST updatepanel refresh (only measuring the first)";
	this.PHASE_UPDATEPANEL			= "Updatepanel";
	this.PHASE_MANIFEST				= "DataBinding manifest";
	
	/*
	 * Privates
	 */
	var logger = SystemLogger.getLogger ( "SystemPerformance" );
	var timer = SystemTimer.getTimer ( "SystemPerformance" );
	var isEnabled = true;
	var markers = new Map ();
	var labels = new Map ();
	var systemactionlabel = null;
	var isTracking = false;
	
	/*
	 * Publics
	 */
	this.isEnabled = false;
		
	/**
	 * Note that the entire setup only gets enabled in developermode.
	 * @implements {IBroadcastListener}
	 * @param {string} broadcast
	 * @param {object} arg
	 */
	this.handleBroadcast = function ( broadcast, arg ) {
		
		if ( Application.isDeveloperMode ) {
			try {
				this._handleBroadcast ( broadcast, arg );
			} catch ( exception ) {
				alert ( exception );
				alert ( exception.stack );
				throw ( exception );
			}
		}
	}
	
	/**
	 * @param {string} broadcast
	 * @param {object} arg
	 */
	this._handleBroadcast = function ( broadcast, arg ) {
		
		switch ( broadcast ) {
				
			/*
			 * App startup time.
			 */
			case BroadcastMessages.APPLICATION_OPERATIONAL :
				if ( isEnabled ) {
					this.isEnabled = true;
					timer.report ( "Application operational" );
					EventBroadcaster.subscribe ( BroadcastMessages.VIEW_OPENING, this );
					EventBroadcaster.subscribe ( BroadcastMessages.VIEW_COMPLETED, this );
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMACTION_INVOKE, this );
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMACTION_INVOKED, this );
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this );
					EventBroadcaster.subscribe ( BroadcastMessages.UPDATEPANELS_UPDATED, this );
					EventBroadcaster.subscribe ( BroadcastMessages.POSTBACK_START, this );
					EventBroadcaster.subscribe ( BroadcastMessages.POSTBACK_STOP, this );
				}
				break;
				
			/*
			 * Reset timer on these events.
			 */
			case BroadcastMessages.SYSTEMACTION_INVOKE :
			case BroadcastMessages.VIEW_OPENING :
			case BroadcastMessages.POSTBACK_START :
				reset ();
				break;
			
			case BroadcastMessages.UPDATEPANELS_UPDATED :
				if ( isTracking ) {
					timer.report ( "Ajax update completed" + getMarkers ());
					finish ();
				}
				break;
			
			/*
			case BroadcastMessages.POSTBACK_STOP :
				if ( isTracking ) {
					timer.report ( "Postback completed" + getMarkers ());
					finish ();
				}
				break;
			*/
			
			/**
			 * Backend view completed.
			 * @see {DockBinding#_setupPageBindingListeners}
			 */
			case BroadcastMessages.VIEW_COMPLETED :
				if ( isTracking ) {
					var label = getLabelForHandle ( arg );
					timer.report ( "Completed \"" + label + "\"" + getMarkers ());
					finish ();
				}
				break;
			
			/*
			 * New action response.
			 */
			case BroadcastMessages.SYSTEMACTION_INVOKED :
				if ( isTracking ) {
					timer.report ( "SystemAction \"" + arg + "\" invoked on server" );
					finish ();
				}
				break;
			
			/*
			 * Tree refreshing.
			 */
			case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING :
				EventBroadcaster.unsubscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this );
				EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this );
				reset ();
				break;
			
			/*
			 * Tree refreshed.
			 */	
			case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED :
				if ( isTracking ) {
					EventBroadcaster.unsubscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this );
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this );
					timer.report ( "Tree refreshed" + getMarkers ());
					finish ();
				}
				break;
		}
	}
	
	/**
	 * Mark time.
	 * @param {string} marker
	 * @param {SystemTimer} timer
	 */
	this.mark = function ( marker, markertimer ) {
		
		if ( this.isEnabled ) {
			if ( !markers.has ( marker )) {
				var time = markertimer ? markertimer.getTime () : timer.getTime ();
				markers.set ( marker, String ( time ));
			}
		}
	}
	
	/**
	 * Reset timer and markers (not during startup).
	 */
	function reset () {
		
		if ( SystemPerformance.isEnabled ) {
			timer.reset ();
			markers = new Map ();
			isTracking = true;
		}
	}
	
	/**
	 * Finish.
	 */
	function finish () {
	
		isTracking = false;
	}
	
	/**
	 * Get markers.
	 */
	function getMarkers () {
		
		var result = "";
		markers.each ( function ( marker, time ) {
			time = String ( time );
			switch ( time.length ) {
				case 1 :
					time = "000" + time;
					break;
				case 2 :
					time = "00" + time;
					break;
				case 3 :
					time = "0" + time;
					break;
			}
			result += "\n\t\t" + time + ": " + marker;
		});
		return result
	}
	
	/**
	 * Them backend definitions don't always have labels. 
	 * This will attempt to fetch a human readable label.
	 * @param {string} handle
	 * @return {string}
	 */
	function getLabelForHandle ( handle ) {
		
		var result = null;
		if ( labels.has ( handle )) {
			result = labels.get ( handle );
		} else {
			var view = ViewBinding.getInstance ( handle );
			var def = view.getDefinition ();
			if ( def.label ) {
				result = def.label;
			} else {
				var page = view.getContentWindow ().bindingMap.formcontrolpage;
				if ( page ) {
					result = page.label;
				}
			}
			if ( result ) {
				labels.set ( handle, result );
			}
		}
		return result;
	}
	
	/**
	 * Start reporting on 
	 * application start.
	 */
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_OPERATIONAL, this );
}