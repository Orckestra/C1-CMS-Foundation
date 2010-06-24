FunctionTreeBinding.prototype = new TreeBinding;
FunctionTreeBinding.prototype.constructor = TreeBinding;
FunctionTreeBinding.superclass = TreeBinding.prototype;

/**
 * @type {ToolBarButtonBinding}
 */
FunctionTreeBinding.addNew = function ( binding ) {
    
    var def = ViewDefinitions [ "Composite.Management.WidgetFunctionSelectorDialog" ];
    
    def.argument.nodes [ 0 ].search = binding.getProperty("SerializedFunctionSearchToken");
    
    def.handler = {
        handleDialogResponse : function ( response, result ) {
            if ( response == Dialog.RESPONSE_ACCEPT ) {
                var input = document.getElementById ( binding.getProperty ( "AddNewPostBackArgsId" ));
                input.value = result.getFirst ();
                
                setTimeout ( function () {
                    binding.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
                }, 0 );
            }
        }
    }

    Dialog.invokeDefinition ( def );
}

/**
 * @class
 */
function FunctionTreeBinding () {

	/**
	 * @type {SystemLogger}
	 */
	 
	this.logger = SystemLogger.getLogger ( "FunctionTreeBinding" );
	
	/**
	 * @type {SystemTreeNodeBinding}
	 */
	this._defaultTreeNode = null;
}

/**
 * Identifies binding.
 */
FunctionTreeBinding.prototype.toString = function () {
	
	return "[FunctionTreeBinding]";
}

/**
 * TEMP!
 */
FunctionTreeBinding.prototype.onBindingAttach = function () {
	
	FunctionTreeBinding.superclass.onBindingAttach.call ( this );
	// alert ( "Hej Maw!\n\nKan du fixe det sådan at Query-noden er focused som default?\n\nEllers fjerner jeg ikke alerten." );
}

FunctionTreeBinding.prototype.handleAction = function ( action ) {
    
    switch ( action.type ) {
    
        case TreeNodeBinding.ACTION_ONFOCUS :
        
            var binding = action.target;
            var bindingHandle = binding.getHandle ();
            
            var input = document.getElementById ( this.getProperty ( "FunctionTreePostBackHandle" ));
            var previousHandle = input.value;
            
            if ( previousHandle != bindingHandle )
            {
                input.value = bindingHandle;

                var treeNodeType = ( bindingHandle.indexOf(":")>-1 ? bindingHandle.split(':')[0] : "" ) ;
                
                switch (treeNodeType)
                {
                    case "Function":
                        bindingMap.broadcasterFunctionTreeHasSelection.enable ();
                        binding.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
                        break;
                    case "Namespace":
                        bindingMap.broadcasterFunctionTreeHasSelection.enable ();
                        binding.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
                        break;
                    case "Parameter":
                        bindingMap.broadcasterFunctionTreeHasSelection.disable ();
                        binding.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
                        break;
                    default:
                        bindingMap.broadcasterFunctionTreeHasSelection.disable ();
                }
                
            }
            
            break;
    }
    
    FunctionTreeBinding.superclass.handleAction.call ( this, action );
}
