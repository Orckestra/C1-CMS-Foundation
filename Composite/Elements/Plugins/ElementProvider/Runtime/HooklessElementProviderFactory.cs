using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider.Runtime
{
    internal sealed class HooklessElementProviderFactory : NameTypeFactoryBase<IHooklessElementProvider>
    {
        public HooklessElementProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
