using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    internal class HooklessElementProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
