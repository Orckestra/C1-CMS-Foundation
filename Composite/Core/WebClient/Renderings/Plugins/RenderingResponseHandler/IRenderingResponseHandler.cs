using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>
    /// Base interface - use the interface <see cref="IDataRenderingResponseHandler"/> for handling page and media requests.
    /// </summary>
    [CustomFactory(typeof(RenderingResponseHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(RenderingResponseHandlerDefaultNameRetriever))]
	public interface IRenderingResponseHandler
	{
	}
}
