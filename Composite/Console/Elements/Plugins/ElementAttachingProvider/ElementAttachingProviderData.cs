using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider
{
    [ConfigurationElementType(typeof(NonConfigurableElementAttachingProvider))]
    internal class ElementAttachingProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
