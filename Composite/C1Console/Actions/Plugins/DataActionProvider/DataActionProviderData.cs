using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Actions.Plugins.DataActionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableDataActionProvider))]
    internal class DataActionProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
