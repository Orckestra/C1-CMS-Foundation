using System.Web;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class UrlSpace
    {
        /// <exclude />
        public UrlSpace()
        {
        }

        /// <exclude />
        public UrlSpace(HttpContextBase httpContext)
        {
            Hostname = httpContext.Request.UserHostName;
        }

        /// <exclude />
        public UrlSpace(HttpContext httpContext)
        {
            Hostname = httpContext.Request.UserHostName;
        }


        /// <exclude />
        public string Hostname { get; set; }
    }
}
