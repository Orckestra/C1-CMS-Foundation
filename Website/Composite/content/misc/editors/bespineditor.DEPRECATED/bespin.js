window.onload = function () {
	
	var div = document.getElementById ( "editor" );
	
	// WebKit needs a short timeout here...
	setTimeout ( function () {
		try {
			bespin.useBespin ( div ).then ( function ( env ) {
				
				var broadcaster = top.EventBroadcaster;
				var messages = top.BroadcastMessages;
				
				if ( broadcaster != undefined ) {
					broadcaster.broadcast ( messages.BESPIN_LOADED, {
						broadcastWindow : window,
						bespinEditor : env.editor,
						bespinEnvelope : env
					});
				}
				
			}, function ( error ) {
			    throw new Error ( error );
			});
		} catch ( exception ) {
			alert ( exception )
		}
	}, 0 );
}