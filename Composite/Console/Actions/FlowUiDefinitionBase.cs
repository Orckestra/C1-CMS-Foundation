

namespace Composite.C1Console.Actions
{
    internal abstract class FlowUiDefinitionBase : IFlowUiDefinition
    {
        public abstract IFlowUiContainerType UiContainerType { get; protected set;  }
    }
}
