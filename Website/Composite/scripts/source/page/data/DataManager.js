/**
 * Accessed through instance variable "WindowManager" declared below.
 */
function _DataManager () {}
_DataManager.prototype = {
	
	/**
	 * Flip to enable Ajax style postback and update.
	 * @type {boolean}
	 */
	isPostBackFun : false,
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "DataManager [" + document.title + "]" ),
	
	/**
	 * @type {HashMap<string><IData>}
	 */
	_dataBindings : {},
	
	/**
	 * This dirty flag will be falsed by a "persist" or "save" postMessage. 
	 * If true, something was changed in this document since last postMessage.
	 * @see {PageBinding#postMessage}  
	 * @type {boolean}
	 */
	isDirty : false,
	
	/**
	 * Make binding AND DataManager dirty. 
	 * 1) The binding will remain dirty until "save" is successful (note success!) 
	 * 2) DataManager is dirty until a "save" or "persist" postMessage is attempted. 
	 * @param {DataBinding} binding
	 * @return {boolen} True if the binding switched to dirty
	 */
	dirty : function ( binding ) {
		
		this.isDirty = true;
		
		var result = false;
		if ( binding != null && !binding.isDirty ) {	
			binding.isDirty = true;
			binding.dispatchAction ( Binding.ACTION_DIRTY );
			result = true;
		}
		
		return result;
	},
	
	/**
	 * Make binding clean.
	 * @param {DataBinding} binding
	 */
	clean : function ( binding ) {
		
		if ( binding.isDirty ) {
			binding.isDirty = false;
		}
	},
	
	/**
	 * Register DataBinding. Remember that this will only happen 
	 * automatically if and when the DataBinding has a name property.
	 * @param {string} name
	 * @param {DataBinding} binding
	 */
	registerDataBinding : function ( name, binding ) {
		
		if ( Interfaces.isImplemented ( IData, binding, true )) {
			if ( this._dataBindings [ name ] != null ) {
				throw "no proper support for checkbox multiple values! " + name ;
			} else {
				this._dataBindings [ name ] = binding;
			}
		} else {
			throw "Invalid DataBinding: " + binding;
		}
	},
	
	/**
	 * Unregister DataBinding.
	 * @param {string} name
	 */
	unRegisterDataBinding : function ( name ) {
		
		if ( this._dataBindings [ name ] != null ) {
			delete this._dataBindings [ name ];
		}
	},
	
	/**
	 * Get DataBinding by name.
	 * @return {DataBinding}
	 */
	getDataBinding : function ( name ) {
		
		var result = null;
		if ( this._dataBindings [ name ] != null ) {
			result = this._dataBindings [ name ];
		}
		return result;
	},
	
	/**
	 * Get list of all DataBindings - possibly even from descendant windows.
	 * @param {boolean} isTraverse
	 * @return {List<DataBinding>}
	 */
	getAllDataBindings : function ( isTraverse ) {
		
		var list = new List ();
		for ( var name in this._dataBindings ) {
			var binding = this._dataBindings [ name ];
			list.add ( binding );
			if ( isTraverse && binding instanceof WindowBinding ) {
				var manager = binding.getContentWindow ().DataManager;
				if ( manager != null ) {
					list.merge ( manager.getAllDataBindings ());
				}
			}
		}
		return list;
	},
	
	/**
	 * Has DataBindings?
	 * @return {boolean}
	 */
	hasDataBindings : function () {
		
		var result = false;
		for ( var name in this._dataBindings ) {
			result = true;
			break;
		}
		return result;
	},
	
	/**
	 * Populate DataBindings.
	 * @param {DataBindingMap} map
	 */
	populateDataBindings : function ( map ) {
		
		if ( map instanceof DataBindingMap ) {
			map.each ( function ( name, value ) {
				var dataBinding = this._dataBindings [ name ];
				if ( dataBinding != null ) {
					switch ( map.type ) {
						case DataBindingMap.TYPE_RESULT :
							try {
								dataBinding.setResult ( value );
							} catch ( exception ) {
								if ( Application.isDeveloperMode ) {
									alert ( dataBinding );
								}
								throw exception;
							}
							break;
						case DataBindingMap.TYPE_VALUE :
							throw "Not implemented!";
					}
				}
			});
		}
	},
	
	/**
	 * Collect all DataBinding values in a single name-value hashmap.
	 * @return {HashMap<string><string>}
	 */
	getDataBindingValueMap : function () {
		
		var result = new DataBindingMap ();
		result.type = DataBindingMap.TYPE_VALUE;
		
		for ( var name in this._dataBindings ) {
			var dataBinding = this._dataBindings [ name ];
			if ( dataBinding instanceof DataDialogBinding ) {
				throw "DataDialogBinding valuemap not supported!";
			}
			result [ name ] = dataBinding.getValue ();
		}
		return result;
	},
	
	/**
	 * Collect and combine all DataBinding results in a single DataBindingMap.
	 * Notice that we call the getResult method instead of getValue. The "value"
	 * is for the serverside while the "result" is automatically typecasted 
	 * for clientside handling and/or can be set to complex objects.
	 * @return {DataBindingMap} 
	 */
	getDataBindingResultMap : function () {
		
		var result = new DataBindingMap ();
		result.type = DataBindingMap.TYPE_RESULT;
		
		for ( var name in this._dataBindings ) {
			var binding = this._dataBindings [ name ];
			var res = binding.getResult ();
			if ( res instanceof DataBindingMap ) {
				res.each ( function ( name, value ) {
					result.set ( name, value );
				});
			} else {
				result.set ( name, res );
			}
		}
		return result;
	},
	
	/**
	 * Harvest form elements to produce a humongous querystring. This will collect  
	 * all form elements, not just those produced by the DataBinding manifest method.
	 */
	getPostBackString : function () {
		
		var result = "";
		var form = document.forms [ 0 ];
		
		if ( form != null ) {
			var lastname = "";
			new List ( form.elements ).each ( function ( element ) {
				
				var name = element.name;
				var value = encodeURIComponent ( element.value );
				
				switch ( element.type ) {
					
					case "text":
					case "hidden":
					case "password":
					case "textarea":
					case "select-one" :
						result += name + "=" + value + "&";
						break;
						
					case "submit" :
						if ( document.activeElement == element ) { // or what?
							result += name + "=" + value + "&";
						}
						break;
						
					case "radio":
						if ( element.checked ) {
							result += name + "=" + value + "&";
						}
						break;
						
					case "checkbox":
						if ( element.checked ) {
							if ( element.name == lastname ) {
								if ( result.lastIndexOf ( "&" ) == result.length - 1 ) {
									result = result.substr ( 0, result.length - 1 );
								}
								result += "," + value;
							}
							else {
								result += name + "=" + element.value;
							}
							lastname = name;
							result += "&";
						}
						break;
						
				}
			});
		}
		
		return result.substr ( 0, result.length - 1 ); // trailing "&"
	}
}

/**
 * The instance that does it.
 * @type {_DataManager}
 */
var DataManager = new _DataManager ();