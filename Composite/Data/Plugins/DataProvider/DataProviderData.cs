using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Data.Plugins.DataProvider
{
    [ConfigurationElementType(typeof(NonConfigurableDataProvider))]
    public class DataProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
