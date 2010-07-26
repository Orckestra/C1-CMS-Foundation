using Composite.Actions;


namespace Composite.Elements
{
    internal interface IElementDataExchangeService : IFlowControllerService
    {
        object GetData(string name);
    }
}
