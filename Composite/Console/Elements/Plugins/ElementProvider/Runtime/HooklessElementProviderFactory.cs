using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementProvider.Runtime
{
    internal sealed class HooklessElementProviderFactory : NameTypeFactoryBase<IHooklessElementProvider>
    {
        public HooklessElementProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
