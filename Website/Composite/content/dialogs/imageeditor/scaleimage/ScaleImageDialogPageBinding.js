ScaleImageDialogPageBinding.prototype = new DialogPageBinding;
ScaleImageDialogPageBinding.prototype.constructor = ScaleImageDialogPageBinding;
ScaleImageDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function ScaleImageDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ScaleImageDialogPageBinding" );
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
ScaleImageDialogPageBinding.prototype.onBeforePageInitialize = function () {

	var arg = this.pageArgument;

	var ratio = arg.width / arg.height;
	var isFixedRatio = true;
	
	bindingMap.width.setValue ( arg.width );
	bindingMap.height.setValue ( arg.height );
	
	/*
	 * Dimensions.
	 */
	bindingMap.dimensions.onValueChange = function () {
		isFixedRatio = this.getValue () == "fixed";
		bindingMap.width.onValueChange ();
	}
	
	/*
	 * Unit.
	 */
	bindingMap.unit.onValueChange = function () {
		switch ( this.getValue ()) {
			case "pixels" :
				bindingMap.width.setValue ( arg.width );
				bindingMap.height.setValue ( arg.height );	
				break;
			case "percent" :
				bindingMap.width.setValue ( "100" );
				bindingMap.height.setValue ( "100" );	
				break;
		}
	}
	
	/*
	 * Width.
	 */
	bindingMap.width.onValueChange = function () {
		if ( isFixedRatio ) {
			var val = this.getValue ();
			if ( bindingMap.unit.getValue () ==  "pixels" ) {
				val = Math.round ( val / ratio )
			}
			bindingMap.height.setValue ( val );
		}
	}
	
	/*
	 * Height.
	 */
	bindingMap.height.onValueChange = function () {
		if ( isFixedRatio ) {
			bindingMap.width.setValue ( 
				Math.round ( this.getValue () * ratio )
			);
		}
	}
	
	// superduper
	ScaleImageDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Set result on dialog accept.
 * @overloads {DialogPageBinding#onDialogAccept}
 */
ScaleImageDialogPageBinding.prototype.onDialogAccept = function () {
	
	var width = bindingMap.width.getResult ();
	var height = bindingMap.height.getResult ();
	
	this.result = {
		unit : bindingMap.unit.getValue () == "percent" ? "%" : "px",
		width : width,
		height : height
	}
	
	ScaleImageDialogPageBinding.superclass.onDialogAccept.call ( this );
}
