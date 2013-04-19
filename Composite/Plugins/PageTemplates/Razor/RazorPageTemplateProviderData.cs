using System;
using System.Configuration;
using Composite.Core.PageTemplates.Plugins;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.Razor
{
    [Assembler(typeof(RazorPageTemplateProviderAssembler))]
    internal class RazorPageTemplateProviderData : PageTemplateProviderData
    {
        [ConfigurationProperty("directory", IsRequired = false, DefaultValue = "~/App_Data/Razor/PageTemplates")]
        public string Directory
        {
            get { return (string)base["directory"]; }
            set { base["directory"] = value; }
        }

        [ConfigurationProperty("addNewTemplateLabel", IsRequired = false, DefaultValue = null)]
        public string AddNewTemplateLabel
        {
            get { return (string)base["addNewTemplateLabel"]; }
            set { base["addNewTemplateLabel"] = value; }
        }

        [ConfigurationProperty("addNewTemplateWorkflow", IsRequired = false, DefaultValue = null)]
        public string AddNewTemplateWorkflow
        {
            get { return (string)base["addNewTemplateWorkflow"]; }
            set { base["addNewTemplateWorkflow"] = value; }
        }
    }
}
