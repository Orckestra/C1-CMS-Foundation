window.onload = function () {

	var div = document.getElementById("textarea");
	// WebKit needs a short timeout here...
	setTimeout(function () {
		try {
			var editor = CodeMirror.fromTextArea("textarea", {
				height: "300px",
				parserfile: ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js",
							"../../contrib/csharp/js/tokenizecsharp.js", "../../contrib/csharp/js/parsecsharp.js",
							"../contrib/sql/js/parsesql.js",
							"parsedummy.js"],
				stylesheet: ["CodeMirror/css/xmlcolors.css", "CodeMirror/css/csscolors.css", "CodeMirror/css/jscolors.css",
							"contrib/csharp/css/csharpcolors.css",
							"CodeMirror/contrib/sql/css/sqlcolors.css",
							"editor.css"
							],
				path: "CodeMirror/js/",
				continuousScanning: 500,
				lineNumbers: true,
				tabMode: "shift",
				textWrapping: false,
				onLoad: function (n) {
					var broadcaster = top.EventBroadcaster;
					var messages = top.BroadcastMessages;
					if (broadcaster != undefined) {
						broadcaster.broadcast(messages.CODEMIRROR_LOADED, {
							broadcastWindow: window,
							codemirrorEditor: editor
						});
					}
				}
			});
		} catch (exception) {
			alert(exception)
		}
	}, 0);
}