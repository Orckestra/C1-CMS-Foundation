using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    internal sealed class TypeManagerTypeHandlerFactory : NameTypeFactoryBase<ITypeManagerTypeHandler>
    {
        public TypeManagerTypeHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
