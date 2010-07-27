using System.Web;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.WebClient.Plugins.WebRequestHandler.Runtime;


namespace Composite.WebClient.Plugins.WebRequestHandler
{
    [CustomFactory(typeof(WebRequestHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(WebRequestHandlerDefaultNameRetriever))]
    public abstract class WebRequestHandler : System.Web.UI.Control
    {
    }
}
