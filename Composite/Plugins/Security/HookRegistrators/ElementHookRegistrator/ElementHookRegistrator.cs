using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Plugins.HookRegistrator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.HookRegistrators.ElementHookRegistrator
{
    [ConfigurationElementType(typeof(ElementHookRegistratorData))]
    internal sealed class ElementHookRegistrator : IHookRegistrator
	{
        public IEnumerable<EntityTokenHook> GetHooks()
        {
            return ElementHookRegistratorFacade.GetHooks();
        }
    }



    [Assembler(typeof(NonConfigurableHookRegistratorAssembler))]
    internal sealed class ElementHookRegistratorData : HookRegistratorData
    {
    }
}
