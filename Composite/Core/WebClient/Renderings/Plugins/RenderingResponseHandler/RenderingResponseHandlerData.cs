using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>
    /// Base class for <see cref="IRenderingResponseHandler"/> plugin configuration. If you do not require special
    /// configuration, use <see cref="NonConfigurableRenderingResponseHandler"/>.
    /// </summary>
    [ConfigurationElementType(typeof(NonConfigurableRenderingResponseHandler))]
    public class RenderingResponseHandlerData : NameTypeManagerTypeConfigurationElement
	{
	}
}
