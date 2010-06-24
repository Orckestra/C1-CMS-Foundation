using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Elements.Plugins.ElementAttachingProvider
{
    [ConfigurationElementType(typeof(NonConfigurableElementAttachingProvider))]
    public class ElementAttachingProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
