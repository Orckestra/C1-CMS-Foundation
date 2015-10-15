ProgressBarBinding.prototype = new Binding;
ProgressBarBinding.prototype.constructor = ProgressBarBinding;
ProgressBarBinding.superclass = Binding.prototype;

ProgressBarBinding.WIDTH = 190;
ProgressBarBinding.NOTCH = 9;

/**
 * Considered private.
 * @type {ProgressBarBinding}
 */
ProgressBarBinding._bindingInstance = null;

/**
 * Notch progress.
 * @param {int} notches
 */
ProgressBarBinding.notch = function ( notches ) {
	
	var bar = ProgressBarBinding._bindingInstance;
	if ( bar != null ) {
		bar.notch ( notches );
	}
}

/**
 * Reload progress - start from begin
 */
ProgressBarBinding.reload = function () {
	ProgressBarBinding._bindingInstance._cover.setWidth(ProgressBarBinding.WIDTH);
}

/**
 * @class
 * This is actually quite a fake progressbar, used only on app initialization.
 */
function ProgressBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ProgressBarBinding" );
	
	/**
	 * @type {CoverBinding}
	 */
	this._cover = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ProgressBarBinding.prototype.toString = function () {
	
	return "[ProgressBarBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ProgressBarBinding.prototype.onBindingAttach = function () {
	
	ProgressBarBinding.superclass.onBindingAttach.call ( this );
	
	ProgressBarBinding._bindingInstance = this;
	
	this._cover = this.add ( CoverBinding.newInstance ( this.bindingDocument ));
	this._cover.setBusy ( false );
	this._cover.setWidth ( ProgressBarBinding.WIDTH );
	this.shadowTree.cover = this._cover;
}

/**
 * Notch progress. Defaults to a single notch if no argument is supplied.
 * @param {int} notches
 */
ProgressBarBinding.prototype.notch = function ( notches ) {
	
	notches = notches ? notches : 1;
	var width = this._cover.getWidth () - ( ProgressBarBinding.NOTCH * notches );
	this._cover.setWidth ( width >= 0 ? width : 0 );
}

