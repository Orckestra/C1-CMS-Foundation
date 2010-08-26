using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime
{
    internal sealed class ElementAttachingProviderDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
	}
}
