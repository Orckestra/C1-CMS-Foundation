using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.WebClient.Plugins.WebRequestHandler.Runtime
{
    internal class WebRequestHandlerDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            return name;
        }
    }
}
