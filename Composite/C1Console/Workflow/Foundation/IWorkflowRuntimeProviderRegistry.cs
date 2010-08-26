using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.C1Console.Workflow.Foundation
{
	internal interface IWorkflowRuntimeProviderRegistry
	{
        string DefaultWorkflowRuntimeProviderName { get; }
        void OnFlush();
	}
}
