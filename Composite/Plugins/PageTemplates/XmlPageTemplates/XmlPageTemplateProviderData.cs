using System;
using System.Configuration;
using Composite.Core;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    [Assembler(typeof(XmlPageTemplateProviderAssembler))]
    internal class XmlPageTemplateProviderData : PageTemplateProviderData
    {
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

    internal class XmlPageTemplateProviderAssembler : IAssembler<IPageTemplateProvider, PageTemplateProviderData>
    {
        public IPageTemplateProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, PageTemplateProviderData objectConfiguration, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as XmlPageTemplateProviderData;
            if (data == null)
            {
                throw new ArgumentException("Expected configuration to be of type " + typeof(XmlPageTemplateProviderData).Name,
                                            "objectConfiguration");
            }

            Type addNewTemplateWorkflow = null;

            if (!string.IsNullOrEmpty(data.AddNewTemplateWorkflow))
            {
                try
                {
                    addNewTemplateWorkflow = TypeManager.GetType(data.AddNewTemplateWorkflow);
                }
                catch (Exception ex)
                {
                    Log.LogError(this.GetType().FullName, ex);
                }
            }

            return new XmlPageTemplateProvider(data.Name, data.AddNewTemplateLabel, addNewTemplateWorkflow);
        }
    }
}
