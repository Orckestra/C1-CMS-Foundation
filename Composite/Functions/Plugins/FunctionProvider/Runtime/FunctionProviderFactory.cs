using Composite.Configuration;
using Composite.ConfigurationSystem;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.FunctionProvider.Runtime
{
    internal sealed class FunctionProviderFactory : NameTypeFactoryBase<IFunctionProvider>
    {
        public FunctionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
