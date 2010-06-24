StageStatusBarBinding.prototype = new ToolBarBinding;
StageStatusBarBinding.prototype.constructor = StageStatusBarBinding;
StageStatusBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 */
function StageStatusBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageStatusBarBinding" );
	
	/**
	 * @type {ToolBarLabelBinding}
	 */
	this._label = null;
}

/**
 * Identifies binding.
 */
StageStatusBarBinding.prototype.toString = function () {
	
	return "[StageStatusBarBinding]";
}

/**
 * Initialize top level StatusBar object when ready.
 * @overloads {Binding#onBindingInitialize} binding
 */
StageStatusBarBinding.prototype.onBindingInitialize = function () {
	
	this._label = this.bindingWindow.bindingMap.statusbarlabel;
	StatusBar.initialize ( this );
	StageStatusBarBinding.superclass.onBindingInitialize.call ( this );
}

/**
 * Set statusbar text.
 * @param {string} message
 */
StageStatusBarBinding.prototype.setLabel = function ( message ) {
	
	this._label.setLabel ( message );
}

/**
 * Set statusbar image.
 * @param {string} image
 */
StageStatusBarBinding.prototype.setImage = function ( image ) {
	
	this._label.setImage ( image );
}

/**
 * Clear statusbar.
 * @param {string} image
 */
StageStatusBarBinding.prototype.clear = function () {
	
	this._label.setLabel ( null );
	this._label.setImage ( false );
}

/**
 * Fade out after a given amount of time. 
 * TODO: IMPLEMENT THIS!
 * @param {int} timeout
 */
StageStatusBarBinding.prototype.startFadeOut = function ( timeout ) {
	
	this.logger.debug ( "START FADEOUT" );
}