using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [ConfigurationElementType(typeof(PlaceholderVirtualElement))]
    internal class PlaceholderVirtualElement : SimpleVirtualElement
    {
        private const string _path = "path";
        [ConfigurationProperty(_path)]
        public string Path
        {
            get { return (string)base[_path]; }
            set { base[_path] = value; }
        }


        private const string _IsNotDefault = "IsNotDefault";
        [ConfigurationProperty(_IsNotDefault)]
        public string IsNotDefault
        {
            get { return (string)base[_IsNotDefault]; }
            set { base[_IsNotDefault] = value; }
        }
    }
}
