using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider
{
    [ConfigurationElementType(typeof(NonConfigurableIOProvider))]
    public class IOProviderData: NameTypeManagerTypeConfigurationElement
	{
	}
}
