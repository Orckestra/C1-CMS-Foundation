using System;
using Composite.Core;
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

            if (data.AddNewTemplateWorkflow != null)
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

            return new RazorPageTemplateProvider(data.Name, data.Directory, data.AddNewTemplateLabel, addNewTemplateWorkflow);
        }
    }
}
