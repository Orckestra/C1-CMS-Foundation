using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
{
    internal class BaseElementConfigurationElement : NameTypeConfigurationElement
    {
        private const string _idProperty = "id";
        [ConfigurationProperty(_idProperty, IsRequired = true, IsKey = true)]
        public string Id
        {
            get { return (string)base[_idProperty]; }
            set { base[_idProperty] = value; }
        }


        private const string _orderProperty = "order";
        [ConfigurationProperty(_orderProperty, IsRequired = true, IsKey = true)]
        public int Order
        {
            get { return (int)base[_orderProperty]; }
            set { base[_orderProperty] = value; }
        }


        private const string _parentIdProperty = "parentId";
        [ConfigurationProperty(_parentIdProperty)]
        public string ParentId
        {
            get { return (string)base[_parentIdProperty]; }
            set { base[_parentIdProperty] = value; }
        }


        private const string _labelProperty = "label";
        [ConfigurationProperty(_labelProperty, IsRequired = true)]
        public string Label
        {
            get { return (string)base[_labelProperty]; }
            set { base[_labelProperty] = value; }
        }


        private const string _tagProperty = "tag";
        [ConfigurationProperty(_tagProperty, DefaultValue = null)]
        public string Tag
        {
            get { return (string)base[_tagProperty]; }
            set { base[_tagProperty] = value; }
        }


        private const string _closeFolderIconNameProperty = "closeFolderIconName";
        [ConfigurationProperty(_closeFolderIconNameProperty)]
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
    }
}
