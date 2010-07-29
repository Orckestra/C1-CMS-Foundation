using System.Collections.Generic;

using Composite.Actions;


namespace Composite.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public delegate void FormFlowEventHandler(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer);
}
