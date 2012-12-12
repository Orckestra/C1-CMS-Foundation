using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [ConfigurationElementType(typeof(SimpleVirtualElement))]
    internal class SimpleVirtualElement : VirtualElementConfigurationElement
    {
        private const string _labelProperty = "label";
        [ConfigurationProperty(_labelProperty, IsRequired = true)]
        public string Label
        {
            get { return (string)base[_labelProperty]; }
            set { base[_labelProperty] = value; }
        }

        /// <summary>
        /// Used by the client js to filter perspective related elements
        /// </summary>
        private const string _tagProperty = "tag";
        [ConfigurationProperty(_tagProperty, DefaultValue = null)]
        public string Tag
        {
            get { return (string)base[_tagProperty]; }
            set { base[_tagProperty] = value; }
        }


        private const string _closeFolderIconNameProperty = "closeFolderIconName";
        [ConfigurationProperty(_closeFolderIconNameProperty, DefaultValue = null)]
        public string CloseFolderIconName
        {
            get { return (string)base[_closeFolderIconNameProperty]; }
            set { base[_closeFolderIconNameProperty] = value; }
        }



        private const string _openFolderIconNameProperty = "openFolderIconName";
        [ConfigurationProperty(_openFolderIconNameProperty)]
        public string OpenFolderIconName
        {
            get { return (string)base[_openFolderIconNameProperty]; }
            set { base[_openFolderIconNameProperty] = value; }
        }

        private const string _elementsProperty = "Elements";
        [ConfigurationProperty(_elementsProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<VirtualElementConfigurationElement, VirtualElementConfigurationElement> Elements
        {
            get
            {
                return (NameTypeConfigurationElementCollection<VirtualElementConfigurationElement, VirtualElementConfigurationElement>)base[_elementsProperty];
            }
        }
    }
}
