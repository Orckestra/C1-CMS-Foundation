using System.Collections.Generic;

using Composite.C1Console.Security.Plugins.HookRegistrator.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.HookRegistrator
{
    [CustomFactory(typeof(HookRegistratorCustomFactory))]
    [ConfigurationNameMapper(typeof(HookRegistratorDefaultNameRetriever))]
	internal interface IHookRegistrator
	{
        IEnumerable<EntityTokenHook> GetHooks();
	}
}
