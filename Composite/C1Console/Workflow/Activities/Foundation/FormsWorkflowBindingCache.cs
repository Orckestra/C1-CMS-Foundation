using System;
using System.Collections.Concurrent;
using System.Collections.Generic;


namespace Composite.C1Console.Workflow.Activities.Foundation
{
	internal static class FormsWorkflowBindingCache
	{
        public static ConcurrentDictionary<Guid, Dictionary<string, object>> Bindings 
            = new ConcurrentDictionary<Guid, Dictionary<string, object>>();
	}
}
