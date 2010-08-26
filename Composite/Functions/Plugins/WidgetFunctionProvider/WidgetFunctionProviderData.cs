using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableWidgetFunctionProvider))]
    internal class WidgetFunctionProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
