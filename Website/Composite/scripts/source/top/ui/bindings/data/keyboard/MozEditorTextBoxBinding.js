MozEditorTextBoxBinding.prototype = new EditorTextBoxBinding;
MozEditorTextBoxBinding.prototype.constructor = MozEditorTextBoxBinding;
MozEditorTextBoxBinding.superclass = EditorTextBoxBinding.prototype;

/**
 * Tab indent, tab preservation, no soft text wrap.
 * @class
 */
function MozEditorTextBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MozEditorTextBoxBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MozEditorTextBoxBinding.prototype.toString = function () {
	
	return "[MozEditorTextBoxBinding]";
}

/**
 * Handle TAB key.
 * @param {boolean} isReverse
 */
MozEditorTextBoxBinding.prototype._handleTabKey = function ( isReverse ) {
	
	var lastx;
	var lasty;
	var oss;
	var osy;
	var i;
	var fnd;
	var selectedText = this._getSelectedText ();
	var el = this.shadowTree.input;
	
	lastx = el.scrollLeft;
	lasty = el.scrollTop;
	
	if (!selectedText.match(/\n/)) {
		oss = el.selectionStart;
		el.value = el.value.substr(0, el.selectionStart) + "\t" + el.value.substr(el.selectionEnd);
		el.selectionStart = oss + 1;
		el.selectionEnd = oss + 1;
	} else {
		oss = el.selectionStart;
		osy = el.selectionEnd;
		fnd = 0;
		for (i = oss - 1; i >= 0; i --) {
			if (el.value.charAt(i) == "\n") {
				oss = i + 1;
				fnd = 1;
				break;
			}
		} if (fnd == 0) {
			oss = 0;
		}
		fnd = 0;
		for (i = osy; i < el.value.length; i ++) {
			if (el.value.charAt(i) == "\n") {
				osy = i;
				fnd = 1;
				break;
			}
		} if (fnd == 0) {
			osy = el.value.length;
		}
		el.selectionStart = oss;
		el.selectionEnd = osy;
		selectedText = this._getSelectedText ();
		
		if ( isReverse ) {
			ntext = selectedText.replace( /^(\s)/mg, "" );
		} else {
			ntext = selectedText.replace( /^(.)/mg, "\t$1" );
		}
		el.value = el.value.substr(0, el.selectionStart) + ntext + el.value.substr(el.selectionEnd);
		el.selectionStart = oss;
		el.selectionEnd = osy + (ntext.length - selectedText.length);
	}
	el.scrollLeft = lastx;
	el.scrollTop  = lasty;		
}

/**
 * Handle ENTER key.
 */
MozEditorTextBoxBinding.prototype._handleEnterKey = function () {
	
	var lastx;
	var lasty;
	var oss;
	var osy;
	var el = this.shadowTree.input;

	lastx = el.scrollLeft;
	lasty = el.scrollTop;
	oss = el.selectionStart;
	osy = el.selectionEnd;
	var bfs = el.value.substr(0, el.selectionStart);
	var bfsm = bfs.split(/\r|\n/g);

	var spm = bfsm[bfsm.length - 1].match(/^(\s)*/);
	el.value = el.value.substr(0, el.selectionStart) + "\n" + spm[0] + el.value.substr(el.selectionEnd);
	el.selectionStart = oss + 1 + spm[0].length;
	el.selectionEnd = oss + 1 + spm[0].length;
	
	el.scrollLeft = lastx;
	el.scrollTop  = lasty;
}

/**
 * Get selected text.
 * @return {string}
 */
MozEditorTextBoxBinding.prototype._getSelectedText = function () {
	
	var value 	= this.shadowTree.input.value;
	var start 	= this.shadowTree.input.selectionStart;
	var end 	= this.shadowTree.input.selectionEnd;
	
	return value.substr ( start, end - start );
}