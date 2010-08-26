using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime
{
    internal sealed class ElementAttachingProviderFactory : NameTypeFactoryBase<IElementAttachingProvider>
	{
        public ElementAttachingProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
