using System.Collections.Generic;

using Composite.Actions;


namespace Composite.Forms.Flows
{
    public delegate void FormFlowEventHandler(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer);
}
