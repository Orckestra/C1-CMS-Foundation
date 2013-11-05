using System.Web;
using Composite.Plugins.Routing.Pages;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// Describes a set of page urls, generated specifictly. F.e. for a specific hostname or for previewing.
    /// </summary>
    public class UrlSpace
    {
        internal UrlSpace(string hostname)
        {
            Hostname = hostname;
            ForceRelativeUrls = false;
        }

        internal UrlSpace(string hostname, string relativeUrl)
        {
            Initialize(hostname, relativeUrl);
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="UrlSpace"/> class.
        /// </summary>
        public UrlSpace()
        {
            var httpContext = System.Web.HttpContext.Current;

            if(httpContext != null)
            {
                InitializeThroughHttpContext(httpContext);
            }
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="UrlSpace"/> class.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        public UrlSpace(HttpContext httpContext)
        {
            Verify.ArgumentNotNull(httpContext, "httpContext");

            InitializeThroughHttpContext(httpContext);
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="UrlSpace"/> class.
        /// </summary>
        /// <param name="httpContextBase">The HTTP context base.</param>
        public UrlSpace(HttpContextBase httpContextBase)
        {
            Verify.ArgumentNotNull(httpContextBase, "httpContextBase");

            Initialize(httpContextBase.Request.Url.Host, httpContextBase.Request.Url.LocalPath);
        }

        private void InitializeThroughHttpContext(HttpContext httpContext)
        {
            Initialize(httpContext.Request.Url.Host, httpContext.Request.Url.LocalPath);
        }

        private void Initialize(string hostname, string relativeUrl)
        {
            ForceRelativeUrls = HttpUtility.UrlDecode(relativeUrl).Contains(PageUrlBuilder.UrlMarker_RelativeUrl);

            if (!ForceRelativeUrls)
            {
                Hostname = hostname;
            }
        }


        /// <summary>
        /// Gets or sets the hostname.
        /// </summary>
        /// <value>
        /// The hostname.
        /// </value>
        public string Hostname { get; set; }

        /// <summary>
        /// Disables hostname bindings, so all output urls will be relative. Is used in in-console preview.
        /// </summary>
        public bool ForceRelativeUrls { get; set; }
    }
}
