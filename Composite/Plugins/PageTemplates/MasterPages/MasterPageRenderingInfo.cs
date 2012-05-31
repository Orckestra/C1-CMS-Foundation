using System.Collections.Generic;
using System.Reflection;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPageRenderingInfo
    {
        public MasterPageRenderingInfo(string virtualPath, IDictionary<string, PropertyInfo> placeholderProperties)
        {
            VirtualPath = virtualPath;
            PlaceholderProperties = placeholderProperties;
        }

        public string VirtualPath { get; private set; }

        public IDictionary<string, PropertyInfo> PlaceholderProperties { get; private set; }
    }
}
