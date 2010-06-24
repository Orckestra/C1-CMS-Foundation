using System.Collections.Generic;
using Composite.Elements;
using Composite.Security;
using Composite.Security.Plugins.HookRegistrator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Security.HookRegistrators.ElementHookRegistrator
{
    [ConfigurationElementType(typeof(ElementHookRegistratorData))]
    public sealed class ElementHookRegistrator : IHookRegistrator
	{
        public IEnumerable<EntityTokenHook> GetHooks()
        {
            return ElementHookRegistratorFacade.GetHooks();
        }
    }



    [Assembler(typeof(NonConfigurableHookRegistratorAssembler))]
    public sealed class ElementHookRegistratorData : HookRegistratorData
    {
    }
}
