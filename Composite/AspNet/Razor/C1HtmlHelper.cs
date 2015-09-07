using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.WebPages.Html;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Core.WebClient.Media;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Extension object to be used in Razor code
    /// </summary>
    public class C1HtmlHelper
    {
        private readonly HtmlHelper _helper;

        /// <summary>
        /// Initializes a new instance of the <see cref="C1HtmlHelper"/> class.
        /// </summary>
        /// <param name="helper">The helper.</param>
        public C1HtmlHelper(HtmlHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="page">The page.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(IPage page)
        {
            return PageUrl(page.Id);
        }

        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="page">The page.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(DataReference<IPage> page)
        {
            return PageUrl(((Guid) page.KeyValue));
        }

        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="querystring">The querystring object.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(IPage page, object querystring)
        {
            return PageUrl(page.Id, querystring);
        }

        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="querystring">An object which properties' values will be passes as query string.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(IPage page, IDictionary<string, string> querystring)
        {
            return PageUrl(page.Id, querystring);
        }


        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(string pageId, object querystring = null)
        {
            return PageUrl(new Guid(pageId), querystring);
        }



        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(Guid pageId)
        {
            return PageUrl(pageId, null);
        }



        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(Guid pageId, object querystring)
        {
            var dict = Functions.ObjectToDictionary(querystring);

            return PageUrl(pageId, dict);
        }



        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(string pageId, IDictionary<string, object> querystring)
        {
            return PageUrl(new Guid(pageId), querystring);
        }


        /// <summary>
        /// Returns a URL for a specific C1 page
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString PageUrl(Guid pageId, IDictionary<string, object> querystring)
        {
            string relativeUrl = "~/page(" + pageId + ")";
            string absoluteUrl = VirtualPathUtility.ToAbsolute(relativeUrl);

            if (querystring != null && querystring.Keys.Count > 0)
            {
                absoluteUrl += "?" + SerializeQueryString(querystring);
            }

            return _helper.Raw(absoluteUrl);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(IMediaFile mediaFile)
        {
            return MediaUrl(mediaFile.KeyPath);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(DataReference<IMediaFile> mediaFile) 
        {
            return MediaUrl((string) mediaFile.KeyValue);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(NullableDataReference<IMediaFile> mediaFile)
        {
            if (!mediaFile.IsSet)
            {
                return null;
            }

            return MediaUrl((string) mediaFile.KeyValue);
        }

        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="image">The image file.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(DataReference<IImageFile> image)
        {
            return MediaUrl((string)image.KeyValue);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="image">The image file.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(NullableDataReference<IImageFile> image)
        {
            if (!image.IsSet)
            {
                return null;
            }

            return MediaUrl((string)image.KeyValue);
        }

        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="image">The image file.</param>
        /// <param name="resizingOptions">The resizing options.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(DataReference<IImageFile> image, ResizingOptions resizingOptions)
        {
            return MediaUrl((string) image.KeyValue, resizingOptions);
        }

        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="image">The image file.</param>
        /// <param name="resizingOptions">The resizing options.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(IImageFile image, ResizingOptions resizingOptions)
        {
            return MediaUrl(image.KeyPath, resizingOptions);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(IMediaFile mediaFile, object querystring)
        {
            return MediaUrl(mediaFile.KeyPath, querystring);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(IMediaFile mediaFile, IDictionary<string, string> querystring)
        {
            return MediaUrl(mediaFile.KeyPath, querystring);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaId">Id of a media file.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(Guid mediaId, object querystring = null)
        {
            return MediaUrl(mediaId.ToString(), querystring);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="mediaId">Id of a media file.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(Guid mediaId, IDictionary<string, string> querystring)
        {
            return MediaUrl(mediaId.ToString(), querystring);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="keyPath">The keyPath property of a media item.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(string keyPath, object querystring = null)
        {
            var dict = Functions.ObjectToDictionary(querystring);

            return MediaUrl(keyPath, dict);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="keyPath">The keyPath property of a media item.</param>
        /// <param name="querystring">The querystring.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(string keyPath, IDictionary<string, object> querystring)
        {
            string relativeUrl = "~/media(" + keyPath + ")";
            string absoluteUrl = VirtualPathUtility.ToAbsolute(relativeUrl);

            if (querystring != null && querystring.Keys.Count > 0)
            {
                absoluteUrl += "?" + SerializeQueryString(querystring);
            }

            return _helper.Raw(absoluteUrl);
        }


        /// <summary>
        /// Returns a media url.
        /// </summary>
        /// <param name="keyPath">Image's KeyPath field value.</param>
        /// <param name="resizingOptions">The resizing options.</param>
        /// <returns></returns>
        public IHtmlString MediaUrl(string keyPath, ResizingOptions resizingOptions)
        {
            string relativeUrl = "~/media(" + keyPath + ")";
            string absoluteUrl = VirtualPathUtility.ToAbsolute(relativeUrl);

            string queryString = resizingOptions.ToString();

            if (!string.IsNullOrEmpty(queryString))
            {
                absoluteUrl += "?" + queryString.Replace("&", "&amp;");
            }

            return _helper.Raw(absoluteUrl);
        }


        private static string SerializeQueryString(IDictionary<string, object> querystring)
        {
            return String.Join("&amp;",
                querystring.Select(kvp => HttpUtility.UrlEncode(kvp.Key)
                                          + "=" + HttpUtility.UrlEncode(kvp.Value.ToString())));
        }



        /// <summary>
        /// Renders the specified XNode.
        /// </summary>
        /// <param name="xNode">The <see cref="XNode">XNode</see>.</param>
        /// <returns></returns>
        public IHtmlString Markup(XNode xNode)
        {
            if (xNode == null)
            {
                return null;
            }

            // TODO: optimize so XNode doesn't get serialized/deserialized

            return _helper.Raw(xNode.ToString());
        }


        /// <summary>
        /// Includes a named Page Template Feature. Page Template Feature are managed in '~/App_Data/PageTemplateFeatures' 
        /// or via the C1 Console's Layout perspective. They contain html and functional snippets.
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to include. Names do not include an extension.</param>
        /// <returns></returns>
        public IHtmlString GetPageTemplateFeature(string featureName)
        {
            XElement documentRoot = PageTemplateFeatureFacade.GetPageTemplateFeature(featureName).Root;

            return _helper.Raw(documentRoot.ToString());
        }


        /// <summary>
        /// Renders the specified XNode-s.
        /// </summary>
        /// <param name="xNodes">The collection of <see cref="XNode">XNode</see> objects.</param>
        /// <returns></returns>
        public IHtmlString Markup(IEnumerable<XNode> xNodes)
        {
            if (xNodes == null)
            {
                return null;
            }

            // TODO: optimize so XNode-s don't get serialized/deserialized

            var sb = new StringBuilder();
            foreach (var xNode in xNodes)
            {
                if (xNode == null) continue;

                sb.Append(xNode.ToString());
            }

            return _helper.Raw(sb.ToString());
        }

        /// <summary>
        /// Executes a C1 Function.
        /// </summary>
        /// <param name="name">Function name.</param>
        /// <returns></returns>
        public IHtmlString Function(string name)
        {
            return Function(name, null);
        }

        /// <summary>
        /// Executes a C1 Function.
        /// </summary>
        /// <param name="name">Function name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
        public IHtmlString Function(string name, object parameters)
        {
            return Function(name, Functions.ObjectToDictionary(parameters));
        }

        /// <summary>
        /// Executes a C1 Function.
        /// </summary>
        /// <param name="name">Function name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
        public IHtmlString Function(string name, IDictionary<string, object> parameters)
        {
            return Function(name, parameters, new FunctionContextContainer());
        }

        /// <summary>
        /// Executes a C1 Function.
        /// </summary>
        /// <param name="name">Function name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="functionContext">The function context container</param>
        /// <returns></returns>
        public IHtmlString Function(string name, IDictionary<string, object> parameters, FunctionContextContainer functionContext)
        {
            object result = Functions.ExecuteFunction(name, parameters, functionContext);
            if (result is Control)
            {
                return EmbedControl(result, functionContext);
            }

            return ConvertFunctionResult(result);
        }

        private static IHtmlString EmbedControl(object result, FunctionContextContainer functionContext)
        {
            if (functionContext == null)
            {
                throw new ArgumentNullException("functionContext",
                                                "Failed to insert UserControl without FunctionContextContainer");
            }

            if (functionContext.XEmbedableMapper == null)
            {
                throw new ArgumentException("Failed to insert UserControl. functionContextContainer.XEmbedableMapper is null",
                                            "functionContext");
            }

            XNode resultNode;
            if (!functionContext.XEmbedableMapper.TryMakeXEmbedable(functionContext, result, out resultNode))
            {
                throw new InvalidOperationException("Failed to insert control. Type: " + result.GetType());
            }

            return new HtmlString(resultNode.ToString());
        }

        private static IHtmlString ConvertFunctionResult(object result)
        {
            var resultAsString = ValueTypeConverter.Convert<string>(result);
            if (resultAsString != null)
            {
                return new HtmlString(resultAsString);
            }

            throw new InvalidOperationException("Function doesn't return string value");
        }
    }
}
