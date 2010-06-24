using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementAttachingProvider.Runtime
{
    internal sealed class ElementAttachingProviderFactory : NameTypeFactoryBase<IElementAttachingProvider>
	{
        public ElementAttachingProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
