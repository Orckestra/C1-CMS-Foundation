using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
    }
}
