using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    internal sealed class TypeManagerTypeHandlerDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
    }
}
