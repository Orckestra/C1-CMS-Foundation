using Composite.Core.Configuration;
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
