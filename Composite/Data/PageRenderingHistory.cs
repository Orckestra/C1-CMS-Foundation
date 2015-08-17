using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net;
using System.Threading;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Routing;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data.Types;

namespace Composite.Data
{
    /// <summary>
    /// Preserves list of pages that has been rendered since last content/function change
    /// </summary>
    public static class PageRenderingHistory
    {
        private static readonly string LogTitle = typeof(PageRenderingHistory).Name;


        private const int PageRenderingTimeout = 7000;
        private const int PageRenderingQueueWaitingTimeout = 15000;
        private static readonly ConcurrentDictionary<string, object> _renderedPages = new ConcurrentDictionary<string, object>();


        private static readonly object _pageRenderingLock = new object();

        static PageRenderingHistory()
        {
            GlobalEventSystemFacade.OnDesignChange += () => _renderedPages.Clear();

            DataEvents<IPage>.OnAfterUpdate += (sender, args) => PageUpdated((IPage) args.Data);
            DataEvents<IPage>.OnDeleted += (sender, args) => PageUpdated((IPage)args.Data);
        }

        private static string GetCacheKey(IPage page)
        {
            var dataSourceId = page.DataSourceId;
            string localizationInfo = dataSourceId.LocaleScope.ToString();
            string dataScope = dataSourceId.DataScopeIdentifier.Name;
            return page.Id + dataScope + localizationInfo;
        }

        /// <summary>
        /// Indicates whether the page was rendered since the last 
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public static bool IsPageRendered(IPage page)
        {
            var key = GetCacheKey(page);
            return _renderedPages.ContainsKey(key);
        }

        /// <summary>
        /// Marks page as rendered.
        /// </summary>
        /// <param name="page">The pages.</param>
        public static void MarkPageAsRendered(IPage page)
        {
            var key = GetCacheKey(page);
            _renderedPages[key] = null;
        }

        private static void PageUpdated(IPage page)
        {
            object temp;
            _renderedPages.TryRemove(GetCacheKey(page), out temp);
        }

        /// <exclude />
        public static void RenderPageIfNotRendered(IPage page)
        {
            if (IsPageRendered(page) || PageRenderer.CurrentPageId == page.Id) return;

            bool lockTaken = false;
            try
            {
                Monitor.TryEnter(_pageRenderingLock, PageRenderingQueueWaitingTimeout, ref lockTaken);

                if (IsPageRendered(page)) return;

                try
                {
                    RenderPage(page);
                }
                catch (Exception ex)
                {
                    string pageUrl = PageUrls.BuildUrl(page) ?? "(no url)";
                    Log.LogError(LogTitle, "Failed to render page '{0}', Id: {1}", pageUrl, page.Id);
                    Log.LogError(LogTitle, ex);
                }
            }
            finally
            {
                if (lockTaken)
                {
                    Monitor.Exit(_pageRenderingLock);
                }

                if (!lockTaken)
                {
                    if (!IsPageRendered(page))
                    {
                        Log.LogWarning("DataUrls", "Timeout on page rendering waiting queue");
                    }
                }

                MarkPageAsRendered(page);
            }
        }

        private static void RenderPage(IPage page)
        {
            var context = HttpContext.Current;
            if (context == null)
            {
                return;
            }

            var urlSpace = new UrlSpace(context) { ForceRelativeUrls = true };
            var url = PageUrls.BuildUrl(page, UrlKind.Public, urlSpace)
                ?? PageUrls.BuildUrl(page, UrlKind.Renderer, urlSpace);

            if (string.IsNullOrEmpty(url))
            {
                return;
            }

            var requestUrl = context.Request.Url;
            string hostName = requestUrl.Host;

            if (!url.StartsWith("http", StringComparison.InvariantCultureIgnoreCase))
            {
                string serverUrl = new UrlBuilder(requestUrl.ToString()).ServerUrl;

                url = UrlUtils.Combine(serverUrl, url);
            }

            string cookies = context.Request.Headers["Cookie"];

            string responseBody, errorMessage;
            var result = RenderPage(hostName, url, cookies, out responseBody, out errorMessage);

            // TODO: log errors if any
        }


        enum PageRenderingResult
        {
            Failed = 0,
            Successful = 1,
            Redirect = 2,
            NotFound = 3
        }

        private static PageRenderingResult RenderPage(string hostname, string url, string cookies, out string responseBody, out string errorMessage)
        {
            try
            {
                url = url.Replace("://" + hostname + "/", "://127.0.0.1/");

                var request = WebRequest.Create(url) as HttpWebRequest;

                request.UserAgent = @"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5";
                request.Timeout = PageRenderingTimeout;
                request.AllowAutoRedirect = false; // Some pages may contain redirects to other pages/different websites
                request.Method = "GET";
                request.Headers.Add("Cookie", cookies);
                request.Host = hostname;


                int statusCode;
                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    statusCode = (int)response.StatusCode;

                    if (statusCode == 200)
                    {
                        using (var responseStream = response.GetResponseStream())
                        {
                            responseBody = new StreamReader(responseStream).ReadToEnd();
                        }
                        errorMessage = null;
                        return PageRenderingResult.Successful;
                    }

                    if (statusCode == 301 || statusCode == 302)
                    {
                        responseBody = null;
                        errorMessage = null;
                        return PageRenderingResult.Redirect;
                    }
                }

                errorMessage = "Http status: " + statusCode;
            }
            catch (WebException ex)
            {
                var webResponse = ex.Response as HttpWebResponse;
                if (webResponse != null && webResponse.StatusCode != HttpStatusCode.OK)
                {
                    if (webResponse.StatusCode == HttpStatusCode.NotFound)
                    {
                        errorMessage = responseBody = null;
                        return PageRenderingResult.NotFound;
                    }
                    errorMessage = "Http status: " + ((int)webResponse.StatusCode + " " + webResponse.StatusCode);
                }
                else
                {
                    errorMessage = ex.ToString();
                }
            }

            responseBody = null;
            return PageRenderingResult.Failed;
        }
    }
}
