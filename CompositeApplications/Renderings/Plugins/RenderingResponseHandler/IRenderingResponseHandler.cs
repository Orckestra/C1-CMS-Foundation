using Composite.Renderings.Plugins.RenderingResponseHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Renderings.Plugins.RenderingResponseHandler
{
    [CustomFactory(typeof(RenderingResponseHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(RenderingResponseHandlerDefaultNameRetriever))]
	internal interface IRenderingResponseHandler
	{
	}
}
