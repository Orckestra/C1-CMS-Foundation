using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory
{
    [ConfigurationElementType(typeof(NonConfigurableUiContainerFactory))]
    public class UiContainerFactoryData : NameTypeManagerTypeConfigurationElement
    {
        private const string _templateFormVirtualPathPropertyName = "templateFormVirtualPath";
        [ConfigurationProperty(_templateFormVirtualPathPropertyName, IsRequired = true)]
        public string TemplateFormVirtualPath
        {
            get { return (string)base[_templateFormVirtualPathPropertyName]; }
            set { base[_templateFormVirtualPathPropertyName] = value; }
        }



        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        [ConfigurationProperty(_userControlVirtualPathPropertyName, IsRequired = true)]
        public string UserControlVirtualPath
        {
            get { return (string)base[_userControlVirtualPathPropertyName]; }
            set { base[_userControlVirtualPathPropertyName] = value; }
        }
    }
}
