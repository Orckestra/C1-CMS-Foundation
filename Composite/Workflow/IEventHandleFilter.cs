using System.Collections.Generic;
using Composite.C1Console.Forms.Flows;


namespace Composite.C1Console.Workflow
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
