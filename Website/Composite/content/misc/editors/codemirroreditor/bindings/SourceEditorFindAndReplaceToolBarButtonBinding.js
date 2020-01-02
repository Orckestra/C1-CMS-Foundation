SourceEditorFindAndReplaceToolBarButtonBinding.prototype = new EditorToolBarButtonBinding;
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.constructor = SourceEditorFindAndReplaceToolBarButtonBinding;
SourceEditorFindAndReplaceToolBarButtonBinding.superclass = EditorToolBarButtonBinding.prototype;

/**
* @class
*/
function SourceEditorFindAndReplaceToolBarButtonBinding() {

    /**
    * @type {SystemLogger}
    */
    this.logger = SystemLogger.getLogger("SourceEditorFindAndReplaceToolBarButtonBinding");

    /**
    * The containing editor.
    * @type {SourceEditorBinding}
    */
    this._editorBinding = null;

    /**
    * The codemirror editor.
    * @type {Codemirror}
    */
    this._codemirrorEditor = null;

    /*
    * Returnable.
    */
    return this;
}

/**
* Identifies binding.
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.toString = function() {

    return "[SourceEditorFindAndReplaceToolBarButtonBinding]";
};

/**
* @overloads {EditorToolBarBinding#onBindingAttach}
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.onBindingAttach = function() {

    SourceEditorFindAndReplaceToolBarButtonBinding.superclass.onBindingAttach.call(this);
    var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
    EditorBinding.registerComponent(this, codemirrorwindow);
};

/**
* @implements {IWysiwygEditorComponent}
* @param {CodemirrorEditorBinding} binding
* @param {Codemirror} editor
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.initializeSourceEditorComponent = function(binding, editor) {

    this._editorBinding = binding;
    this._codemirrorEditor = editor;

    var self = this;

    this._codemirrorEditor.addKeyMap({
        "Ctrl-F": function () {
            self.openDialog(self);
        }
    });

    this._codemirrorEditor.addKeyMap({
        "Cmd-F": function () {
            self.openDialog(self);
        }
    });

};

/**
* Open find and replace dialog and wait for input.
* @overwrites {ToolBarButtonBinding#onCommand}
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.oncommand = function() {
    this.openDialog(this);
};

SourceEditorFindAndReplaceToolBarButtonBinding.prototype.openDialog = function (self) {
    
    var handler = {
        handleDialogResponse: function (response, result) {
        }
    };

    var args = { editor: this._codemirrorEditor };
    Dialog.invokeModal("${root}/content/misc/editors/codemirroreditor/codemirrorfindandreplace.aspx", handler, args);
}

/**
* This has been isolated so that the contextmenu can invoke it.
* @param {string} cmd
* @param {string} gui
* @param {string} val
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype.handleCommand = function(cmd, gui, val) {

    this.oncommand();
};

/**
* @param {string} string
* @param {string} token
* @return {string}
*/
SourceEditorFindAndReplaceToolBarButtonBinding.prototype._getStartString = function(string, token) {

    var result = null;
    if (string.indexOf(token) > -1) {
        result = string.substring(0, string.indexOf(token));
    }
    return result;
};
