/**
 * @class
 * Simply because we need to wrap some code up in short method   
 * names that can be accessed easily in inline markup.
 */
function _Commands () {
	
	this._construct ();
}

/**
 * Code.
 */
_Commands.prototype = {
	
	_URL_ABOUTDIALOG : "${root}/content/dialogs/about/about.aspx",
	_URL_PREFERENCES : "${root}/content/dialogs/preferences/preferences.aspx",
	
	/**
	 * Construct.
	 */
	_construct : function () {
		
		var self = this;
		EventBroadcaster.subscribe ( BroadcastMessages.SAVE_ALL, {
			handleBroadcast : function ( broadcast, arg ) {
				self.saveAll ( arg );
			}
		})
	},

	/**
	 * Opens the About dialog.
	 */
	about : function () {
		
		this._dialog ( this._URL_ABOUTDIALOG );
	},
	
	/**
	 * Opens the Preferences dialog.
	 */
	preferences : function () {
		
		this._dialog ( this._URL_PREFERENCES );
	},
	
	/**
	 * Taking care to fadeout menus before opening dialogs, otherwise   
	 * fading may be jaggy. But what if nobody was using a menu?...
	 */
	_dialog : function ( url ) {
		
		if ( Client.hasTransitions ) {
			setTimeout ( function () {
				Dialog.invokeModal ( url );
			}, Animation.DEFAULT_TIME );
		} else {
			Dialog.invokeModal ( url );
		}
	},
	
	/**
	 * Close current editor. This broadcast is intercepted by the DockTabBinding. 
	 */
	close : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_CURRENT );
	},
	
	/**
	 * Close all (editors). 
	 */
	closeAll : function () {
		
		this.saveAll ( true );
	},
	
	/**
	 * Save current editor [CTRL+S].  This broadcast is intercepted by the DockTabBinding.
	 */
	save : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.SAVE_CURRENT );
	},
	
	/**
	 * Save all dirty tabs (in all perspectives), prompting a list.
	 * @param {boolean} isCloseAll
	 */
	saveAll : function ( isCloseAll ) {
		
		/*
		 * Invoke dialog and collect 
		 * selected tabs in a list.
		 */
		var self = this;
		var docktabs = Application.getDirtyDockTabsTabs ();
		if ( docktabs.hasEntries ()) {
			Dialog.invokeModal ( "${root}/content/dialogs/save/saveall.aspx", {
				handleDialogResponse : function ( response, result ) {
					switch ( response ) {
						case Dialog.RESPONSE_ACCEPT :
							self._handleSaveAllResult ( result, isCloseAll );
							break;
						case Dialog.RESPONSE_CANCEL :
							/*
							 * Needed for language-change scenario...
							 */
							EventBroadcaster.broadcast ( BroadcastMessages.SAVE_ALL_DONE );
							break;
					}
				}
			}, docktabs );
		} else if ( isCloseAll ){
			EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_ALL );
		}
	},
	
	/**
	 * Handle result from "save all" dialog.
	 * @param {DataBindingResultMap} result
	 * @param {boolean} isCloseAll
	 * @return {boolean} True if something was dirty...
	 */
	_handleSaveAllResult : function ( result, isCloseAll ) {
	
		var returnable = false;
		
		var list = new List ();
		result.each ( function ( name, tab ) {
			if ( tab != false ) {
				list.add ( tab );
			}
		});
		/*
		 * Save tabs from list.
		 */
		if ( list.hasEntries ()) {
			returnable = true;
			var count = list.getLength ();
			var handler = { 
				handleBroadcast : function ( broadcast, tab ) {
					if ( --count == 0 ) {
						EventBroadcaster.unsubscribe ( BroadcastMessages.DOCKTAB_CLEAN, this );
						EventBroadcaster.broadcast ( BroadcastMessages.SAVE_ALL_DONE );
						if ( isCloseAll ) {
							EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_ALL );
						}
					}
				}
			}
			EventBroadcaster.subscribe ( BroadcastMessages.DOCKTAB_CLEAN, handler );
			list.each ( function ( tab ) {
				tab.saveContainedEditor ();
			});
		} else {
			/*
			 * Needed for language-change scenario...
			 */
			EventBroadcaster.broadcast ( BroadcastMessages.SAVE_ALL_DONE );
		}
		
		return returnable;
	},
	
	/**
	 * Flip display of the system log [control+shift+L]. If an error prevented 
	 * the system from starting normally, you'll be happy to know that the log 
	 * is still able to open in a regular browser window.
	 */
	systemLog : function () {
		
		if ( Application.isOperational ) {
			StageBinding.handleViewPresentation ( "Composite.Management.SystemLog" );
		} else {
			var win = window.open ( Constants.APPROOT + "/content/views/dev/systemlog/systemlogoutput.html" );
			win.onload = function () {
				EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMLOG_OPENED, this );
			}
		}
	}
}

/**
 * The instance that does it.
 */
var Commands = new _Commands ();