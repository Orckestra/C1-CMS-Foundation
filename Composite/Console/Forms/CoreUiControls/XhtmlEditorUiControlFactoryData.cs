using System;
using System.Configuration;

using Composite.C1Console.Forms.Plugins.UiControlFactory;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class XhtmlEditorUiControlFactoryData : UiControlFactoryData
    {
        private const string _classConfigurationNamePropertyName = "ClassConfigurationName";
        [ConfigurationProperty(_classConfigurationNamePropertyName,IsRequired=false,DefaultValue="common")]
        public string ClassConfigurationName
        {
            get { return (string)base[_classConfigurationNamePropertyName]; }
            set { base[_classConfigurationNamePropertyName] = value; }
        }
    }
}
