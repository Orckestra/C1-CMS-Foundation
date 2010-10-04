window.onload = function () {
	
	var div = document.getElementById ( "editor" );
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
	    throw new Error ( "Bespin performed a crash landing: " + error );
	});
}