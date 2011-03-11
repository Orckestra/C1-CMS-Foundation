using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Use this to make custom configuration of an <see cref="IIOProvider"/> implementation.
    /// </summary>
    [ConfigurationElementType(typeof(NonConfigurableIOProvider))]
    public class IOProviderData: NameTypeManagerTypeConfigurationElement
	{
	}
}
