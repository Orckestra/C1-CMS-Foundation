using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider.Runtime
{
#pragma warning disable 612

    internal sealed class ElementProviderFactory : NameTypeFactoryBase<IElementProvider>
    {
        public ElementProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }

#pragma warning restore 612
}
