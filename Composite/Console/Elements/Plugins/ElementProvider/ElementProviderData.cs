using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    [Obsolete]
    [ConfigurationElementType(typeof(NonConfigurableElementProvider))]
    internal class ElementProviderData : HooklessElementProviderData
    {
    }
}
