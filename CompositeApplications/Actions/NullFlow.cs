using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Composite.Actions
{
    [FlowController(typeof(NullFlowController))]
    internal class NullFlowToken : FlowToken
    {
        public static FlowToken Deserialize(string serialized)
        {
            return new NullFlowToken();
        }
    }

    internal class NullFlowController : IFlowController
    {
        public FlowControllerServicesContainer ServicesContainer
        {
            set { }
        }

        public IFlowUiDefinition GetCurrentUiDefinition(FlowToken flowToken)
        {
            return new NullFlowUiDefinition();
        }


        public void CancelFlow(FlowToken flowToken)
        {            
        }
    }

    internal class NullFlowUiDefinition : FlowUiDefinitionBase
    {
        public NullFlowUiDefinition() 
        { 
            this.UiContainerType = StandardUiContainerTypes.Null; 
        }

        public override IFlowUiContainerType UiContainerType { get; protected set;  }
    }

}
