using System;
using System.Configuration;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class RazorPageTemplateProviderAssembler : IAssembler<IPageTemplateProvider, PageTemplateProviderData>
    {
        public IPageTemplateProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, PageTemplateProviderData objectConfiguration, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as RazorPageTemplateProviderData;
            if (data == null)
            {
                throw new ArgumentException("Expected configuration to be of type " + typeof(RazorPageTemplateProviderData).Name, 
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

            return new RazorPageTemplateProvider(data.Name, data.Directory, data.AddNewTemplateLabel, addNewTemplateWorkflow);
        }
    }
}
