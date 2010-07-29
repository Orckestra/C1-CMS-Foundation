using System.Collections.Generic;
using Composite.Forms.Flows;


namespace Composite.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IEventHandleFilter
    {
        void Filter(Dictionary<IFormEventIdentifier, FormFlowEventHandler> eventHandlers);
    }
}
