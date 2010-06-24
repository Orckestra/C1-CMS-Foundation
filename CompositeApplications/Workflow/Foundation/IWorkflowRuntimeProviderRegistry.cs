using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Workflow.Foundation
{
	internal interface IWorkflowRuntimeProviderRegistry
	{
        string DefaultWorkflowRuntimeProviderName { get; }
        void OnFlush();
	}
}
