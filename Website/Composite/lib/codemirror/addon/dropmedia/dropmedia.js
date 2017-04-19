(function () {
	"use strict";

	var UPLOAD_SERVICE_URL = Resolver.resolve("${root}/services/Media/Upload.ashx");

	CodeMirror.defineInitHook(function (cm) {
		cm.on("drop", onDrop);
	});

	function onDrop(cm, e) {
		var files = e.dataTransfer.files;
		if (files && files.length && window.FileReader && window.File) {
			CodeMirror.e_preventDefault(e);

			dispatchMouseEvent(e, "mousedown");
			dispatchMouseEvent(e, "mouseup");

			var def = ViewDefinitions["Composite.Management.MediaWritableFolderSelectorDialog"];
			def.handler = {
				handleDialogResponse: function (response, result) {
					if (response == Dialog.RESPONSE_ACCEPT) {
						var folder = result.getFirst();
						var content = "";
						for (var i = 0; i < files.length; i++) {
							var file = files[i];
							var request = new XMLHttpRequest();
							request.open("post", UPLOAD_SERVICE_URL, false);
							request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
							request.setRequestHeader("X-FileName", file.name);
							request.setRequestHeader("X-Folder", folder);
							request.send(file);
							content += request.responseText;
						}
						cm.replaceSelection(content);
						// save last selected folder
						def.argument.selectedToken = folder;
					}
				}
			};
			Dialog.invokeDefinition(def);
		}
	}

	function dispatchMouseEvent(event, name) {
		if (event.initMouseEvent) {
			var mouseEvent = document.createEvent("MouseEvent");
			mouseEvent.initMouseEvent(name, true, true, window, 0,
										event.screenX, event.screenY, event.clientX, event.clientY,
										event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
										0, null);
			event.target.dispatchEvent(mouseEvent);
		}
	}
})();
