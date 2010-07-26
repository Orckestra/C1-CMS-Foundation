

namespace Composite.Actions
{
    internal abstract class FlowUiDefinitionBase : IFlowUiDefinition
    {
        public abstract IFlowUiContainerType UiContainerType { get; protected set;  }
    }
}
