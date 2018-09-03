

CodemirrorFindAndReplace.prototype = new DialogPageBinding;
CodemirrorFindAndReplace.prototype.constructor = CodemirrorFindAndReplace;
CodemirrorFindAndReplace.superclass = DialogPageBinding.prototype;


function CodemirrorFindAndReplace() {
        
    this._cursor = null;
    this.logger = SystemLogger.getLogger("CodemirrorFindAndReplace");
    this._findText = null;
    this._replacementText = null;
    this._caseSensitive = null;
    this._matchWholeWord = null;
    this._editor = null;
    this._findTextBox = null;
    this._replaceTextBox = null;
    this._caseSensitiveCheckbox = null;
    this._initialized = false;
    this._textPosition = null;
    this._matchWholeWordCheckbox = null;
}

CodemirrorFindAndReplace.prototype.toString = function () {    
    return "[CodemirrorFindAndReplace]";
}

CodemirrorFindAndReplace.prototype.onBindingRegister = function () {
    CodemirrorFindAndReplace.superclass.onBindingRegister.call(this);
}

CodemirrorFindAndReplace.prototype.setPageArgument = function (arg) {

    CodemirrorFindAndReplace.superclass.setPageArgument.call(this);

    this._editor = arg.editor;
    this._findText = this._editor.getSelection();
    this._replacementText = "";

    var map = this.bindingWindow.bindingMap;

    /*
    * Locate key players.
    */
    this._findTextBox = map.searchFor;
    this._replaceTextBox = map.replaceWith;
    this._caseSensitiveCheckbox = map.matchCase;
    this._matchWholeWordCheckbox = map.matchWholeWord;


    if (!(app.FindAndReplaceOverride == undefined) && app.FindAndReplaceOverride.hasData()) {
        this._findTextBox.setValue(app.FindAndReplaceOverride.findText);
        this._replaceTextBox.setValue(app.FindAndReplaceOverride.replaceText);

        if (app.FindAndReplaceOverride.matchCase)
            this._caseSensitiveCheckbox.check(app.FindAndReplaceOverride.matchCase);

        if (app.FindAndReplaceOverride.matchWholeWord)
            this._matchWholeWordCheckbox.check(app.FindAndReplaceOverride.matchWholeWord);
    }
    else {
        this._findTextBox.setValue(this._findText);
        this._replaceTextBox.setValue(this._replacementText);
    }

    this._initialized = true;
    map.broadcasterReplace.setDisabled(true);
    map.broadcasterReplaceAll.setDisabled(true);
}

CodemirrorFindAndReplace.prototype.getChecked = function (control) {
    if (control != null) {
        if (control.getValue() === true)
            return true;

        if (control.getValue() == "on")
            return true;
    }
    return false;
}

CodemirrorFindAndReplace.prototype.stateChanged = function () {
        
    return (this._findTextBox != null && this._findTextBox.getValue() != this._findText)
        || this._cursor == null
        || this.getChecked(this._caseSensitiveCheckbox) !== this._caseSensitive
        || this.getChecked(this._matchWholeWordCheckbox) !== this._matchWholeWord
        || this._cursor.to() != this._textPosition;

}

CodemirrorFindAndReplace.prototype.handleAction = function (action) {

    CodemirrorFindAndReplace.superclass.handleAction.call(this, action);

    if (action.type == ButtonBinding.ACTION_COMMAND) {

        var binding = action.target;
        var id = binding.bindingElement.id;

        this._replacementText = this._replaceTextBox.getValue();

        var foundItem = false;

        switch (id) {
            case "buttonFindNext":
                this.findNextText();
                action.consume();
                break;
            case "buttonReplace":
                this.replaceText();
                action.consume();
                break;
            case "buttonReplaceAll":
                this.replaceAllFoundText();
                action.consume();
                break;
        }
    }
}

/**
* Implements {IBroadcastListener}
* @param {string} broadcast
* @param {object} arg
*/
CodemirrorFindAndReplace.prototype.handleBroadcast = function (broadcast, arg) {

    CodemirrorFindAndReplace.superclass.handleBroadcast.call(this, broadcast, arg);
}

CodemirrorFindAndReplace.prototype.findNextText = function () {

    if (this.stateChanged()) {

        this.setOptionsFromUserInput();

        this._cursor = this._editor.getSearchCursor(this._findText, this._textPosition, this._caseSensitive);
    }

    var map = this.bindingWindow.bindingMap;
    var foundItem = this._cursor.findNext();
    if (foundItem) {

        this._editor.setSelection(this._cursor.from(), this._cursor.to());
        map.broadcasterReplace.setDisabled(false);
        map.broadcasterReplaceAll.setDisabled(false);
        this._textPosition = this._cursor.to()

    }
    else {
        this._textPosition = false;
        map.broadcasterReplace.setDisabled(true);
        map.broadcasterReplaceAll.setDisabled(true);
    }

}

CodemirrorFindAndReplace.prototype.replaceText = function () {
    this._cursor.replace(this._replacementText);
    this.findNextText();
    this._textPosition = this._cursor.to();
}


CodemirrorFindAndReplace.prototype.replaceAllFoundText = function () {

    this.setOptionsFromUserInput();

    var infiniteGuard = 0;
    this._cursor = this._editor.getSearchCursor(this._findText, false, this._caseSensitive);
    while (this._cursor.findNext() && infiniteGuard <= 200) {        
        var newStart = this._cursor.to();
        this._cursor.replace(this._replacementText);
        newStart.character = newStart.character + this._replacementText.length;
        this._cursor = this._editor.getSearchCursor(this._findText, newStart, this._caseSensitive);
        infiniteGuard = infiniteGuard + 1;
    }

    if (infiniteGuard >= 200)
        alert("Error: Too many iterations occurred in the replaceAllFoundText method of CodemirrorFindAndReplace");

}

CodemirrorFindAndReplace.prototype.setOptionsFromUserInput = function () {

    if (this._textPosition == null)
        this._textPosition = this._editor.getCursor();

    this._caseSensitive = this.getChecked(this._caseSensitiveCheckbox);
    this._matchWholeWord = this.getChecked(this._matchWholeWordCheckbox);

    if (this._matchWholeWord == true) {
        this._findText = new RegExp("\\b" + this._findTextBox.getValue() + "\\b", this._caseSensitive ? "" : "i");
    }
    else {
        this._findText = new RegExp(this._findTextBox.getValue(), this._caseSensitive ? "" : "i");
    }

    return;
}

function _CodemirrorFindAndReplace() { }

_CodemirrorFindAndReplace.prototype = {
    findText: "",
    replaceText: "",
    matchCase: false,
    matchWholeWord: false,
    hasData: function () {
        return this.findText !== "" || this.replaceText !== "";
    }
}




