/**
 * Inspectors can recognize the postback document by looking for this global boolean.
 * @type {boolean}
 */
window.isPostBackDocument = true;

/**
 * Track postback map.
 * @type {List<object>} 
 */
window.postBackList = null;

/**
 * Track postback URL.
 * @type {string} 
 */
window.postBackURL = null;


/**
 * Populate form and submit to specified url. Note that we use a List instead 
 * of a Map, which may sound more appealing, because server could expect multiple 
 * fields with same name but different value; as may be the case for checkboxes.
 * @param {List<object>} map
 * @param {string} url
 */
function submit ( list, url ) {
	
	if ( !list instanceof List ) {
		alert ( "POSTBACK.JS REFACTORED!" );
	}
	
	var form = document.forms [ 0 ];
	form.action = top.Resolver.resolve ( url );
	var debug = "Posting to: " + form.action +"\n\n";

	list.each(function (object) {
		if (object.value != null && object.value.indexOf('\n') > -1) {
			var textarea = document.createElement("textarea");
			textarea.name = object.name;
			textarea.value = object.value;

			form.appendChild(textarea);
		}
		else {
			var input = document.createElement("input");
			input.name = object.name;
			input.value = object.value;

			// DELETE THIS NOW???
			input.setAttribute("name", new String(object.name)); // FF4.0 beta bug!!!
			input.setAttribute("value", new String(object.value)); // FF4.0 beta bug!!!

			form.appendChild(input);
		}
		debug += object.name + ": " + object.value + "\n";
	});
	
	/*
	 * Debug form post.
	 */
	top.SystemLogger.getLogger ( document.title ).debug ( debug );
	
	/*
	 * You can read these on window.unload in case you need to resubmit the data. 
	 */
	window.postBackList = list;
	window.postBackURL = url;
	
	/*
	 * Submit the form. Because other parties may have an interest in our local 
	 * window.load event, we submit on a short timeout. Otherwise this document  
	 * may cease to exist before they get a chance to handle it...
	 */
// maw: sry, but this was too annoying :)
//	alert ( form.method )
	setTimeout ( function () {
		top.Application.logger.debug ( DOMSerializer.serialize ( document.documentElement, true ));
		form.submit ();
	}, 100 );
}