using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementActionProvider.Runtime
{
    internal sealed class ElementActionProviderFactory : NameTypeFactoryBase<IElementActionProvider>
    {
        public ElementActionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
