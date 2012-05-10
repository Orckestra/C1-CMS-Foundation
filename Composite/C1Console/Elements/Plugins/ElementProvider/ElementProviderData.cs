using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.ComponentModel;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    [Obsolete]
    [ConfigurationElementType(typeof(NonConfigurableElementProvider))]
    public class ElementProviderData : HooklessElementProviderData
    {
    }
}
