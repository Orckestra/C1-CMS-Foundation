using System.Workflow.Runtime;
using Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Workflow.WorkflowRuntimeProviders.StandardWorkflowRuntimeProvider
{
    [ConfigurationElementType(typeof(StandardWorkflowRuntimeProviderData))]
    internal sealed class StandardWorkflowRuntimeProvider : IWorkflowRuntimeProvider
    {
        public WorkflowRuntime GetWorkflowRuntime()
        {
            return new WorkflowRuntime();
        }
    }



    [Assembler(typeof(NonConfigurableWorkflowRuntimeProviderAssembler))]
    internal sealed class StandardWorkflowRuntimeProviderData : WorkflowRuntimeProviderData
    {
    }
}
