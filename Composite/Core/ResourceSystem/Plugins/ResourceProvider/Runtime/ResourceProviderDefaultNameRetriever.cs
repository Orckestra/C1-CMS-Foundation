using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;



namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    internal sealed class ResourceProviderDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
	}
}
