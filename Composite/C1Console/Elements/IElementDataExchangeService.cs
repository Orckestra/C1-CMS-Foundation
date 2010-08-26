using Composite.C1Console.Actions;


namespace Composite.C1Console.Elements
{
    internal interface IElementDataExchangeService : IFlowControllerService
    {
        object GetData(string name);
    }
}
