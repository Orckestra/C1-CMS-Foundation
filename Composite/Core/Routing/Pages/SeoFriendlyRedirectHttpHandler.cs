using System.Web;

namespace Composite.Core.Routing.Pages
{
    internal class SeoFriendlyRedirectHttpHandler: IHttpHandler
    {
        private readonly string _redirectUrl;

        public SeoFriendlyRedirectHttpHandler(string redirectUrl)
        {
            _redirectUrl = redirectUrl;
        }

        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.AddHeader("Location", _redirectUrl);
            context.Response.StatusCode = 301; // Http 301 - "Permanently moved"
            context.ApplicationInstance.CompleteRequest();
        }
    }
}
