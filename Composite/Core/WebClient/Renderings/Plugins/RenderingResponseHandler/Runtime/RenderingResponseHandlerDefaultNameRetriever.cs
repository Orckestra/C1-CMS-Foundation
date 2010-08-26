using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    internal sealed class RenderingResponseHandlerDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
	}
}
