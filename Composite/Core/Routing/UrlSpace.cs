using System.Web;
using Composite.Plugins.Routing.Pages;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class UrlSpace
    {
        internal UrlSpace(string hostname)
        {
            Hostname = hostname;
            ForceRelativeUrls = false;
        }

        /// <exclude />
        public UrlSpace()
        {
            var httpContext = System.Web.HttpContext.Current;

            if(httpContext != null)
            {
                InitializeThroughHttpContext(httpContext);
            }
        }

        /// <exclude />
        public UrlSpace(HttpContext httpContext)
        {
            Verify.ArgumentNotNull(httpContext, "httpContext");

            InitializeThroughHttpContext(httpContext);
        }

        /// <exclude />
        public UrlSpace(HttpContextBase httpContextBase)
        {
            Verify.ArgumentNotNull(httpContextBase, "httpContextBase");

            Initialize(httpContextBase.Request.Url.Host, httpContextBase.Request.RawUrl);
        }

        private void InitializeThroughHttpContext(HttpContext httpContext)
        {
            Initialize(httpContext.Request.Url.Host, httpContext.Request.RawUrl);
        }

        private void Initialize(string hostname, string relativeUrl)
        {
            ForceRelativeUrls = relativeUrl.Contains(PageUrlBuilder.UrlMarker_RelativeUrl);

            if (!ForceRelativeUrls)
            {
                Hostname = hostname;
            }
        }

        /// <exclude />
        public string Hostname { get; set; }

        /// <summary>
        /// Disables hostname bindings, so all output urls will be relative. Is used in in-console preview.
        /// </summary>
        public bool ForceRelativeUrls { get; set; }
    }
}
