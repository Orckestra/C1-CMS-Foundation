window.onload = function () {

	var div = document.getElementById("textarea");

	// WebKit needs a short timeout here...
	setTimeout(function () {
		var editor = CodeMirror.fromTextArea(div, {
			mode: "text/html",
			indentUnit: 4,
			indentWithTabs: true,
			extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"},
			lineNumbers: true,
			theme: "composite"
		});

		var broadcaster = top.EventBroadcaster;
		var messages = top.BroadcastMessages;
		if (broadcaster != undefined) {
			broadcaster.broadcast(messages.CODEMIRROR_LOADED, {
				broadcastWindow: window,
				codemirrorEditor: editor
			});
		}
	}, 0);
}