using System.Configuration;
using Composite.C1Console.Forms.Plugins.UiControlFactory;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class XhtmlEditorUiControlFactoryData : UiControlFactoryData
    {
        private const string _classConfigurationNamePropertyName = "ClassConfigurationName";
        private const string _containerClassesPropertyName = "ContainerClasses";

        [ConfigurationProperty(_classConfigurationNamePropertyName,IsRequired=false,DefaultValue="common")]
        public string ClassConfigurationName
        {
            get { return (string)base[_classConfigurationNamePropertyName]; }
            set { base[_classConfigurationNamePropertyName] = value; }
        }

        [ConfigurationProperty(_containerClassesPropertyName, IsRequired = false, DefaultValue = "")]
        public string ContainerClasses
        {
            get { return (string)base[_containerClassesPropertyName]; }
            set { base[_containerClassesPropertyName] = value; }
        }
    }
}
