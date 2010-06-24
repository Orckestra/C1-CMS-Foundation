using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableWidgetFunctionProvider))]
    public class WidgetFunctionProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
