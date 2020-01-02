

VisualSearchAndReplace.prototype = new DialogPageBinding;
VisualSearchAndReplace.prototype.constructor = VisualSearchAndReplace;
VisualSearchAndReplace.superclass = DialogPageBinding.prototype;

function VisualSearchAndReplace() {

    //debugger;    
    this.logger = SystemLogger.getLogger("VisualSearchAndReplace");
    this._findText = null;
    this._replacementText = null;
    this._caseSensitive = null;
    this._matchWholeWord = null;
    this._editor = null;
    this._searchReplacePlugin = null;
    this._findTextBox = null;
    this._replaceTextBox = null;
    this._caseSensitiveCheckBox = null;
    this._initialized = false;    
    this._matchWholeWordCheckbox = null;    
    this._itemsFound = 0;    
}

VisualSearchAndReplace.prototype.toString = function () {
    //debugger;
    return "[VisualSearchAndReplace]";
}

/**
* @overloads {SystemTreeBinding#onBindingRegister}
*/
VisualSearchAndReplace.prototype.onBindingRegister = function () {
    VisualSearchAndReplace.superclass.onBindingRegister.call(this);
}

VisualSearchAndReplace.prototype.setPageArgument = function (arg) {
    //debugger;
    VisualSearchAndReplace.superclass.setPageArgument.call(this);

    var self = this;

    this._editor = arg.editor;
    this._searchReplacePlugin = arg.plugin;
    this._findText = "";

    var selectedText = this._editor.selection.getSel().toString();
    if (selectedText)
        this._findText = selectedText;

    this._replacementText = "";

    var map = this.bindingWindow.bindingMap;

    /*
    * Locate key players.
    */
    this._findTextBox = map.searchFor;

    self.updateMessage("");

    this._findTextBox.bindingElement.addEventListener("change", function () {
        self.updateMessage("");
        self._itemsFound = 0;
        self.setButtonStates();
    }); 

    this._replaceTextBox = map.replaceWith;

    this._caseSensitiveCheckBox = map.matchCase;
    this._matchWholeWordCheckbox = map.matchWholeWord;

    this._findTextBox.setValue(this._findText);
    this._replaceTextBox.setValue(this._replacementText);

    this._initialized = true;
    
    this.setButtonStates();
}

VisualSearchAndReplace.prototype.setButtonStates = function () {

    var map = this.bindingWindow.bindingMap;

    if (this.stateChanged() || this._itemsFound <= 0) {
        map.broadcasterFind.setDisabled(false);
        map.broadcasterReplace.setDisabled(true);
        map.broadcasterReplaceAll.setDisabled(true);
        map.broadcasterPrev.setDisabled(true);
        map.broadcasterNext.setDisabled(true);        
    }
    else  {
        map.broadcasterFind.setDisabled(false);
        map.broadcasterReplace.setDisabled(false);
        map.broadcasterReplaceAll.setDisabled(false);
        map.broadcasterPrev.setDisabled(false);
        map.broadcasterNext.setDisabled(false);
    }    
}

VisualSearchAndReplace.prototype.stateChanged = function () {
    
    return (this._findTextBox != null && this._findTextBox.getValue() != this._findText) || this.getChecked(this._caseSensitiveCheckBox) !== this._caseSensitive || this.getChecked(this._matchWholeWordCheckbox) !== this._matchWholeWord;
}

VisualSearchAndReplace.prototype.getChecked = function(control)
{
    if (control != null) {
        if (control.getValue() === true)
            return true;

        if (control.getValue() == "on")
            return true;
    }
    return false;
}

VisualSearchAndReplace.prototype.handleAction = function (action) {

    VisualSearchAndReplace.superclass.handleAction.call(this, action);

    if (action.type == ButtonBinding.ACTION_COMMAND) {

        var binding = action.target;
        var id = binding.bindingElement.id;

        this._replacementText = this._replaceTextBox.getValue();

        var foundItem = false;

        switch (id) {
            case "buttonFind":
                this.findNext();
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
            case "buttonNext":
                this.moveNext();
                action.consume();
                break;
            case "buttonPrev":
                this.movePrev();
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
VisualSearchAndReplace.prototype.handleBroadcast = function (broadcast, arg) {

    VisualSearchAndReplace.superclass.handleBroadcast.call(this, broadcast, arg);
}

VisualSearchAndReplace.prototype.findNext = function () {

    if (this.stateChanged()) {
        this.setOptionsFromUserInput();

        var result = this._searchReplacePlugin.find(this._findText, this._caseSensitive, this._matchWholeWord);

        if (result <= 0) {
            this.updateMessage(StringBundle.getString("Composite.Web.VisualEditor", "SearchAndReplace.NothingFoundMessage"));
        }
        else {
            this.updateMessage(result + " " + StringBundle.getString("Composite.Web.VisualEditor", "SearchAndReplace.ItemsWereFoundMessage"));            
        }

        this._itemsFound = result;
        this.setButtonStates();
    }
    else {
        this.moveNext();
    }
}

VisualSearchAndReplace.prototype.replaceText = function () {

    this.setOptionsFromUserInput();
    this._searchReplacePlugin.replace(this._replacementText); 
}

VisualSearchAndReplace.prototype.updateMessage = function (message) {
    var el = document.getElementById("nothingWasFound");
    if (el != null)
        el.innerHTML = message;
}


VisualSearchAndReplace.prototype.replaceAllFoundText = function () {

    this.setOptionsFromUserInput();
    this._searchReplacePlugin.replace(this._replacementText, true, true);
}

VisualSearchAndReplace.prototype.moveNext = function () {

    this.setOptionsFromUserInput();
    this._searchReplacePlugin.next();
}

VisualSearchAndReplace.prototype.movePrev = function () {

    this.setOptionsFromUserInput();
    this._searchReplacePlugin.prev();
}

VisualSearchAndReplace.prototype.setOptionsFromUserInput = function () {

    this._caseSensitive = this.getChecked(this._caseSensitiveCheckBox);
    this._matchWholeWord = this.getChecked(this._matchWholeWordCheckbox);
    this._findText = this._findTextBox.getValue();
    this._replacementText = this._replaceTextBox.getValue();
    return;
}

VisualSearchAndReplace.prototype.onBeforePageInitialize = function () {    
    VisualSearchAndReplace.superclass.onBeforePageInitialize.call(this);
}

VisualSearchAndReplace.prototype.onDeactivate = function () {
    this._searchReplacePlugin.done();
    VisualSearchAndReplace.superclass.onDeactivate.call(this);
}






