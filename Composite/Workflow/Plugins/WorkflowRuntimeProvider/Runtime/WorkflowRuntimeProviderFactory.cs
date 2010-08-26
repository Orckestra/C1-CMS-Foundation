using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider.Runtime
{
    internal sealed class WorkflowRuntimeProviderFactory : NameTypeFactoryBase<IWorkflowRuntimeProvider>
    {
        public WorkflowRuntimeProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
