var TreeTest = new function () {
	
	var logger = SystemLogger.getLogger ( "TreeTest" );
	
	var treenodeHTML = '<ui:treenode xmlns:ui="http://www.w3.org/1999/xhtml" key="key7700348098982728" id="key7700348098982728" label="TreeNode 0" image="${root}/images/icons/harmony/composite/default_16.png"><ui:labelbox key="key37870853414305583" id="key37870853414305583" label="TreeNode 0" class="both" image="${root}/images/icons/harmony/composite/default_16.png"><ui:labelbody style="background-image: url(/website/Composite/images/icons/harmony/composite/default_16.png);"><ui:labeltext>${labeltext}</ui:labeltext></ui:labelbody></ui:labelbox></ui:treenode>';
	
	/**
	 * Certified tree API.
	 */
	this.testAPI = function () {
		
		var tree = window.bindingMap.testtree;
		var max = bindingMap.selector.getResult ();
		
		var t1 = new Date ();
		Application.lock ( TreeTest );
		
		setTimeout ( function () {
		
			var i = -1; 
			while ( ++i <= max ) {
				var node = TreeNodeBinding.newInstance ( document );
				node.setLabel ( "TreeNode " + i );
				tree.add ( node );
				node.attach ();
			}
			
			var t2 = new Date ();
			logger.debug ( "Time in seconds: Objects and HTML using API: " + ( t2.getSeconds () - t1.getSeconds ()));
			Application.unlock ( TreeTest );
		}, 0 );
	}
	
	/**
	 * Pure html injection.
	 */
	this.testHTML = function () {
		
		var tree = window.bindingMap.testtree;
		var max = bindingMap.selector.getResult ();
		
		var t1 = new Date ();
		Application.lock ( TreeTest );
		
		var string = "";
		var i = -1; 
		while ( ++i <= max ) {
			string += treenodeHTML.replace ( "${labeltext}", "TreeNode " + i );	
		}
		
		setTimeout ( function () {
			tree._treeBodyBinding.bindingElement.innerHTML = string;
			var t2 = new Date ();
			logger.debug ( "Time in seconds: Pure HTML, no objects: " + ( t2.getSeconds () - t1.getSeconds ()));
			Application.unlock ( TreeTest );
		},0 );
	}
	
	var bindings = null;
	
	/**
	 * Create binding objects only (no screen update).
	 */
	this.constructBindings = function () {
		
		var max = bindingMap.selector.getResult ();
		var t1 = new Date ();
		Application.lock ( TreeTest );
		
		bindings = new List ();
		
		setTimeout ( function () {
			var i = -1; 
			while ( ++i <= max ) {
				var treenode = LabelBinding.newInstance ( document );
				treenode.setLabel ( "TreeNode " + i );
				bindings.add ( treenode );
			}
			var t2 = new Date ();
			logger.debug ( "Time in seconds: Only objects, no HTML : " + ( t2.getSeconds () - t1.getSeconds ()));
			Application.unlock ( TreeTest );
		}, 0 );
	}
	
	/**
	 * Destroy created bindings.
	 */
	this.destructBindings = function () {
		
		if ( bindings ) {
			bindings.each ( function ( binding ) {
				binding.dispose ( true );
			});
			bindings = null;
		} else {
			alert ( "First create them!" );
		}
	}
	
	this.attachBindings = function () {
		
		var tree = window.bindingMap.testtree;
		
		if ( bindings ) {
			var div = DOMUtil.createElementNS ( Constants.NS_XHTML, "div", document );
			bindings.each ( function ( binding ) {
				div.appendChild ( binding.bindingElement );
			});
			tree._treeBodyBinding.bindingElement.appendChild ( div );
			DocumentManager.attachBindings ( div );
		} else {
			alert ( "First create them!" );
		}
	}
	
	this.detachBindings = function () {
		
		var tree = window.bindingMap.testtree;
		
		if ( bindings ) {
			bindings.each ( function ( binding ) {
				binding.dispose ();
			});
			bindings = null;
		}
	}
	
}