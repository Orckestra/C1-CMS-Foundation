using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementActionProvider.Runtime
{
    internal sealed class ElementActionProviderFactory : NameTypeFactoryBase<IElementActionProvider>
    {
        public ElementActionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
