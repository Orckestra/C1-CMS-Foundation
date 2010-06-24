

namespace Composite.Actions
{
    public abstract class FlowUiDefinitionBase : IFlowUiDefinition
    {
        public abstract IFlowUiContainerType UiContainerType { get; protected set;  }
    }
}
