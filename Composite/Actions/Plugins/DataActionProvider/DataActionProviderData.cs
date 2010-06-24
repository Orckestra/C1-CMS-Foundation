using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Actions.Plugins.DataActionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableDataActionProvider))]
    public class DataActionProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
