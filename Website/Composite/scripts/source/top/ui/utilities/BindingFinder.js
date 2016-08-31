/**
 * @class
 * Locating bindings.
 */
function _BindingFinder () {}

_BindingFinder.prototype = {

	/**
	 * Get descendant bindings by nodename.
	 * @param {Binding} source
	 * @param {string} nodeName
 	 * @param {boolean} isChildrenOnly If set to true, return only children (not all descendants).
 	 * @return {List<Binding>}
	 */
	getDescendantBindingsByLocalName : function ( source, nodeName, isChildrenOnly ) {

		var result = null;
		if ( source.isAttached ) {
			result = new List ();
			var elements = isChildrenOnly ?
				 source.getChildElementsByLocalName ( nodeName ) :
				 source.getDescendantElementsByLocalName ( nodeName );
			elements.each ( function ( element ) {
				var binding = UserInterface.getBinding ( element );
				if ( binding ) {
					result.add ( binding );
				}
			});
		} else {
			var ouch = "Could not resolve descendants of unattached binding " + source.toString ();
			if ( Application.isDeveloperMode ) {
				throw ouch;
			}
		}
		return result;
	},

	/**
	 * Get ancestor binding by type.
	 * @param {Binding} source
	 * @param {Class} impl
	 * @param {boolean} isTraverse If set to true, cross iframe boundaries.
 	 * @return {Binding}
	 */
	getAncestorBindingByType : function ( source, impl, isTraverse ) {

		var result = null;
		if ( Binding.exists ( source )) {
			var node = source.bindingElement;
			while ( result == null && node != null ) {
				node = node.parentNode;
				if ( node != null ) {
					if ( UserInterface.hasBinding ( node )) {
						var binding = UserInterface.getBinding ( node );
						if ( binding instanceof impl ) {
							result = binding;
						}
					} else if ( isTraverse && node.nodeType == Node.DOCUMENT_NODE ) {
						var win = DOMUtil.getParentWindow ( node );
						if ( win != null ) {
							node = win.frameElement;
						} else {
							SystemDebug.stack ( arguments );
							break;
						}
					}
				}
			}
		}
		return result;
	},

	/**
	 * Get ancestor binding by nodename.
	 * @param {Binding} source
	 * @param {string} nodename
	 * @param {boolean} isTraverse If set to true, cross iframe boundaries.
	 * @return {Binding}
	 */
	getAncestorBindingByLocalName : function ( source, nodeName, isTraverse ) {

		var result = null;
		if ( nodeName == "*" ) {
			var node = source.bindingElement;
			while ( !result && ( node = node.parentNode ) != null ) {
				if ( UserInterface.hasBinding ( node )) {
					result = UserInterface.getBinding ( node );
				}
			}
		} else {
			result = UserInterface.getBinding (
				DOMUtil.getAncestorByLocalName ( nodeName, source.bindingElement, isTraverse )
			);
		}
		return result;
	},

	/**
	 * Get child elements by nodename.
	 * @param {Binding} source
	 * @param {string} nodeName
	 * @return {List<DOMElement>}
	 */
	getChildElementsByLocalName : function ( source, nodeName ) {

		var result = new List ();
		var children = new List ( source.bindingElement.childNodes );
		children.each ( function ( child ) {
			if ( child.nodeType == Node.ELEMENT_NODE ) {
				if ( nodeName == "*" || DOMUtil.getLocalName ( child ) == nodeName ) {
					result.add ( child );
				}
			}
		});
		return result;
	},

	/**
	 * Get the FIRST child binding of a specified type.
	 * @param {Binding} source
	 * @param {Class} impl
	 * @return {Binding}
	 */
	getChildBindingByType : function ( source, impl ) {

		var result = null;
		source.getChildElementsByLocalName ( "*" ).each (
			function ( child ) {
				var binding = UserInterface.getBinding ( child );
				if ( binding != null && binding instanceof impl ) {
					result = binding;
					return false;
				} else {
					return true;
				}
			}
		);
		return result;
	},

	/**
	 * Get the FIRST decendant binding of a specified type.
	 * TODO: Merge with getChildBindingByType.
	 * @param {Binding} source
	 * @param {Class} impl
	 * @return {Binding}
	 */
	getDescendantBindingByType : function ( source, impl ) {

		var result = null;
		source.getDescendantElementsByLocalName ( "*" ).each (
			function ( child ) {
				var binding = UserInterface.getBinding ( child );
				if ( binding != null && binding instanceof impl ) {
					result = binding;
					return false;
				} else {
					return true;
				}
			}
		);
		return result;
	},

	/**
	 * Get ALL decendant binding of a specified type.
	 * @param {Binding} source
	 * @param {Class} impl
	 * @return {List<Binding>}
	 */
	getDescendantBindingsByType : function ( source, impl, isTraverse ) {

		var result = new List ();
		source.getDescendantElementsByLocalName ( "*" ).each (
			function ( descendant ) {
				var binding = UserInterface.getBinding ( descendant );
				if ( binding != null && binding instanceof impl ) {
					result.add ( binding );
				} else if( isTraverse  && binding instanceof WindowBinding && binding.getRootBinding()) {
					this.getDescendantBindingsByType( binding.getRootBinding(), impl, isTraverse)
					.each(function (item){
						result.add(item);
					});
				}
				return true;
			}
		, this);
		return result;
	},

	/**
	 * Get next binding by name.
	 * @param {Binding} binding
	 * @param {string} name
	 * @return {Binding}
	 */
	getNextBindingByLocalName : function ( binding, name ) {

		var result = null;
		var element = binding.bindingElement;
		while (( element = DOMUtil.getNextElementSibling ( element )) != null && DOMUtil.getLocalName ( element ) != name ) {}
		if ( element != null ) {
			result = UserInterface.getBinding ( element );
		}
		return result;
	},

	/**
	 * Get previous binding by name.
	 * @param {Binding} binding
	 * @param {string} name
	 * @return {Binding}
	 */
	getPreviousBindingByLocalName : function ( binding, name ) {

		var result = null;
		var element = binding.bindingElement;
		while (( element = DOMUtil.getPreviousElementSibling ( element )) != null && DOMUtil.getLocalName ( element ) != name ) {}
		if ( element != null ) {
			result = UserInterface.getBinding ( element );
		}
		return result;
	}
};

/**
 * The instance that does it.
 * @type {_BindingFinder}
 */
var BindingFinder = new _BindingFinder ();
