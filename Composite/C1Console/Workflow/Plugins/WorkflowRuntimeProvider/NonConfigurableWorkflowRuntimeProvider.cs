using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider
{
    [Assembler(typeof(NonConfigurableWorkflowRuntimeProviderAssembler))]
    internal class NonConfigurableWorkflowRuntimeProvider : WorkflowRuntimeProviderData
    {
    }

    internal sealed class NonConfigurableWorkflowRuntimeProviderAssembler : IAssembler<IWorkflowRuntimeProvider, WorkflowRuntimeProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IWorkflowRuntimeProvider Assemble(IBuilderContext context, WorkflowRuntimeProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IWorkflowRuntimeProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
