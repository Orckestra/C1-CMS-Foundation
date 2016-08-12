ErrorBinding.prototype = new Binding;
ErrorBinding.prototype.constructor = ErrorBinding;
ErrorBinding.superclass = Binding.prototype;

ErrorBinding.ACTION_INITIALIZE = "error initialize";

/**
 * Display error in BalloonBinding somewhere near a DataBinding.
 * @param {object} error A simple object with one property "text" (for now).
 * @param {IData} binding
 */
ErrorBinding.presentError = function ( error, binding ) {

	if ( Interfaces.isImplemented ( IData, binding ) == true ) {

		/*
		 * Analyze environment in order to determine whether or not we are
		 * in a dialog, in which case another BalloonSetBinding is used.
		 * TODO: refactor with getAncestorBindingByType ( xxx, true )???
		 */
		var isDialog, action = binding.dispatchAction ( ErrorBinding.ACTION_INITIALIZE );
		if ( action && action.isConsumed ) {
			switch ( action.listener.constructor ) {
				case StageBinding :
					isDialog = false;
					break;
				case StageDialogBinding :
					isDialog = true;
					break;
			}
		}
		var balloonset = isDialog ?
			top.app.bindingMap.dialogballoonset :
			top.app.bindingMap.balloonset;

		var balloon = null;

		balloonset.getDescendantBindingsByType(BalloonBinding).each(function (balloonBinding) {
			if (balloonBinding.isSnapTo(binding)) {
				balloon = balloonBinding;
				return false;
			}
			return true;
		}, this);

		if (balloon != null) {
			balloon.setLabel(error.text);
		} else {
			balloon = balloonset.add(
				BalloonBinding.newInstance(top.app.document)
			);
			balloon.setLabel(error.text);
			balloon.snapTo(binding);
			balloon.attach();
		}
	}
}

/**
 * @class
 */
function ErrorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ErrorBinding" );

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ErrorBinding.prototype.toString = function () {

	return "[ErrorBinding]";
}

/**
 * Notice that the binding disposes as soon as it attaches.
 * @overloads {Binding#onBindingAttach}
 */
ErrorBinding.prototype.onBindingAttach = function () {

	ErrorBinding.superclass.onBindingAttach.call ( this );

	var dataManager = this.bindingWindow.DataManager;
	var text = this.getProperty ( "text" );
	var name = this.getProperty ( "targetname" );

	var binding = dataManager.getDataBinding ( name );
	if ( binding ) {
		ErrorBinding.presentError ({
			text : text
		}, binding );
	} else if (window.console) {
		console.error ( "ErrorBinding dysfunction: No such DataBinding!\n" + name );
		if ( name.indexOf ( "_" ) >-1 ) {
			console.error ( "Name contains '_' - replace with '$' ?" );
		}
	}
	this.dispose ();
}
