using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Plugins.FunctionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableFunctionProvider))]
    public class FunctionProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
