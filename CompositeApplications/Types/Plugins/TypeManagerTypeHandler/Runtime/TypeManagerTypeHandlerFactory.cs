using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    internal sealed class TypeManagerTypeHandlerFactory : NameTypeFactoryBase<ITypeManagerTypeHandler>
    {
        public TypeManagerTypeHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
