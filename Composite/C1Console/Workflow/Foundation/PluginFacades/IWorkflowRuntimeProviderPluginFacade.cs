using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Workflow.Runtime;


namespace Composite.C1Console.Workflow.Foundation.PluginFacades
{
	internal interface IWorkflowRuntimeProviderPluginFacade
	{
        bool HasConfiguration { get; }
        WorkflowRuntime GetWorkflowRuntime(string providerName);
        void OnFlush();
	}
}
