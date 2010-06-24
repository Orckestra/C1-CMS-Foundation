SaveAllDialogPageBinding.prototype = new DialogPageBinding;
SaveAllDialogPageBinding.prototype.constructor = SaveAllDialogPageBinding;
SaveAllDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function SaveAllDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SaveAllDialogPageBinding" );
	
	/**
	 * List<string><DockTabBinding>
	 */
	this._dirtyTabs = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SaveAllDialogPageBinding.prototype.toString = function () {

	return "[SaveAllDialogPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {Map<string><DockTabBinding>} list
 */
SaveAllDialogPageBinding.prototype.setPageArgument = function ( map ) {
	
	SaveAllDialogPageBinding.superclass.setPageArgument.call ( this, map );
	this._dirtyTabs = map;
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
SaveAllDialogPageBinding.prototype.onBeforePageInitialize = function () {

	SaveAllDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	/*
	 * Sort tabs according to associated perspective.
	 */
	var perspectives = new Map ();
	this._dirtyTabs.each ( function ( key, tab ) {
		var label = tab.perspectiveNode.getLabel ();
		if ( !perspectives.has ( label )) {
			perspectives.set ( label, new List ());
		}
		perspectives.get ( label ).add ( tab );
	});
	
	/*
	 * Build fields.
	 */
	var doc = this.bindingDocument;
	var self = this;
	perspectives.each ( function ( label, list ) {
		self._buildField ( label, list );
	});
}

/**
 * @param {string} label
 * @param {List<DockTabBinding>} list
 */
SaveAllDialogPageBinding.prototype._buildField = function ( label, list ) {
	
	var doc = this.bindingDocument;
	var field = FieldBinding.newInstance ( doc );
	var desc = FieldDescBinding.newInstance ( doc );
	var data = FieldDataBinding.newInstance ( doc );
	var group = CheckBoxGroupBinding.newInstance ( doc );
	
	list.each ( function ( tab ) {
		var box = CheckBoxBinding.newInstance ( doc );
		box.setLabel ( tab.getLabel ());
		box.setResult ( tab );
		box.check ( true );
		group.add ( box );
	});
	
	desc.setLabel ( label );
	data.add ( group );
	field.add ( desc );
	field.add ( data );
	
	this.bindingWindow.bindingMap.fieldgroup.add ( field );
	field.attachRecursive ();
}