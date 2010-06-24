/**
 * Considered internal to this class.
 * @type {Map<string><VisualEditorFieldGroupConfiguration>}
 */
VisualEditorFieldGroupConfiguration._configurations = new Map ();

/**
 * Caching configurations to 
 * save a few server requests.
 * @param {string} classconfig
 * @return {VisualEditorFieldGroupConfiguration}
 */
VisualEditorFieldGroupConfiguration.getConfiguration = function ( fieldsconfig ) {
	
	var result = null;
	var configs = VisualEditorFieldGroupConfiguration._configurations;
	if ( !configs.has ( fieldsconfig )) {
		configs.set ( fieldsconfig, new VisualEditorFieldGroupConfiguration (
			EditorConfigurationService.GetEmbedableFieldGroupConfigurations ( fieldsconfig )
		));
	};
	return configs.get ( fieldsconfig );
}


/**
 * VisualEditor field config.
 * @param {object} object Provided by SOAP
 */
function VisualEditorFieldGroupConfiguration ( object ) {
	
	var groups = new Map ();
	new List ( object ).each ( function ( group ) {
		var map = new Map ();
		new List ( group.Fields ).each ( function ( field ) {
			map.set ( field.Name, {
				xhtml : field.XhtmlRepresentation,
				xml	: field.XhtmlRepresentation
			});
		});
		groups.set ( group.GroupName, map );
	});
	
	/**
	 * @type {Map<string><Map<string><object>>}
	 */
	this._groups = groups;
}

/**
 * Get field names for a group.
 * @return {List<string>}
 */
VisualEditorFieldGroupConfiguration.prototype.getGroupNames = function () {
	
	return this._groups.toList ( true );
}

/**
 * Get field names for a group.
 * @param {string} groupname
 * @return {List<string>}
 */
VisualEditorFieldGroupConfiguration.prototype.getFieldNames = function ( groupname ) {
	
	return this._groups.get ( groupname ).toList ( true );
}

/**
 * Get the VisualEditor markup for a given field.
 * @param {string} groupname
 * @param {string} fieldname
 * @return {string}
 */
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup = function ( groupname, fieldname ) {
	
	return this._groups.get ( groupname ).get ( fieldname ).xhtml;
}

/**
 * Get the sourcodeeditor markup for a given field.
 * @param {string} groupname
 * @param {string} fieldname
 * @return {string}
 */
VisualEditorFieldGroupConfiguration.prototype.getStructuredMarkup = function ( name ) {

	return this._groups.get ( groupname ).get ( fieldname ).xml;
}