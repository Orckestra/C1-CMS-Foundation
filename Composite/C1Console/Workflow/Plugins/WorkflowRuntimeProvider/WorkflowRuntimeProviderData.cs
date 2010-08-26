using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider
{
    [ConfigurationElementType(typeof(NonConfigurableWorkflowRuntimeProvider))]
    internal class WorkflowRuntimeProviderData : NameTypeManagerTypeConfigurationElement
    {
    }
}
