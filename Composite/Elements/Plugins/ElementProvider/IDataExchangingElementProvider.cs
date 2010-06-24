

namespace Composite.Elements.Plugins.ElementProvider
{
    public interface IDataExchangingElementProvider : IHooklessElementProvider
    {
        object GetData(string name);
    }
}
