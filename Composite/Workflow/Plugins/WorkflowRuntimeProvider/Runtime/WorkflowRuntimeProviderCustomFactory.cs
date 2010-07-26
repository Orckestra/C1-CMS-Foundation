using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Workflow.Plugins.WorkflowRuntimeProvider.Runtime
{
    internal sealed class WorkflowRuntimeProviderCustomFactory : AssemblerBasedCustomFactory<IWorkflowRuntimeProvider, WorkflowRuntimeProviderData>
    {
        protected override WorkflowRuntimeProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            WorkflowRuntimeProviderSettings settings = configurationSource.GetSection(WorkflowRuntimeProviderSettings.SectionName) as WorkflowRuntimeProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", WorkflowRuntimeProviderSettings.SectionName));
            }

            return settings.WorkflowRuntimeProviderPlugins.Get(name);
        }
    }
}
