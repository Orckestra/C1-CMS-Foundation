using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Forms.Plugins.FunctionFactory.Runtime
{
    internal sealed class FunctionFactoryFactory : NameTypeFactoryBase<IFormFunctionFactory>
    {
        public FunctionFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
