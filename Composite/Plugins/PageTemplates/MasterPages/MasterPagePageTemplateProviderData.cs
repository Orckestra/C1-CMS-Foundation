using System;
using System.Configuration;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [Assembler(typeof(MasterPagePageTemplateProviderAssembler))]
    internal class MasterPagePageTemplateProviderData : PageTemplateProviderData
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

    internal class MasterPagePageTemplateProviderAssembler : IAssembler<IPageTemplateProvider, PageTemplateProviderData>
    {
        public IPageTemplateProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, PageTemplateProviderData objectConfiguration, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as MasterPagePageTemplateProviderData;
            if (data == null)
            {
                throw new ArgumentException("Expected configuration to be of type " + typeof(MasterPagePageTemplateProviderAssembler).Name,
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

            string folderPath = PathUtil.Resolve(data.Directory);

            if (!C1Directory.Exists(folderPath))
            {
                throw new ConfigurationErrorsException("Folder '{0}' does not exists".FormatWith(folderPath),
                    objectConfiguration.ElementInformation.Source, objectConfiguration.ElementInformation.LineNumber);
            }

            return new MasterPagePageTemplateProvider(data.Name, data.Directory, data.AddNewTemplateLabel, addNewTemplateWorkflow);
        }
    }
}
