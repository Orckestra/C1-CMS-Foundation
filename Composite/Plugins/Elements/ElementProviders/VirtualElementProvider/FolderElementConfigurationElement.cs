using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Configuration;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [Obsolete()]
    [ConfigurationElementType(typeof(FolderElementConfigurationElement))]
    internal sealed class FolderElementConfigurationElement : BaseElementConfigurationElement
    {
    }
}
