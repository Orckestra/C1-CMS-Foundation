using System;
using System.Collections.Generic;


namespace Composite.C1Console.Workflow.Activities.Foundation
{
	internal static class FormsWorkflowBindingCache
	{
        public static Dictionary<Guid, Dictionary<string, object>> Bindings = new Dictionary<Guid, Dictionary<string, object>>();
	}
}
