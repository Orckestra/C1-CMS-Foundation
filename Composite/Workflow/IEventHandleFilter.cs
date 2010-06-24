using System.Collections.Generic;
using Composite.Forms.Flows;


namespace Composite.Workflow
{
	public interface IEventHandleFilter
    {
        void Filter(Dictionary<IFormEventIdentifier, FormFlowEventHandler> eventHandlers);
    }
}
