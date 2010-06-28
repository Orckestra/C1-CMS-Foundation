using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.ResourceSystem.Plugins.ResourceProvider
{
    [Assembler(typeof(NonConfigurableResourceProviderAssembler))]
    [ConfigurationElementType(typeof(NonConfigurableResourceProvider))]
    internal class ResourceProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
