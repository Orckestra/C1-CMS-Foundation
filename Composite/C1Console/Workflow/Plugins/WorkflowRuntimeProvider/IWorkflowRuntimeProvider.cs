using System.Workflow.Runtime;

using Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider
{
    [CustomFactory(typeof(WorkflowRuntimeProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(WorkflowRuntimeProviderDefaultNameRetriever))]
    internal interface IWorkflowRuntimeProvider
    {
        WorkflowRuntime GetWorkflowRuntime();
    }
}
