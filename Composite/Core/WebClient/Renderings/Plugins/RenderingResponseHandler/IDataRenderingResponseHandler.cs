using Composite.Data;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>
    /// C1 CMS allow you to build a RenderingResponseHandler plug-in. It enables developers to intercept 
    /// page and media requests and control if the request should be accepted or redirected and if the rendered 
    /// resource is allowed to be publicly cached.
    /// </summary>
    /// <remarks>
    /// To create a RenderingResponseHandler plug-in:
    /// <list type="number">
    /// <item>
    /// <description>In Visual Studio, create a new "Class Library" project (or use an existing project if you have one).</description>
    /// </item>
    /// <item>
    /// <description>Add references to the following assemblies ( Browse and located on your web site):
    /// 	<list type="bullet">
    /// 		<item>
    ///	 		<description>/bin/Composite.dll</description>
    /// 		</item>
    /// 		<item>
    /// 			<description>/bin/Microsoft.Practices.EnterpriseLibrary.Common.dll</description>
    /// 		</item>
    /// 	</list></description>
    /// </item>
    /// <item>
    /// <description>In each assembly reference's properties, set Copy Local to 'False'.</description>
    /// </item>
    /// <item>
    /// <description>Add a reference to System.Configuration (.NET)</description>
    /// </item>
    /// <item>
    /// <description>Create a new class for your plug-in (see the source code example below).</description>
    /// </item>
    /// <item>
    /// <description>Compile the project and copy the DLL to the website /bin folder.</description>
    /// </item>
    /// </list>
    /// To register a RenderingResponseHandler plug-in:
    /// <list type="number">
    /// <item>
    /// <description>Edit the file /App_Data/Composite/Composite.config.</description>
    /// </item>
    /// <item>
    /// <description>Locate the element <RenderingResponseHandlerPlugins />.</description>
    /// </item>
    /// <item>
    /// <description>Add a new element inside the &lt;RenderingResponseHandlerPlugins /&gt; element:
    ///
    ///    &lt;add name="Sample" type="TypeName, AssemblyName"/&gt;
    ///
    /// changing 'Sample' to a name relevant to your project and 'TypeName, AssemblyName' to the fully qualified class name of your plug-in class.</description>
    /// </item>
    /// <item>
    /// <description>Restart the C1 site (recycle app pool or use C1 Console; Tools | Restart Server)</description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <example>
    /// Sample plugin:
    /// <code>
    ///using System;
    ///using Composite.Data;
    ///using Composite.Data.Types;
    ///using Composite.Core.Logging;
    ///using Composite.Core.WebClient.Renderings;
    ///using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler;
    ///
    ///using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
    ///
    ///
    ///namespace RenderingResponseHandlerSample
    ///{
    ///    [ConfigurationElementType(typeof(NonConfigurableRenderingResponseHandler))]
    ///    public class RenderingResponseHandlerPluginSample : IDataRenderingResponseHandler
    ///    {
    ///        // Have the TCP logger running to see the string being logged - see Composite.Tools.TcpCustomTraceListener
    ///        // This sample will redirect requests for pages and media containing the word 'secret' in their title / path.
    ///        public RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken)
    ///        {
    ///            IData requestedData = requestedItemEntityToken.Data;
    ///
    ///            bool redirect = false;
    ///
    ///            if (requestedData is IPage)
    ///            {
    ///                IPage requestedPage = (IPage)requestedData;
    ///                LoggingService.LogVerbose("Sample", string.Format("Request for page '{0}'.", requestedPage.Title));
    ///
    ///                if (requestedPage.Title.ToLower().Contains("secret"))
    ///                {
    ///                    redirect = true;
    ///                }
    ///            }
    ///            else if (requestedData is IMediaFile)
    ///            {
    ///                IMediaFile requestedMediaFile = (IMediaFile)requestedData;
    ///                LoggingService.LogVerbose("Sample", string.Format("Request for media file '{0}'.", requestedMediaFile.CompositePath));
    ///
    ///                if (requestedMediaFile.CompositePath.ToLower().Contains("secret"))
    ///                {
    ///                    redirect = true;
    ///                }
    ///            }
    ///
    ///            if (redirect)
    ///            {
    ///                return new RenderingResponseHandlerResult
    ///                {
    ///                    PreventPublicCaching = true,
    ///                    RedirectRequesterTo = new Uri("http://docs.composite.net/")
    ///                };
    ///            }
    ///            else
    ///            {
    ///                return new RenderingResponseHandlerResult
    ///                {
    ///                    PreventPublicCaching = false
    ///                };
    ///            }
    ///        }
    ///    }
    ///}
    /// </code>
    /// Sample configuration snippet from Composite.config:
    /// <code>
    /// &lt;Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandlerConfiguration&gt; 
    ///   &lt;RenderingResponseHandlerPlugins&gt; 
    ///     &lt;add name="Sample" type="RenderingResponseHandlerSample.RenderingResponseHandlerPluginSample, RenderingResponseHandlerSample" /&gt; 
    ///   &lt;/RenderingResponseHandlerPlugins&gt; 
    /// &lt;/Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandlerConfiguration&gt;    
    /// </code>
    /// </example>
    public interface IDataRenderingResponseHandler : IRenderingResponseHandler
	{
        /// <summary>
        /// Method which gets called for all C1 media file requests and (un-cached) C1 page requests. 
        /// The fate of the request is described in the <see cref="RenderingResponseHandlerResult"/> return value.
        /// </summary>
        /// <param name="requestedItemEntityToken">The data being rendered. This can be <see cref="Composite.Data.Types.IPage"/> and <see cref="Composite.Data.Types.IMediaFile"/>.</param>
        /// <returns>A <see cref="RenderingResponseHandlerResult"/> object detailing what should happen to the user request. Returning null means no special handling should be done (request should continue).</returns>
        RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken);
	}
}
