using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(RenderingResponseHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(RenderingResponseHandlerDefaultNameRetriever))]
	public interface IRenderingResponseHandler
	{
	}
}
