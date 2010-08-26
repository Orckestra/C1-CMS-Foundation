using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.HookRegistrator.Runtime
{
    internal sealed class HookRegistratorFactory : NameTypeFactoryBase<IHookRegistrator>
    {
        public HookRegistratorFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
