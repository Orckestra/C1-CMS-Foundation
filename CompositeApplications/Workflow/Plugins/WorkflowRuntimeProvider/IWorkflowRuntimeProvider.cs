using System.Workflow.Runtime;

using Composite.Workflow.Plugins.WorkflowRuntimeProvider.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Workflow.Plugins.WorkflowRuntimeProvider
{
    [CustomFactory(typeof(WorkflowRuntimeProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(WorkflowRuntimeProviderDefaultNameRetriever))]
    internal interface IWorkflowRuntimeProvider
    {
        WorkflowRuntime GetWorkflowRuntime();
    }
}
