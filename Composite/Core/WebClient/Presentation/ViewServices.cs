using System.Web;

namespace Composite.Core.WebClient.Presentation
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class ViewServices
    {
        private static HttpRequest Request
        {
            get
            {
                return HttpContext.Current.Request;
            }
        }

        private static HttpResponse Response
        {
            get
            {
                return HttpContext.Current.Response;
            }
        }

        /// <summary>
        /// For ~/Composite requests - register basix XSL transformations 
        /// </summary>
        public static void RegisterCommonTransformations()
        {
            OutputTransformationManager.Activate();

            OutputTransformationManager.RegisterTransformation(
                Request.MapPath("~/Composite/transformations/defaultfilters/structurefilter.xsl"), 1);
            OutputTransformationManager.RegisterTransformation(
                Request.MapPath("~/Composite/transformations/defaultfilters/masterfilter.xsl"), 10);
            OutputTransformationManager.RegisterTransformation(
                Request.MapPath("~/Composite/transformations/defaultfilters/finalizefilter.xsl"), 20);

        }

        /// <exclude />
        public static void RegisterMimeType()
        {
            if (Request.UserAgent != null && !Request.UserAgent.Contains("MSIE"))
            {
                Response.ContentType = "application/xhtml+xml";
            }
        }
    }
}
