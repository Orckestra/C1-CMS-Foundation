using System.Workflow.Runtime;
using Composite.Workflow.Plugins.WorkflowRuntimeProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Workflow.WorkflowRuntimeProviders.StandardWorkflowRuntimeProvider
{
    [ConfigurationElementType(typeof(StandardWorkflowRuntimeProviderData))]
    public sealed class StandardWorkflowRuntimeProvider : IWorkflowRuntimeProvider
    {
        public WorkflowRuntime GetWorkflowRuntime()
        {
            return new WorkflowRuntime();
        }
    }



    [Assembler(typeof(NonConfigurableWorkflowRuntimeProviderAssembler))]
    public sealed class StandardWorkflowRuntimeProviderData : WorkflowRuntimeProviderData
    {
    }
}
