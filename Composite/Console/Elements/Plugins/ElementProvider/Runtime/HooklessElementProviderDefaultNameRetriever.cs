using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementProvider.Runtime
{
    internal sealed class HooklessElementProviderDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
    }
}
