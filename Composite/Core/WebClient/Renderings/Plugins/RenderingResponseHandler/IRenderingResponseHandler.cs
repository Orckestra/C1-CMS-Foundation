using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    [CustomFactory(typeof(RenderingResponseHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(RenderingResponseHandlerDefaultNameRetriever))]
	internal interface IRenderingResponseHandler
	{
	}
}
