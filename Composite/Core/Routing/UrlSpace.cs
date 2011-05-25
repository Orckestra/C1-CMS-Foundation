using System.Web;

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
        }

        /// <exclude />
        public UrlSpace()
        {
            var httpContext = System.Web.HttpContext.Current;

            if(httpContext != null)
            {
                Hostname = httpContext.Request.Url.Host;
            }
        }

        /// <exclude />
        public UrlSpace(HttpContextBase httpContext)
        {
            Hostname = httpContext.Request.Url.Host;
        }

        /// <exclude />
        public UrlSpace(HttpContext httpContext)
        {
            Hostname = httpContext.Request.Url.Host;
        }


        /// <exclude />
        public string Hostname { get; set; }
    }
}
