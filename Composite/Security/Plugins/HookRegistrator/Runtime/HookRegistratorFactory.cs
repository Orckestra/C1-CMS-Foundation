using Composite.Configuration;
using Composite.ConfigurationSystem;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.HookRegistrator.Runtime
{
    internal sealed class HookRegistratorFactory : NameTypeFactoryBase<IHookRegistrator>
    {
        public HookRegistratorFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
