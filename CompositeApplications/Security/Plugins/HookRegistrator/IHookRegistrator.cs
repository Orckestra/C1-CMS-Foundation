using System.Collections.Generic;

using Composite.Security.Plugins.HookRegistrator.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.HookRegistrator
{
    [CustomFactory(typeof(HookRegistratorCustomFactory))]
    [ConfigurationNameMapper(typeof(HookRegistratorDefaultNameRetriever))]
	public interface IHookRegistrator
	{
        IEnumerable<EntityTokenHook> GetHooks();
	}
}
