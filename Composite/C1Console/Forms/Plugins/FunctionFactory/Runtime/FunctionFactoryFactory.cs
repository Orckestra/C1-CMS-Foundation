using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime
{
    internal sealed class FunctionFactoryFactory : NameTypeFactoryBase<IFormFunctionFactory>
    {
        public FunctionFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
