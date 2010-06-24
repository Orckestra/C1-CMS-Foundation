using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Workflow.Plugins.WorkflowRuntimeProvider.Runtime
{
    internal sealed class WorkflowRuntimeProviderFactory : NameTypeFactoryBase<IWorkflowRuntimeProvider>
    {
        public WorkflowRuntimeProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
