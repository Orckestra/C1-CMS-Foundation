using Composite.Actions;


namespace Composite.Elements
{
    public interface IElementDataExchangeService : IFlowControllerService
    {
        object GetData(string name);
    }
}
