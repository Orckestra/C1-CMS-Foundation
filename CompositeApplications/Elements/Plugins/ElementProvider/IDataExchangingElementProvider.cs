

namespace Composite.Elements.Plugins.ElementProvider
{
    internal interface IDataExchangingElementProvider : IHooklessElementProvider
    {
        object GetData(string name);
    }
}
