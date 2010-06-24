using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Elements.Plugins.ElementProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    public class HooklessElementProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
