using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.ComponentModel;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    public class HooklessElementProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
